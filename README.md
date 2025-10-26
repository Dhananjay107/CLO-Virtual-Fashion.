# CLO Connect - Virtual Fashion Platform

A modern, responsive web application for browsing and filtering virtual fashion content with infinite scroll, advanced search, and URL persistence.

![CLO Connect](https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg)

## 🌐 Live Demo

[**Visit the live application →**](https://clovirtualfashion.netlify.app/)

## 🚀 Features

### 🔍 **Search & Filtering**
- **Keyword Search**: Search across creator names and item titles
- **Pricing Filters**: Filter by Paid, Free, or View Only items
- **Price Range Slider**: Interactive slider for paid items (0-999)
- **Sort Options**: Sort by Relevance, Item Name, Higher Price, or Lower Price
- **URL Persistence**: All filters persist across page reloads

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Grid**: 1-4 columns based on screen width
- **Touch Support**: Full touch interaction support
- **Modern UI**: Clean, professional design with green accent colors

### ♾️ **Infinite Scroll**
- **Progressive Loading**: Loads 20 items at a time
- **Skeleton Loading**: Visual feedback during loading
- **Client-side Pagination**: No additional API calls
- **All Items Searchable**: Filters work across all 52 items

### 🎨 **Interactive Cards**
- **Hover Effects**: Image zoom on hover/touch
- **Smooth Animations**: 300ms transitions
- **Visual Feedback**: Green overlays and scaling effects

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.6 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Image Optimization**: Next.js Image component
- **API**: RESTful API integration

## 📦 Installation

### Prerequisites
- Node.js v20.19.5
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CLO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
CLO/
├── components/           # React components
│   ├── AppWrapper.tsx    # Main app container with URL sync
│   ├── ContentCard.tsx   # Individual item cards
│   ├── ContentGrid.tsx   # Grid layout with infinite scroll
│   ├── Header.tsx        # App header with CONNECT logo
│   ├── SearchAndFilter.tsx # Search and filter controls
│   └── SkeletonCard.tsx  # Loading skeleton components
├── hooks/                # Custom React hooks
│   ├── useUrlSync.ts     # URL parameter synchronization
│   └── useContentData.ts # Content data fetching
├── pages/               # Next.js pages
│   ├── _app.tsx         # App configuration
│   ├── _document.tsx    # Document configuration
│   └── index.tsx        # Home page
├── store/               # Redux store
│   ├── hooks.ts         # Typed Redux hooks
│   ├── index.ts         # Store configuration
│   ├── types.ts         # TypeScript interfaces
│   └── slices/          # Redux slices
│       ├── contentSlice.ts  # Content state management
│       └── filterSlice.ts   # Filter state management
├── services/            # API services
│   └── api.ts           # API calls and data processing
├── types/               # TypeScript type definitions
│   └── index.ts         # Global types
├── utils/               # Utility functions and constants
│   ├── constants.ts     # Static data and constants
│   ├── helpers.ts        # Reusable utility functions
│   └── filterUtils.ts   # Filtering and sorting logic
└── styles/              # Global styles
    └── globals.css      # Tailwind CSS imports and custom styles
```

## 🎯 Key Features

### 🔍 **Search & Filter System**

#### Keyword Search
- Searches across creator names and item titles
- Case-insensitive matching
- Real-time filtering as you type

#### Pricing Options
- **Paid**: Items with price > $0
- **Free**: Items marked as free
- **View Only**: Items for viewing only
- Multiple selections supported

#### Price Range Filter
- Interactive slider with real-time updates
- Range: $0 - $999
- Only active when "Paid" option is selected

#### URL Persistence
All filters are saved in the URL:
```
/?keyword=jacket&pricing=paid&minPrice=20&maxPrice=100&sort=price-low
```

### ♾️ **Infinite Scroll**

#### How It Works
1. Initial Load: Fetches all 52 items from API
2. First Batch: Displays first 20 items
3. Scroll Detection: Triggers at 500px from bottom
4. Load More: Adds next 20 items
5. Continue: Until all items are displayed

### 🎨 **Interactive Card Design**

#### Visual Effects
- Image zoom: 110% scale on hover/touch
- Green overlays: Subtle tint on interaction
- Smooth animations: All effects use 300ms transitions

## 🔧 Configuration

### Constants
Update values in `utils/constants.ts`:
```typescript
export const PRICE_RANGE = {
  MIN: 0,
  MAX: 999
};

export const SCROLL_THRESHOLD = 500;
export const LOADING_DELAY = 300;
```

### Image Optimization
Configure remote image domains in `next.config.ts`:
```typescript
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'closetfrontrecruiting.blob.core.windows.net',
    pathname: '/images/**',
  },
  {
    protocol: 'https',
    hostname: 'storagefiles.clo-set.com',
    pathname: '/public/**',
  },
]

## 🔄 Custom Hooks

This project uses custom React hooks for better code organization and reusability.

### Hooks
- **`useUrlSync.ts`**: Synchronizes URL query parameters with Redux filter state
- **`useContentData.ts`**: Manages content data fetching and loading state

These hooks are used in `AppWrapper` component to separate concerns and keep the component focused on rendering.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Netlify

#### Option 1: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```

#### Option 2: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com) and sign up/login
3. Click "New site from Git"
4. Choose your repository
5. Netlify will auto-detect the settings from `netlify.toml`
6. Click "Deploy site"

#### Option 3: Manual Deploy
1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Set up continuous deployment from your Git repository

## 📊 API Integration

### Data Structure
```typescript
interface ContentItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number; // 0: Paid, 1: Free, 2: View Only
  imagePath: string;
  price: number;
}
```

### API Endpoint
- **Base URL**: `https://closet-recruiting-api.azurewebsites.net/api/data`
- **Method**: GET
- **Response**: Array of ContentItem objects

## 🎨 Styling Guide

### Color Palette
- **Primary**: Green (`#10B981`)
- **Background**: Dark Gray (`#111827`)
- **Cards**: Gray (`#1F2937`)
- **Text**: White (`#FFFFFF`)
- **Secondary Text**: Gray (`#9CA3AF`)
- **Checkbox/Slider**: Gray (`#787878`)

### Responsive Breakpoints
- **Mobile**: Default (0px+)
- **Small**: `sm:` (640px+)
- **Medium**: `md:` (768px+)
- **Large**: `lg:` (1024px+)

## 🐛 Troubleshooting

### Common Issues

#### Images Not Loading
- Check `next.config.ts` for correct remote patterns
- Verify image URLs are accessible

#### Filters Not Persisting
- Ensure URL parameters are properly formatted
- Check browser console for JavaScript errors

#### Infinite Scroll Not Working
- Check if `hasMore` state is correct
- Verify scroll event listeners are attached

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **CLO-SET**: For providing the API and design assets
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Redux Toolkit**: For state management

---

**Built with ❤️ for the CLO Connect platform**