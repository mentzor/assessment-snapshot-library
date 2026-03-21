# 🚀 Deployment Guide for Assessment Snapshot Library

## Quick Start - Deploy to Vercel in 5 Minutes

### Step 1: Get the Code on GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it: `assessment-snapshot-library`
   - Make it Public or Private (your choice)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Upload your code to GitHub:**
   
   **Option A - Using GitHub Web Interface (Easiest):**
   - On your new repo page, click "uploading an existing file"
   - Drag and drop ALL the files from the `assessment-snapshot-library` folder
   - Commit the files
   
   **Option B - Using Git Command Line:**
   ```bash
   cd assessment-snapshot-library
   git init
   git add .
   git commit -m "Initial commit - Assessment Snapshot Library"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/assessment-snapshot-library.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up/login (use your GitHub account for easiest setup)

2. **Import your project:**
   - Click "Add New..." → "Project"
   - You'll see your GitHub repositories
   - Find `assessment-snapshot-library` and click "Import"

3. **Configure (auto-detected):**
   - Framework Preset: **Vite** (should auto-detect)
   - Build Command: `npm run build` (already set)
   - Output Directory: `dist` (already set)
   - Install Command: `npm install` (already set)
   
4. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes for build
   - You'll get a live URL like: `assessment-snapshot-library.vercel.app`

### Step 3: Share Your App! 🎉

Your app is now live at your Vercel URL. Students can access it from any device.

---

## Project Structure

```
assessment-snapshot-library/
├── public/
│   └── psi-icon.svg          # Favicon (psi symbol)
├── src/
│   ├── App.jsx               # Main application (all your assessment data & logic)
│   ├── main.jsx              # React entry point
│   └── index.css             # Global CSS
├── .gitignore                # Files to ignore in git
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite build config
├── vercel.json               # Vercel deployment config
└── README.md                 # Documentation
```

---

## Making Updates

After initial deployment, updates are automatic:

1. **Make changes** to your code locally
2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Vercel auto-deploys** - Your site updates in ~1 minute!

---

## Custom Domain (Optional)

Want a custom URL like `assessments.yourschool.edu`?

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain and follow DNS instructions
4. Done! (Usually takes 5-30 minutes to propagate)

---

## Troubleshooting

### Build fails on Vercel
- Check the build logs in Vercel dashboard
- Most common issue: Make sure `package.json` is in root directory

### App won't run locally
```bash
npm install  # Install dependencies first
npm run dev  # Then run dev server
```

### Need to add more assessments?
- Edit `src/App.jsx`
- Add new assessment objects to the `ASSESSMENTS` array
- Follow the same structure as existing assessments
- Push to GitHub → Auto-deploys!

---

## Support

Questions? Check:
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- React Docs: https://react.dev/

---

**Made for graduate psychology education** 🎓
