// API Route: /api/repurpose
// Handles content generation with usage limits

// Simple in-memory store for usage tracking (resets on deploy)
const usageStore = new Map();

const FREE_DAILY_LIMIT = 3;

function getUsageKey(email) {
  const today = new Date().toISOString().split('T')[0];
  return `${email}:${today}`;
}

function getUsage(email) {
  const key = getUsageKey(email);
  return usageStore.get(key) || 0;
}

function incrementUsage(email) {
  const key = getUsageKey(email);
  const current = usageStore.get(key) || 0;
  usageStore.set(key, current + 1);
  return current + 1;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, platform, tone, threadLength, niche, email, isPro } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Check usage limits for free users
  if (!isPro) {
    const currentUsage = getUsage(email);
    if (currentUsage >= FREE_DAILY_LIMIT) {
      return res.status(429).json({ 
        error: `Daily limit reached (${FREE_DAILY_LIMIT}/${FREE_DAILY_LIMIT}). Upgrade to Pro for unlimited access.`,
        limitReached: true,
        usage: currentUsage,
        limit: FREE_DAILY_LIMIT,
      });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Step 1: Fetch the article content
    const articleContent = await fetchArticle(url);
    
    // Step 2: Build the prompts
    const systemPrompt = buildSystemPrompt(platform, tone, threadLength, niche);
    const userPrompt = buildUserPrompt(articleContent.title, articleContent.content, platform);

    // Step 3: Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return res.status(500).json({ error: 'Failed to generate content' });
    }

    const data = await response.json();
    const output = data.content[0].text;

    // Increment usage for free users after successful generation
    let usage = getUsage(email);
    if (!isPro) {
      usage = incrementUsage(email);
    }

    return res.status(200).json({ 
      output,
      meta: {
        title: articleContent.title,
        wordCount: articleContent.wordCount,
      },
      usage: isPro ? null : {
        used: usage,
        limit: FREE_DAILY_LIMIT,
        remaining: FREE_DAILY_LIMIT - usage,
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}

async function fetchArticle(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.status}`);
  }

  const html = await response.text();
  
  let title = 'Untitled';
  const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i);
  if (ogTitleMatch) {
    title = ogTitleMatch[1];
  } else {
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch) {
      title = titleMatch[1].split('|')[0].split('-')[0].trim();
    }
  }

  let content = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  if (content.length > 15000) {
    content = content.substring(0, 15000) + '...';
  }

  const wordCount = content.split(/\s+/).length;

  return { title, content, wordCount };
}

function buildSystemPrompt(platform, tone, threadLength, niche) {
  const toneInstructions = {
    professional: `TONE: Professional but not boring. Credible, insightful, human.`,
    casual: `TONE: Casual and conversational. Like talking to a smart friend.`,
    provocative: `TONE: Provocative and bold. Challenge conventional wisdom.`,
    educational: `TONE: Educational and helpful. Break down complex ideas clearly.`,
  };

  const nicheInstruction = niche
    ? `\nNICHE: Content is for ${niche}. Use their terminology.`
    : '';

  if (platform === 'twitter') {
    return `You are an elite ghostwriter for viral Twitter threads.

RULES:
- Each tweet under 280 characters
- Use "1/" "2/" numbering  
- First tweet = HOOK with curiosity gap
- Last tweet = CTA + summary
- Use line breaks and → bullets

STRUCTURE (${threadLength} tweets):
1: Pattern interrupt hook
2-${threadLength - 1}: One insight per tweet
${threadLength}: Takeaway + CTA

${toneInstructions[tone]}${nicheInstruction}

Write actual tweets, ready to post.`;
  }

  if (platform === 'linkedin') {
    return `You are a LinkedIn content strategist for viral posts.

RULES:
- Hook line under 100 chars (shows before "see more")
- Single-sentence paragraphs
- 1-3 emojis total
- Hashtags only at end (3-5)
- 1200-1500 characters total

STRUCTURE:
- Line 1: Hook that demands click
- Setup: Bridge to story
- Body: Actionable value
- Close: Question for comments

${toneInstructions[tone]}${nicheInstruction}

Write actual post, ready to publish.`;
  }

  return `You are a Threads content creator.

RULES:
- 500 char limit per post
- Single post or short thread (3-5)
- No hashtags
- Conversational tone

${toneInstructions[tone]}${nicheInstruction}

Write actual post(s), ready to publish.`;
}

function buildUserPrompt(title, content, platform) {
  const labels = {
    twitter: 'Twitter thread',
    linkedin: 'LinkedIn post',
    threads: 'Threads post',
  };

  return `Transform into a ${labels[platform]}:

TITLE: ${title}

CONTENT:
${content}

---
Generate now. Ready to copy-paste.`;
}
