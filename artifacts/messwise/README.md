# MessWise - Food Waste Reduction Platform

MessWise is a modern web application designed to reduce food wastage at IIT Gandhinagar by helping students make informed meal decisions and track their environmental impact.

## Features

### Student Dashboard
- **Personal Analytics**: Track your food wastage over time with interactive charts
- **Meal Preferences**: Plan ahead for breakfast, lunch, and dinner
- **Wallet System**: Earn credits for reducing waste
- **Impact Metrics**: See your contribution to sustainability
- **Leaderboard**: Compete with peers and earn badges

### Admin Dashboard
- **Campus Overview**: Monitor institution-wide wastage metrics
- **Analytics & Reports**: Detailed analysis of wastage patterns
- **Student Rankings**: Track top contributors
- **System Management**: Configure app settings

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4.1
- **Charts**: Recharts
- **State Management**: React Hooks + TanStack Query
- **Routing**: React Router v6

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

From the root directory:
```bash
pnpm dev
```

Or manually from the MessWise directory:
```bash
cd artifacts/messwise
pnpm install
pnpm dev
```

### Build for Production

```bash
pnpm build
pnpm preview
```

## Environment Configuration

Copy `.env.example` to `.env.local` and configure as needed:

```bash
cp .env.example .env.local
```

## Project Structure

```
src/
├── pages/              # Route pages (Dashboard, Analytics, etc.)
├── components/
│   ├── ui/            # Reusable UI components (Button, Input, Card)
│   ├── features/      # Feature components (WalletBalance, MealPreferences, etc.)
│   └── layout/        # Layout components (Navbar, Footer)
├── hooks/             # Custom React hooks
├── lib/               # Utilities and helpers
│   ├── utils.ts       # Utility functions (cn, formatters)
│   ├── api.ts         # API call functions
│   └── constants.ts   # App constants
└── styles/            # Global styles and theme
```

## Authentication

The app uses a mock authentication system for development. Demo credentials:

**Student**
- Roll Number: `22110001`
- Password: `password`

**Admin**
- Roll Number: `admin`
- Password: `password`

Replace with actual backend authentication in production.

## Key Components

### WalletBalance
Displays student's current balance and daily/monthly earnings
```tsx
<WalletBalance
  balance={250}
  earnedToday={35}
  monthlyEarnings={840}
/>
```

### ImpactIndicator
Shows real-world impact metrics
```tsx
<ImpactIndicator
  mealsSaved={12}
  costSaved={1800}
  waterSaved={32400}
  caloriesSaved={24000}
/>
```

### MealPreferences
Allows students to set meal preferences
```tsx
<MealPreferences
  date="Mon, Mar 28"
  preferences={preferences}
  onPreferenceChange={handleChange}
/>
```

## Styling System

The app uses Tailwind CSS with custom design tokens:

- **Primary**: `#217DC1` (Deep Blue)
- **Secondary**: `#00B4A6` (Teal)
- **Accent**: `#22C55E` (Green)
- **Success**: `#22C55E`
- **Warning**: `#F97316` (Orange)
- **Background**: Light mode `#F7F9FB`, Dark mode `#1E1F26`

## API Integration

API endpoints are mocked by default. To integrate with a real backend:

1. Update `VITE_API_URL` in `.env.local`
2. Modify API functions in `src/lib/api.ts`
3. Update mock data in custom hooks

## Performance Optimizations

- Lazy-loaded routes
- Memoized components
- Chart data caching
- Optimistic UI updates
- CSS-in-JS efficiency with Tailwind

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Keep components modular and reusable
4. Update tests when adding features
5. Follow the color scheme and design system

## Deployment

### To Vercel
```bash
pnpm build
# Push to GitHub and connect to Vercel
```

### Manual Deployment
```bash
pnpm build
# Upload dist/ folder to your hosting
```

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will use the next available port automatically.

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Tailwind Classes Not Applying
Ensure all component files are included in `tailwind.config.ts`:
```ts
content: ["./src/**/*.{js,ts,jsx,tsx}"]
```

## Future Enhancements

- [ ] Real-time notifications
- [ ] Social sharing features
- [ ] Advanced AI recommendations
- [ ] Integration with IoT scales
- [ ] Automated meal preference suggestions
- [ ] Anonymous feedback system
- [ ] Mobile app (React Native)

## License

MIT License - See LICENSE file for details

## Support

For issues or feature requests, please open an issue on GitHub or contact the development team.

## Acknowledgments

Built with ❤️ for sustainable food practices at IIT Gandhinagar
