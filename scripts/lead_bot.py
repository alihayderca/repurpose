"""
Lead Generation Bot for Repurpose AI
=====================================

This bot monitors Twitter/X for people asking about content repurposing,
social media automation, or struggling with content creation — then replies
with a helpful message and link to your tool.

IMPORTANT: Use responsibly. Twitter has rate limits and anti-spam rules.
- Don't reply to too many tweets (10-20/day max)
- Make replies genuinely helpful, not spammy
- Vary your messages
- Don't reply to the same person twice

Setup:
1. Apply for Twitter API access: https://developer.twitter.com
2. Create a project and get your API keys
3. Install tweepy: pip install tweepy
4. Set environment variables (see below)
5. Run: python lead_bot.py
"""

import os
import time
import random
import json
from datetime import datetime
from pathlib import Path

try:
    import tweepy
except ImportError:
    print("Install tweepy first: pip install tweepy")
    exit(1)


# =============================================================================
# CONFIGURATION
# =============================================================================

# Keywords to monitor (tweets containing these get flagged)
KEYWORDS = [
    "how to repurpose content",
    "turn blog into twitter",
    "turn article into thread",
    "content repurposing tool",
    "blog to social media",
    "article to linkedin",
    "thread writer",
    "need a twitter thread",
    "help me write a thread",
    "social media content ideas",
    "repurpose my blog",
    "turn this into a thread",
    "anyone know a tool for",
    "content creation is exhausting",
    "spending too much time on content",
    "automate social media",
]

# Negative keywords (skip tweets containing these)
SKIP_KEYWORDS = [
    "hiring",
    "job",
    "salary",
    "selling",
    "buy my",
    "check out my",
    "affiliate",
]

# Reply templates (the bot will randomly pick one)
# Keep these helpful and non-spammy
REPLY_TEMPLATES = [
    """I built something for exactly this! 

Paste any article URL → get a viral-style thread in 10 seconds.

Free to try: repurposeai.app

Would love your feedback if you try it 🙏""",

    """Been there! Content repurposing used to take me hours.

I made a tool that does it in seconds — paste a URL, pick Twitter/LinkedIn/Threads, done.

repurposeai.app (free tier available)

Happy to help if you have questions!""",

    """This is literally why I built repurposeai.app

→ Paste any article/blog URL
→ Pick your platform
→ Get viral-format content instantly

Free 3x/day. Saves me hours every week.""",

    """I feel this pain! Spent way too long doing this manually.

Now I use repurposeai.app — takes any URL and turns it into platform-native content.

Free to try, no credit card needed.""",
]

# Rate limiting
MAX_REPLIES_PER_DAY = 15
REPLY_DELAY_SECONDS = 300  # 5 minutes between replies


# =============================================================================
# BOT LOGIC
# =============================================================================

