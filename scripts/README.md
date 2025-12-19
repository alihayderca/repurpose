# Lead Generation Bot

Automatically find and engage with potential customers on Twitter/X.

## ⚠️ Important Warning

Twitter has strict rules about automated engagement. Use this responsibly:
- **Don't spam** — max 10-20 replies per day
- **Be helpful** — replies should provide value, not just promotion
- **Vary messages** — don't use the exact same reply every time
- **Monitor your account** — stop if you get warnings

## Setup

### 1. Get Twitter API Access

1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Sign up for a developer account
3. Create a new Project and App
4. Get your API keys:
   - API Key
   - API Secret
   - Access Token
   - Access Token Secret
   - Bearer Token

### 2. Install Dependencies

```bash
pip install tweepy
```

### 3. Set Environment Variables

```bash
export TWITTER_API_KEY="your-api-key"
export TWITTER_API_SECRET="your-api-secret"
export TWITTER_ACCESS_TOKEN="your-access-token"
export TWITTER_ACCESS_SECRET="your-access-secret"
export TWITTER_BEARER_TOKEN="your-bearer-token"
```

## Usage

### Find Mode (Recommended to start)

Find potential leads without auto-replying. Review manually.

```bash
python lead_bot.py find
```

This shows you tweets from people who might need your tool. You can then manually reply to the best ones.

### Auto Mode

Automatically reply to matching tweets (one run).

```bash
python lead_bot.py auto
```

### Daemon Mode

Run continuously, checking every 30 minutes.

```bash
python lead_bot.py daemon
```

## Customization

Edit `lead_bot.py` to change:

- `KEYWORDS` — What to search for
- `SKIP_KEYWORDS` — What to avoid
- `REPLY_TEMPLATES` — Your reply messages
- `MAX_REPLIES_PER_DAY` — Daily limit
- `REPLY_DELAY_SECONDS` — Time between replies

## Best Practices

1. **Start with Find mode** — Get a feel for what tweets come up
2. **Write helpful replies** — Don't just promote, actually help
3. **Target the right people** — Creators, founders, marketers
4. **Monitor results** — Track which replies get engagement
5. **Stay under the radar** — Don't be spammy

## Alternative: Manual Approach

The safest approach is to:
1. Run `find` mode daily
2. Review the leads it finds
3. Manually reply to 5-10 best ones
4. Customize each reply slightly

This avoids any automation risk while still saving you time finding leads.
