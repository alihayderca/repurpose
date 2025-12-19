// API Route: /api/repurpose
// This runs on the server - your API key is never exposed to the browser

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, platform, tone, threadLength, niche } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
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

    return res.status(200).json({ 
      output,
      meta: {
        title: articleContent.title,
        wordCount: articleContent.wordCount,
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}

// Fetch and extract article content
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
  
  // Extract title
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

  // Extract body content (strip HTML tags)
  let content = html
    // Remove script, style, nav, header, footer, aside
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
    // Get text from paragraphs
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '')
    // Remove all remaining HTML tags
    .replace(/<[^>]+>/g, ' ')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  // Limit content length to avoid token limits
  if (content.length > 15000) {
    content = content.substring(0, 15000) + '...';
  }

  const wordCount = content.split(/\s+/).length;

  return { title, content, wordCount };
}

// Build system prompt based on platform and settings
function buildSystemPrompt(platform, tone, threadLength, niche) {
  const toneInstructions = {
    professional: `TONE: Professional but not boring. Think "respected industry voice" - credible, insightful, but still human. Avoid corporate jargon and buzzwords.`,
    casual: `TONE: Casual and conversational. Like talking to a smart friend. Use contractions, be direct, show personality.`,
    provocative: `TONE: Provocative and bold. Challenge conventional wisdom and make people think. Take strong positions, back them up.`,
    educational: `TONE: Educational and helpful. Break down complex ideas clearly. Use analogies, make it actionable.`,
  };

  const nicheInstruction = niche
    ? `\nNICHE CONTEXT: This content is for ${niche}. Use terminology and references this audience understands. Speak as one of them.`
    : '';

  if (platform === 'twitter') {
    return `You are an elite ghostwriter who has written viral Twitter threads for founders, creators, and thought leaders. Your threads consistently get 1000+ retweets.

You understand the psychology of viral content:
- Pattern interrupts grab attention in the first 3 words
- Curiosity gaps keep people reading
- Concrete specifics beat vague generalities
- Stories > Statistics (but stats that shock work)
- White space is your friend

FORMATTING RULES (critical):
- Each tweet MUST be under 280 characters
- Use "1/" "2/" numbering
- First tweet is the HOOK - no fluff, pure intrigue
- Last tweet is the CTA + summary
- Use line breaks liberally
- Bullets with → or • for lists
- ALL CAPS sparingly (1-2 words max)

STRUCTURE FOR A ${threadLength}-PART THREAD:
Tweet 1 (Hook): Pattern interrupt + bold claim + curiosity gap
Tweets 2-${threadLength - 1} (Meat): ONE clear insight per tweet with examples
Tweet ${threadLength} (CTA): Key takeaway + call to action

${toneInstructions[tone]}${nicheInstruction}

Write the ACTUAL tweets, ready to copy-paste. No explanations or meta-commentary.`;
  }

  if (platform === 'linkedin') {
    return `You are a LinkedIn content strategist who creates posts that generate massive engagement - 500+ comments, thousands of reactions.

You understand LinkedIn's algorithm and culture:
- First line is EVERYTHING (shows before "see more")
- Personal stories outperform corporate speak
- Vulnerability + value = virality
- Formatting with white space increases readability

FORMATTING RULES (critical):
- Open with a HOOK line (under 100 chars) that demands the click
- Use single-sentence paragraphs
- Liberal line breaks
- Strategic emojis (1-3 total, never excessive)
- No hashtags in body, 3-5 at the very end only
- Total length: 1200-1500 characters

STRUCTURE:
Line 1 (Hook): Controversial opinion, surprising fact, or pattern interrupt
Lines 2-4 (Setup): Bridge from hook to story/insight
Body (Value): Share the insight with specific examples, make it actionable
Close (CTA): Clear takeaway + question to drive comments

${toneInstructions[tone]}${nicheInstruction}

Write the ACTUAL post, ready to copy-paste. No explanations.`;
  }

  // Threads
  return `You are a Threads content creator who understands the platform's unique vibe - more casual than Twitter, more real than LinkedIn.

PLATFORM UNDERSTANDING:
- Threads is conversational and raw
- Less corporate, more human
- Hot takes and opinions do well
- Connection over perfection

FORMATTING RULES:
- 500 character limit per post
- Single post OR short thread (3-5 posts)
- No hashtags (they don't work on Threads)
- Minimal formatting - just line breaks
- Conversational punctuation

${toneInstructions[tone]}${nicheInstruction}

Write the ACTUAL post(s), ready to copy-paste. No explanations.`;
}

// Build user prompt with article content
function buildUserPrompt(title, content, platform) {
  const platformLabels = {
    twitter: 'viral Twitter thread',
    linkedin: 'high-engagement LinkedIn post',
    threads: 'engaging Threads content',
  };

  return `Transform this article into a ${platformLabels[platform]}:

ARTICLE TITLE: ${title}

ARTICLE CONTENT:
${content}

---
Generate the content now. Actual post content only, ready to copy-paste.`;
}
