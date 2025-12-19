# REPURPOSE_

Transform any article into viral social media content.

![Dark Mode UI](https://via.placeholder.com/800x400/0a0a0a/00ff88?text=REPURPOSE_)

## Features

- **Twitter/X Threads** — Hook-driven threads with proper formatting
- **LinkedIn Posts** — Algorithm-optimized posts that drive engagement  
- **Threads Posts** — Casual, authentic content for Meta's platform
- **4 Tone Options** — Professional, Casual, Provocative, Educational
- **Niche Targeting** — Customize language for specific audiences

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/repurpose.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repo
4. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (your key)
5. Click "Deploy"

Done. Your app is live.

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local with your API key
echo "ANTHROPIC_API_KEY=sk-ant-your-key" > .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 14** — React framework
- **Anthropic Claude** — AI backend
- **Vercel** — Hosting

## Cost

- **Vercel**: Free tier (100K requests/month)
- **Claude API**: ~$0.003 per article

## License

MIT
