# DevOrg - Developer Organization Website

A modern, full-stack website for a verified developer organization built with Next.js 16, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo

**[https://team-website-sigma.vercel.app](https://team-website-sigma.vercel.app)**

## ✨ Features

### ✅ Completed

| Feature | Description |
|---------|-------------|
| **Home Page** | Hero section with gradient effects, stats, session-aware CTAs, and FAQ link |
| **About Page** | Team values showcase with "Meet the Team" button |
| **Team Page** | Dedicated page showcasing all 8 developers with portfolio links |
| **Services Page** | Company services overview with working contact button |
| **Blog** | Database-connected blog listing and detail pages |
| **Jobs** | Database-connected job listings with detail pages and application forms |
| **Developer Profiles** | Individual developer profile pages |
| **Contact Page** | Working contact form with database storage and FAQ section |
| **FAQ Section** | Interactive accordion-style FAQs on contact page |
| **CMS API** | Full CRUD API for posts and jobs with role-based access control |
| **GitHub + Google OAuth** | Full authentication with NextAuth.js v5 |
| **Session Handling** | User avatar, name, and logout in navbar |
| **Dark/Light Theme** | Theme toggle with system preference detection |
| **Mobile Navigation** | Responsive hamburger menu |
| **Footer** | Navigation links and social icons |
| **Database** | PostgreSQL with Neon, Prisma ORM with all models |

### 🔧 Remaining

| Feature | Status |
|---------|--------|
| Admin Dashboard/CMS | UI being built by team member |
| Email Notifications | For contact form submissions |
| Image Uploads | For blog posts |

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL (Neon) with Prisma ORM
- **Authentication:** NextAuth.js v5 (GitHub + Google OAuth)
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Theme:** next-themes

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Abdul-Rasheed-Talal/Team-Website.git

# Navigate to project directory
cd Team-Website

# Install dependencies
npm install

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Team-Website/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (posts, jobs, contact)
│   ├── about/             # About page
│   ├── blog/              # Blog listing & [slug] detail
│   ├── contact/           # Contact form with FAQs
│   ├── developer/         # Developer profiles [username]
│   ├── jobs/              # Job listings & [slug] detail
│   ├── join/              # Signup page
│   ├── login/             # Login page
│   ├── services/          # Services page
│   ├── team/              # Team page
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── marketing/         # Hero, Features, Team
│   └── ui/                # Button, Input, ThemeToggle
├── lib/                   # Utilities (prisma, auth-check)
├── prisma/                # Database schema
└── public/                # Static assets
```

## 🔌 API Endpoints

| Endpoint | Methods | Auth | Description |
|----------|---------|------|-------------|
| `/api/posts` | GET, POST | GET: public, POST: admin/editor | Blog posts |
| `/api/posts/[id]` | GET, PUT, DELETE | Varies by method | Individual post |
| `/api/jobs` | GET, POST | GET: public, POST: admin | Job listings |
| `/api/jobs/[id]` | GET, PUT, DELETE | Admin only for mutations | Individual job |
| `/api/contact` | GET, POST | GET: admin, POST: public | Contact messages |

## 👥 Team

| Name | Role | Portfolio |
|------|------|-----------|
| Abdul Rasheed Talal | Full Stack Developer | [View](https://abdulrasheedtalal.netlify.app) |
| Ali Raza | Frontend Developer • PM • Co-Founder | [View](https://ali-raza-dev.netlify.app) |
| Hammad Ali | Frontend Developer | [View](http://hammad-portfolionetlifyapp.netlify.app) |
| Imran | Frontend Developer • QA Tester | [View](https://imrancit104-cmyk.github.io/My-protfolio-Latest) |
| Abdul Saboor | Frontend Developer • UI/UX Designer | [View](https://abdulsaboor-dev.netlify.app) |
| M. Arsalan | Developer | Coming Soon |
| Taimoor Shahzad | Developer | Coming Soon |
| Adil Ali | Developer | Coming Soon |

## 🚀 Deployment to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables
5. Click Deploy!

## 📝 Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
AUTH_SECRET="your-secret"
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ by the DevOrg Team
