# MessWise - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Start Development Server
```bash
pnpm dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:5173**

---

## 🔐 Login with Demo Credentials

### Student Account
- **Roll Number**: 22110001
- **Password**: password

### Admin Account
- **Roll Number**: admin
- **Password**: password

---

## 📋 What You Can Do

### As a Student
- ✅ View your dashboard with analytics
- ✅ Check wallet balance & earnings
- ✅ See environmental impact metrics
- ✅ Set meal preferences (breakfast, lunch, dinner)
- ✅ View wastage trends & charts
- ✅ Check leaderboard rankings
- ✅ Track achievements & badges

### As an Admin
- ✅ View campus-wide statistics
- ✅ See student leaderboard
- ✅ Monitor wastage trends
- ✅ Check system health
- ✅ Quick action panel

---

## 📁 Key Files to Modify

### Add New Page
```
1. Create: src/pages/NewPage.tsx
2. Add route in: src/App.tsx
3. Add navigation in: src/components/layout/Navbar.tsx
```

### Customize Colors
```
File: src/styles/globals.css
Look for: :root { --primary, --secondary, ... }
```

### Update API Endpoint
```
File: src/lib/api.ts
Change: API_BASE_URL = "your-api-url"
```

### Add Feature Component
```
1. Create: src/components/features/FeatureName.tsx
2. Export and import in pages
3. Use like: <FeatureName prop={value} />
```

---

## 🛠️ Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Type checking
pnpm typecheck        # Check TypeScript errors

# From MessWise directory
cd artifacts/messwise
pnpm dev              # Start dev server from app
pnpm build            # Build just the app
```

---

## 📊 Pages Available

| Page | URL | Role | Purpose |
|------|-----|------|---------|
| Login | `/login` | All | Authentication |
| Dashboard | `/dashboard` | Student | Main overview |
| Meals | `/meals` | Student | Meal preferences |
| Analytics | `/analytics` | Student | Detailed charts |
| Admin | `/admin` | Admin | Campus overview |

---

## 🎨 Color Scheme

- **Primary**: #217DC1 (Deep Blue)
- **Secondary**: #00B4A6 (Teal)
- **Accent**: #22C55E (Green)
- **Success**: #22C55E (Green)
- **Warning**: #F97316 (Orange)
- **Background**: #F7F9FB (Light) / #1E1F26 (Dark)

---

## 📚 Component Examples

### Button
```tsx
import Button from '@/components/ui/Button'

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### Card
```tsx
import { Card } from '@/components/ui/Card'

<Card title="My Card" icon={<Icon />}>
  Card content goes here
</Card>
```

### Input
```tsx
import Input from '@/components/ui/Input'

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error={errorMessage}
/>
```

---

## 🔧 Environment Setup

Create `.env.local` in `artifacts/messwise/`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
VITE_ENABLE_ANALYTICS=true
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
pnpm dev -- --port 5174
```

### Clear Cache
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors
```bash
pnpm typecheck
```

### Module Not Found
Check imports use correct paths:
```tsx
// ✅ Good
import { cn } from '@/lib/utils'

// ❌ Bad
import { cn } from '../lib/utils'
```

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

All components are mobile-first responsive.

---

## 🚢 Deployment

### Build for Production
```bash
pnpm build
```

### Files to Deploy
Everything in the `dist/` folder after building.

### Hosting Options
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3
- Any static host

---

## 📖 Documentation Files

- **README.md** - Full documentation
- **ARCHITECTURE.md** - Technical details
- **MESSWISE_INSTALLATION.md** - Detailed setup
- **MESSWISE_SUMMARY.md** - Project overview
- **MESSWISE_QUICK_START.md** - This file

---

## 💡 Tips & Tricks

### Use Hot Module Replacement
Changes save automatically. No need to refresh!

### Tailwind IntelliSense
Install "Tailwind CSS IntelliSense" extension for better development.

### Device Preview
Press F12 → Toggle device toolbar to test mobile responsive.

### Debug Components
```tsx
console.log("[v0]", "Debug message", data)
```

---

## 🔗 Useful Links

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com
- **TypeScript Docs**: https://www.typescriptlang.org
- **Recharts Docs**: https://recharts.org

---

## ✨ Project Structure at a Glance

```
📦 artifacts/messwise
├── 📂 src/
│   ├── 📄 pages/          (5 routes)
│   ├── 📄 components/     (12 components)
│   ├── 📄 hooks/          (2 custom hooks)
│   ├── 📄 lib/            (utils, api, constants)
│   ├── 📄 styles/         (global CSS)
│   ├── 📄 App.tsx         (Router)
│   └── 📄 main.tsx        (Entry point)
├── 📂 public/             (assets)
├── 📄 index.html
├── 📄 package.json
├── 📄 vite.config.ts
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
└── 📄 README.md
```

---

## 🎯 Next Steps After Setup

1. ✅ Run `pnpm dev`
2. ✅ Login with demo account
3. ✅ Explore all pages
4. ✅ Check mobile responsiveness
5. ✅ Review code in `src/` folder
6. ✅ Read full documentation
7. ✅ Integrate with your API
8. ✅ Deploy to production

---

## 🆘 Need Help?

- Check README.md for detailed docs
- Review ARCHITECTURE.md for code structure
- Look at existing components for patterns
- Check console for error messages
- Verify environment variables are set

---

**Happy coding! 🚀**

The MessWise application is ready to use. Start with `pnpm dev` and explore!