class LeadBot:
    def __init__(self):
        # Load Twitter API credentials from environment
        self.api_key = os.environ.get('TWITTER_API_KEY')
        self.api_secret = os.environ.get('TWITTER_API_SECRET')
        self.access_token = os.environ.get('TWITTER_ACCESS_TOKEN')
        self.access_secret = os.environ.get('TWITTER_ACCESS_SECRET')
        self.bearer_token = os.environ.get('TWITTER_BEARER_TOKEN')
        
        if not all([self.api_key, self.api_secret, self.access_token, self.access_secret]):
            print("Missing Twitter API credentials!")
            print("Set these environment variables:")
            print("  TWITTER_API_KEY")
            print("  TWITTER_API_SECRET")
            print("  TWITTER_ACCESS_TOKEN")
            print("  TWITTER_ACCESS_SECRET")
            print("  TWITTER_BEARER_TOKEN")
            exit(1)
        
        # Initialize Tweepy clients
        self.client = tweepy.Client(
            bearer_token=self.bearer_token,
            consumer_key=self.api_key,
            consumer_secret=self.api_secret,
            access_token=self.access_token,
            access_token_secret=self.access_secret,
            wait_on_rate_limit=True
        )
        
        # Track replied tweets to avoid duplicates
        self.replied_file = Path('replied_tweets.json')
        self.replied_tweets = self._load_replied()
        self.replies_today = 0
        self.last_reply_date = datetime.now().date()
    
    def _load_replied(self):
        """Load list of tweets we've already replied to"""
        if self.replied_file.exists():
            with open(self.replied_file) as f:
                return set(json.load(f))
        return set()
    
    def _save_replied(self):
        """Save replied tweets to disk"""
        with open(self.replied_file, 'w') as f:
            json.dump(list(self.replied_tweets), f)
    
    def _reset_daily_counter(self):
        """Reset reply counter if it's a new day"""
        today = datetime.now().date()
        if today != self.last_reply_date:
            self.replies_today = 0
            self.last_reply_date = today
    
    def search_tweets(self, query, max_results=20):
        """Search for recent tweets matching query"""
        try:
            # Search recent tweets (last 7 days)
            tweets = self.client.search_recent_tweets(
                query=f'{query} -is:retweet -is:reply lang:en',
                max_results=max_results,
                tweet_fields=['created_at', 'author_id', 'public_metrics'],
                user_fields=['username', 'public_metrics'],
                expansions=['author_id']
            )
            return tweets
        except Exception as e:
            print(f"Search error: {e}")
            return None
    
    def should_reply(self, tweet):
        """Determine if we should reply to this tweet"""
        tweet_text = tweet.text.lower()
        tweet_id = str(tweet.id)
        
        # Already replied?
        if tweet_id in self.replied_tweets:
            return False, "Already replied"
        
        # Contains skip keywords?
        for skip in SKIP_KEYWORDS:
            if skip.lower() in tweet_text:
                return False, f"Contains skip keyword: {skip}"
        
        # Check engagement (don't reply to tweets with 0 engagement - might be spam)
        metrics = tweet.public_metrics
        if metrics and metrics.get('like_count', 0) == 0 and metrics.get('reply_count', 0) == 0:
            # Low engagement is fine for genuine questions
            pass
        
        return True, "Good candidate"
    
    def reply_to_tweet(self, tweet, author_username):
        """Send a reply to a tweet"""
        reply_text = random.choice(REPLY_TEMPLATES)
        
        try:
            response = self.client.create_tweet(
                text=f"@{author_username} {reply_text}",
                in_reply_to_tweet_id=tweet.id
            )
            
            # Track this reply
            self.replied_tweets.add(str(tweet.id))
            self._save_replied()
            self.replies_today += 1
            
            print(f"✓ Replied to @{author_username}")
            print(f"  Tweet: {tweet.text[:80]}...")
            print(f"  Replies today: {self.replies_today}/{MAX_REPLIES_PER_DAY}")
            
            return True
        except Exception as e:
            print(f"Reply error: {e}")
            return False
    
    def run_once(self):
        """Run one cycle of searching and replying"""
        self._reset_daily_counter()
        
        if self.replies_today >= MAX_REPLIES_PER_DAY:
            print(f"Daily limit reached ({MAX_REPLIES_PER_DAY} replies)")
            return
        
        # Search for each keyword
        for keyword in KEYWORDS:
            if self.replies_today >= MAX_REPLIES_PER_DAY:
                break
            
            print(f"\nSearching: '{keyword}'")
            results = self.search_tweets(keyword, max_results=10)
            
            if not results or not results.data:
                print("  No results")
                continue
            
            # Build user lookup
            users = {u.id: u for u in (results.includes.get('users', []) or [])}
            
            for tweet in results.data:
                if self.replies_today >= MAX_REPLIES_PER_DAY:
                    break
                
                should, reason = self.should_reply(tweet)
                
                if should:
                    author = users.get(tweet.author_id)
                    author_username = author.username if author else "user"
                    
                    print(f"\n  Found candidate: @{author_username}")
                    print(f"  Tweet: {tweet.text[:100]}...")
                    
                    # Reply
                    if self.reply_to_tweet(tweet, author_username):
                        # Wait between replies
                        print(f"  Waiting {REPLY_DELAY_SECONDS}s before next reply...")
                        time.sleep(REPLY_DELAY_SECONDS)
                else:
                    pass  # Skip silently
    
    def run_continuous(self, interval_minutes=30):
        """Run continuously, checking every N minutes"""
        print(f"Starting lead bot (checking every {interval_minutes} minutes)")
        print(f"Max {MAX_REPLIES_PER_DAY} replies per day")
        print("-" * 50)
        
        while True:
            try:
                self.run_once()
                print(f"\nSleeping {interval_minutes} minutes...")
                time.sleep(interval_minutes * 60)
            except KeyboardInterrupt:
                print("\nStopping bot...")
                break
            except Exception as e:
                print(f"Error: {e}")
                time.sleep(60)  # Wait a minute on error


