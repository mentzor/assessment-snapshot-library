# Ψ Assessment Snapshot Library

A comprehensive interactive reference database for psychological assessments, built for graduate-level psychology education.

## Features

- **10 Major Assessments** across 5 domains:
  - Intelligence (WAIS-IV, WISC-V)
  - Personality (MMPI-3, NEO-PI-3, Rorschach)
  - Clinical (BDI-II, BAI, PCL-5)
  - Neuropsychological (RBANS, Trail Making Test)
  - Vocational (Strong Interest Inventory)

- **Interactive Score Interpreter** - Input scores and see real-time interpretations with visual norm distributions
- **Case Studies** - Pre-loaded clinical profiles to explore
- **Psychometric Details** - Reliability, validity, and normative data for each test
- **Key Facts** - Important clinical and psychometric insights

## Tech Stack

- React 18
- Vite
- Recharts (for visualizations)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/assessment-snapshot-library.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Project Structure

```
assessment-snapshot-library/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Educational Use

This tool is designed for graduate psychology training. It provides quick reference information about major psychological assessments without requiring students to memorize extensive details about every test.

**Note:** For educational purposes only. Always consult test manuals and qualified supervisors for clinical assessment.

## License

Educational use only.
