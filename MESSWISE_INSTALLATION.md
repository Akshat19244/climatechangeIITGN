# MessWise Installation & Setup Guide

## Quick Start

The MessWise application has been created in the `artifacts/messwise` directory. Follow these steps to get it running.

### Step 1: Install Dependencies

From the root directory of the project:

```bash
pnpm install
```

This will install dependencies for the entire workspace including the MessWise app.

### Step 2: Start Development Server

Run the dev script from the root:

```bash
pnpm dev
```

Or directly from the MessWise directory:

```bash
cd artifacts/messwise
pnpm dev
```

The application will start on `http://localhost:5173` by default.

### Step 3: Login

Use the demo credentials to test the application:

**Student Account:**
- Roll Number: `22110001`
- Password: `password`

**Admin Account:**
- Roll Number: `admin`
- Password: `password`

## Project Structure

```
artifacts/messwise/
├── src/
│   ├── pages/                    # Page components
│   │   ├── Dashboard.tsx         # Student main dashboard
│   │   ├── MealPreference.tsx    # Meal selection page
│   │   ├── Analytics.tsx         # Analytics & charts page
│   │   ├── AdminDashboard.tsx    # Admin overview
│   │   └── Login.tsx             # Authentication page
│   ├── components/               # Reusable components
│   │   ├── ui/                   # Basic UI components
│   │   │   ├── Button.tsx        # Button component
│   │   │   ├── Input.tsx         # Input field
│   │   │   ├── Card.tsx          # Card container
│   │   │   └── Toast.tsx         # Toast notifications
│   │   ├── features/             # Feature components
│   │   │   ├── WalletBalance.tsx # Wallet display
│   │   │   ├── ImpactIndicator.tsx
│   │   │   ├── MealPreferences.tsx
│   │   │   ├── WastageTracker.tsx # Report wastage
│   │   │   ├── Leaderboard.tsx   # Rankings
│   │   │   └── Achievements.tsx  # Badges
│   │   └── layout/               # Layout components
│   │       ├── Navbar.tsx        # Top navigation
│   │       └── Footer.tsx        # Footer
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts            # Authentication hook
│   │   └── useAnalytics.ts       # Analytics data hook
│   ├── lib/                      # Utilities
│   │   ├── utils.ts              # Helper functions (cn, formatters)
│   │   ├── api.ts                # API client
│   │   └── constants.ts          # App constants
│   ├── styles/                   # CSS & theme
│   │   └── globals.css           # Global styles + design tokens
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
└── README.md                     # Documentation

```

## Available Scripts

### Root Level

```bash
# Start dev server (MessWise app)
pnpm dev

# Build all apps
pnpm build

# Type checking
pnpm typecheck
```

### MessWise App Level

From `artifacts/messwise/`:

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Configuration

### Environment Variables

Create a `.env.local` file in `artifacts/messwise/`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
VITE_ENABLE_ANALYTICS=true
```

## Key Features Overview

### 1. Authentication
- Login page with demo credentials support
- JWT token-based (mock implementation)
- Role-based access (student/admin)

### 2. Student Dashboard
- Personal analytics with charts (Recharts)
- Daily/weekly/monthly wastage trends
- Wallet balance display with credits
- Impact indicators (meals saved, cost saved, water saved)
- Quick action buttons

### 3. Meal Preferences
- Date navigation (previous/next day)
- Meal type selection (breakfast, lunch, dinner)
- Portion size options (full, half, skip)
- Batch preference updates

### 4. Analytics Page
- Multiple chart types (line, bar, pie)
- Time range selection (week, month, year)
- Comparison with campus average
- Wastage by category breakdown
- Export functionality (UI ready)

### 5. Admin Dashboard
- Campus-wide statistics
- Weekly wastage trends
- Top contributors leaderboard
- System health metrics
- Quick action panel

### 6. Components & Features
- **WalletBalance**: Shows credits and earnings
- **ImpactIndicator**: Environmental impact metrics
- **MealPreferences**: Meal planning interface
- **WastageTracker**: Report food waste with details
- **Leaderboard**: Campus rankings
- **Achievements**: Badge system with progress
- **Toast Notifications**: Success/error/info alerts

## Design System

### Colors
- **Primary**: `#217DC1` (Deep Blue)
- **Secondary**: `#00B4A6` (Teal)
- **Accent**: `#22C55E` (Green)
- **Success**: `#22C55E`
- **Warning**: `#F97316` (Orange)
- **Background**: `#F7F9FB` (Light) / `#1E1F26` (Dark)

### Typography
- **Heading Font**: System sans-serif
- **Body Font**: Inter (from system)
- **Responsive**: Mobile-first approach

### Components
All components use:
- Consistent spacing (Tailwind scale)
- Hover & focus states
- Accessibility attributes
- Loading states
- Error handling

## Performance Optimization

The app includes:
- Lazy loading routes
- Memoized expensive components
- Optimized chart rendering
- CSS class merging (clsx + tailwind-merge)
- Minimal re-renders with React hooks

## Browser Compatibility

Tested & supported:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Issue: Port 5173 is in use
**Solution**: Vite will automatically use the next available port
```bash
pnpm dev -- --port 5174
```

### Issue: Module not found errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Tailwind styles not applying
**Solution**: Ensure JSX files are in `content` array in `tailwind.config.ts`
```ts
content: ["./src/**/*.{js,ts,jsx,tsx}"]
```

### Issue: TypeScript errors
**Solution**: Run type check
```bash
pnpm typecheck
```

### Issue: Build fails
**Solution**: Clear cache and rebuild
```bash
rm -rf dist .next
pnpm build
```

## Development Workflow

1. **Make changes** to files in `src/`
2. **Hot Module Replacement** automatically refreshes the browser
3. **Check console** for errors/warnings
4. **Test with dev credentials** before deploying

## Building for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview

# Upload dist/ folder to hosting
```

## Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel
```

### GitHub Pages
```bash
# Build & deploy
pnpm build
# Push to gh-pages branch
```

### Docker
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build
EXPOSE 5173
CMD ["pnpm", "dev"]
```

## API Integration

The app currently uses mock data. To connect to a real backend:

1. **Update API endpoint** in `.env.local`:
   ```env
   VITE_API_URL=https://your-api.com
   ```

2. **Modify API functions** in `src/lib/api.ts`

3. **Update hooks** in `src/hooks/` to use real data

4. **Test with Postman/Insomnia** first

## Next Steps

1. ✅ App is running and working
2. Integrate with real backend API
3. Set up user authentication system
4. Connect to database (meals, preferences, analytics)
5. Deploy to production server
6. Set up monitoring & error tracking

## Support & Resources

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Recharts**: https://recharts.org
- **React Router**: https://reactrouter.com

## Additional Notes

- All mock data is in components and hooks
- Authentication is simulated (no real backend calls)
- Preferences are stored in component state (not persisted)
- Charts use sample data for demonstration
- Ready for backend integration

## Common Customizations

### Change App Title
In `index.html`:
```html
<title>Your Custom Title</title>
```

### Update Color Theme
In `src/styles/globals.css`:
```css
:root {
  --primary: 217 100% 45%; /* Update this */
  --secondary: 180 100% 40%;
  /* ... */
}
```

### Add New Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Navbar.tsx`

### Create New Component
1. Create file in `src/components/features/NewComponent.tsx`
2. Export component
3. Import and use in pages

---

**Happy building! 🚀**

For questions or issues, refer to the README.md in the MessWise app directory.