# =============================================================================
# MANUAL MODE - Find leads without auto-replying
# =============================================================================

def find_leads_only():
    """
    Manual mode: Find potential leads and output them for manual review.
    Safer approach - you review and reply manually.
    """
    bearer_token = os.environ.get('TWITTER_BEARER_TOKEN')
    
    if not bearer_token:
        print("Set TWITTER_BEARER_TOKEN environment variable")
        return
    
    client = tweepy.Client(bearer_token=bearer_token)
    
    print("=" * 60)
    print("LEAD FINDER - Manual Review Mode")
    print("=" * 60)
    
    all_leads = []
    
    for keyword in KEYWORDS[:5]:  # Check first 5 keywords
        print(f"\nSearching: '{keyword}'")
        
        try:
            results = client.search_recent_tweets(
                query=f'{keyword} -is:retweet -is:reply lang:en',
                max_results=10,
                tweet_fields=['created_at', 'public_metrics'],
                user_fields=['username', 'followers_count'],
                expansions=['author_id']
            )
            
            if results.data:
                users = {u.id: u for u in (results.includes.get('users', []) or [])}
                
                for tweet in results.data:
                    author = users.get(tweet.author_id)
                    
                    # Skip if contains negative keywords
                    if any(skip in tweet.text.lower() for skip in SKIP_KEYWORDS):
                        continue
                    
                    all_leads.append({
                        'username': author.username if author else 'unknown',
                        'followers': author.public_metrics.get('followers_count', 0) if author else 0,
                        'tweet': tweet.text,
                        'tweet_id': tweet.id,
                        'url': f"https://twitter.com/{author.username}/status/{tweet.id}" if author else ""
                    })
        except Exception as e:
            print(f"  Error: {e}")
    
    # Sort by follower count (higher = better reach if they share your tool)
    all_leads.sort(key=lambda x: x['followers'], reverse=True)
    
    print("\n" + "=" * 60)
    print(f"FOUND {len(all_leads)} POTENTIAL LEADS")
    print("=" * 60)
    
    for i, lead in enumerate(all_leads[:20], 1):  # Top 20
        print(f"\n{i}. @{lead['username']} ({lead['followers']:,} followers)")
        print(f"   {lead['tweet'][:100]}...")
        print(f"   {lead['url']}")
    
    print("\n" + "=" * 60)
    print("Review these manually and reply to the best ones!")
    print("=" * 60)


# =============================================================================
# MAIN
# =============================================================================

if __name__ == "__main__":
    import sys
    
    print("""
╔═══════════════════════════════════════════════════════════════╗
║           REPURPOSE AI - Lead Generation Bot                  ║
╠═══════════════════════════════════════════════════════════════╣
║  Modes:                                                       ║
║    python lead_bot.py find     - Find leads (manual review)   ║
║    python lead_bot.py auto     - Auto-reply mode (careful!)   ║
║    python lead_bot.py daemon   - Run continuously             ║
╚═══════════════════════════════════════════════════════════════╝
    """)
    
    if len(sys.argv) < 2:
        print("Usage: python lead_bot.py [find|auto|daemon]")
        print("\nRecommended: Start with 'find' mode to review leads manually.")
        sys.exit(1)
    
    mode = sys.argv[1].lower()
    
    if mode == "find":
        find_leads_only()
    elif mode == "auto":
        bot = LeadBot()
        bot.run_once()
    elif mode == "daemon":
        bot = LeadBot()
        bot.run_continuous(interval_minutes=30)
    else:
        print(f"Unknown mode: {mode}")
        print("Use: find, auto, or daemon")
