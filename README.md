# CLO Connect - Virtual Fashion Platform

A modern, responsive web application for browsing and filtering virtual fashion content with infinite scroll, advanced search, and URL persistence.

![CLO Connect](https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg)

## 🚀 Features

### 🔍 **Advanced Search & Filtering**
- **Keyword Search**: Search across creator names and item titles
- **Pricing Filters**: Filter by Paid, Free, or View Only items
- **Price Range Slider**: Dual-handle range slider for paid items (0-999)
- **Sort Options**: Sort by Item Name, Higher Price, or Lower Price
- **URL Persistence**: All filters persist across page reloads via URL parameters

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Grid**: 1-4 columns based on screen width
- **Touch Support**: Full touch interaction support
- **Modern UI**: Clean, professional design with green accent colors

### ♾️ **Infinite Scroll**
- **Progressive Loading**: Loads 20 items at a time
- **Smooth UX**: Skeleton loading states
- **Performance Optimized**: Client-side pagination
- **All Items Searchable**: Filters work across all 52 items

### 🎨 **Interactive Cards**
- **Floating Image Containers**: Prominent shadows for depth
- **Hover Effects**: Image zoom on hover/touch
- **Smooth Animations**: 300ms transitions
- **Visual Feedback**: Green overlays and scaling effects

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Image Optimization**: Next.js Image component
- **Icons**: Custom SVG icons
- **API**: RESTful API integration

## 📦 Installation

### Prerequisites
- Node.js 18+ 
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
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
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
│   ├── ContentCard.tsx   # Individual item cards with hover effects
│   ├── ContentGrid.tsx   # Grid layout with infinite scroll
│   ├── Header.tsx        # App header with CONNECT logo
│   ├── SearchAndFilter.tsx # Search and filter controls
│   └── SkeletonCard.tsx  # Loading skeleton components
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
├── utils/               # Utility functions
│   └── filterUtils.ts   # Filtering and sorting logic
└── styles/              # Global styles
    └── globals.css      # Tailwind CSS imports
```

## 🎯 Key Features Explained

### 🔍 **Search & Filter System**

#### Keyword Search
- Searches across **creator names** and **item titles**
- Case-insensitive matching
- Real-time filtering as you type
- Works with all 52 items in the dataset

#### Pricing Options
- **Paid**: Items with price > $0
- **Free**: Items marked as free
- **View Only**: Items for viewing only
- Multiple selections supported

#### Price Range Filter
- **Dual-handle slider**: Min and max price selection
- **Range**: $0 - $999
- **Validation**: Prevents invalid ranges
- **Only active**: When "Paid" option is selected

#### URL Persistence
All filters are saved in the URL for easy sharing and bookmarking:
```
/?keyword=jacket&pricing=paid&minPrice=20&maxPrice=100&sort=price-low
```

### ♾️ **Infinite Scroll Implementation**

#### How It Works
1. **Initial Load**: Fetches all 52 items from API
2. **First Batch**: Displays first 20 items
3. **Scroll Detection**: Triggers at 500px from bottom
4. **Load More**: Adds next 20 items
5. **Continue**: Until all items are displayed

#### Performance Features
- **Client-side pagination**: No additional API calls
- **Skeleton loading**: Visual feedback during loading
- **Smooth transitions**: 300ms delay for better UX
- **Memory efficient**: Only renders visible items

### 🎨 **Interactive Card Design**

#### Visual Effects
- **Floating containers**: Prominent shadows create depth
- **Image zoom**: 110% scale on hover/touch
- **Green overlays**: Subtle tint on interaction
- **Smooth animations**: All effects use 300ms transitions

#### Responsive Behavior
- **Desktop**: Mouse hover effects
- **Mobile**: Touch start/end effects
- **Tablet**: Both mouse and touch support

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:
```env
NEXT_PUBLIC_API_URL=https://closet-recruiting-api.azurewebsites.net/api/data
```

### Customization Options

#### Pagination Size
Modify `ITEMS_PER_PAGE` in `store/slices/contentSlice.ts`:
```typescript
const ITEMS_PER_PAGE = 20; // Change to 10, 30, 50, etc.
```

#### Image Optimization
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
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

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

### Typography
- **Headings**: Font weight 500-600
- **Body**: Font weight 400
- **Small Text**: Font weight 400, smaller size

### Spacing
- **Container Padding**: 24px (px-6)
- **Card Padding**: 16px (p-4)
- **Grid Gap**: 24px (gap-6)

## 🐛 Troubleshooting

### Common Issues

#### Images Not Loading
- Check `next.config.ts` for correct remote patterns
- Verify image URLs are accessible
- Check browser console for CORS errors

#### Filters Not Persisting
- Ensure URL parameters are properly formatted
- Check browser console for JavaScript errors
- Verify Redux state is updating correctly

#### Infinite Scroll Not Working
- Check if `hasMore` state is correct
- Verify scroll event listeners are attached
- Check for JavaScript errors in console

### Performance Issues
- Reduce `ITEMS_PER_PAGE` for slower devices
- Check image sizes and optimization
- Monitor Redux state updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CLO-SET**: For providing the API and design assets
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Redux Toolkit**: For state management

## 📞 Support

For support, email support@clo-set.com or create an issue in the repository.

---

**Built with ❤️ for the CLO Connect platform**
