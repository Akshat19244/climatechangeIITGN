# MessWise - Food Waste Reduction App

## Quick Start

### 1. Start the Development Server

Run this command from the root directory:

```bash
pnpm dev
```

This will start the Vite development server on `http://localhost:5173`

### 2. Login Credentials

The application uses mock authentication. Use any of these credentials:

**Student Account:**
- Roll Number: `22110001`
- Password: `22110001`

**Admin Account:**
- Roll Number: `admin`
- Password: `admin`

## What's Included

### Student Dashboard Features
1. **Home Tab** - Welcome section with impact metrics
2. **Wastage Logs** - View daily, weekly, and monthly wastage trends
3. **Meals** - Reserve meals and see real-time wallet deductions
4. **Feedback** - Rate food items for each meal
5. **Wallet** - Check balance and transaction history
6. **Profile** - Personal info, notification preferences, privacy settings, and export data as CSV

### Admin Dashboard Features
1. **Dashboard** - Campus-wide statistics and charts
2. **Student Analytics** - View student rankings by wastage with export to CSV
3. **Menu Management** - Add/edit/delete food items for breakfast, lunch, and dinner
4. **Reservations** - View meal reservations by hostel (A-L)
5. **Feedback** - Analyze food feedback and ratings
6. **Notifications** - System notifications from student feedback
7. **Settings** - Configure system parameters and notification preferences

## Key Features Implemented

✅ Complete student dashboard with 6 tabs  
✅ Full admin dashboard with 7 tabs  
✅ Meal reservation system with wallet integration  
✅ Real-time wallet balance updates  
✅ Food rating and feedback system  
✅ CSV export functionality for reports  
✅ 12 hostels (A-L) support  
✅ Notification preferences management  
✅ Beautiful eco-friendly UI with green/teal color scheme  
✅ Responsive mobile-first design  

## Architecture

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.1 with custom eco-friendly color palette
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite 7

## File Structure

```
artifacts/messwise/
├── src/
│   ├── pages/
│   │   ├── Login.tsx           # Login page with gradient background
│   │   ├── StudentDashboard.tsx # Main student interface (6 tabs)
│   │   └── AdminDashboard.tsx   # Admin interface (7 tabs)
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── App.tsx                 # Main app routing
│   └── main.tsx                # Entry point
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── index.html
```

## Demo Data

The app comes with pre-populated demo data:
- Student wastage metrics
- Food items with ratings
- Meal reservations
- Transaction history
- Notifications

## Development

The app uses local storage to maintain authentication state during the session. Upon logout, all session data is cleared.

All features are fully functional with mock data and can be connected to a real backend API by updating the API calls in `src/lib/api.ts`.

## Next Steps

1. Connect to a backend API for persistent data
2. Integrate face recognition for meal service
3. Add IoT weight scale integration
4. Implement real-time notifications
5. Add analytics exports and reporting

Enjoy using MessWise! 🌱
