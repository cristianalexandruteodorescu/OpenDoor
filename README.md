# OpenDoor - Real Estate Listings Application

A modern, production-ready React application for browsing and filtering real estate listings. Built with React Router v7, Redux Toolkit, TypeScript, and SCSS.

## 🚀 Features

- 🏠 Browse real estate listings with rich property details
- 🗺️ Interactive Google Maps integration
- 🔍 Advanced filtering and search capabilities
- ⚡ Virtualized list rendering for optimal performance
- 📱 Fully responsive design
- 🎨 Modern UI with SCSS and design system
- 🔄 Real-time state management with Redux Toolkit
- 🖼️ Image carousels with Swiper

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn** or **pnpm**
- **Git**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd OpenDoor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Or create a new `.env` file with the following variables:

```env
# Listings API URL (required)
VITE_LISTINGS_API_URL=https://your-api-url.com/api/listings

# Google Maps API Key (required for map functionality)
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

#### Environment Variables Explained

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_LISTINGS_API_URL` | Yes | The API endpoint that returns listings data in the format: `{ deals: [...] }` |
| `VITE_GOOGLE_MAPS_API_KEY` | NO | Your Google Maps JavaScript API key for map rendering |

> **Note:** All environment variables must be prefixed with `VITE_` to be accessible in the browser.

## 🚀 Running the Application

### Development Mode

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

## 📁 Project Structure

```
OpenDoor/
├── app/
│   ├── api/                    # API utilities
│   │   └── listingsApi.ts      # Listings API client
│   ├── components/             # React components
│   │   ├── FilterBar.tsx       # Filter controls
│   │   ├── Header.tsx          # App header with search
│   │   ├── ListingCard.tsx     # Property card component
│   │   ├── ListingCardBody.tsx # Card body content
│   │   ├── ListingCardImage.tsx # Card image carousel
│   │   ├── ListingsMap.tsx     # Google Maps integration
│   │   ├── ListingsStatusCard.tsx # Loading/empty states
│   │   ├── SectionListings.tsx # Listings container
│   │   └── SelectPill.tsx      # Filter pill component
│   ├── constants/              # Application constants
│   │   ├── filterBarOptions.ts
│   │   ├── homePageMessages.ts
│   │   ├── listingCardImages.ts
│   │   ├── listingsMap.ts
│   │   └── sectionListings.ts
│   ├── hooks/                  # Custom React hooks
│   │   └── useListings.ts      # Listings data hook
│   ├── listings/               # Redux slice for listings
│   │   ├── listingsSlice.ts    # Redux slice & reducers
│   │   ├── listingsThunks.ts   # Async thunks
│   │   └── types.ts            # TypeScript types
│   ├── routes/                 # React Router routes
│   │   └── home.tsx            # Home page route
│   ├── styles/                 # SCSS stylesheets
│   │   ├── _variables.scss     # Design system variables
│   │   ├── header.scss         # Header styles
│   │   ├── listings.scss       # Main listings styles (imports partials)
│   │   └── listings/           # Component-specific styles
│   │       ├── _filter-bar.scss
│   │       ├── _listing-card.scss
│   │       ├── _listings-map.scss
│   │       ├── _listings-page.scss
│   │       └── _utilities.scss
│   ├── root.tsx                # Root layout component
│   ├── routes.ts               # Route configuration
│   └── store.ts                # Redux store configuration
├── public/                     # Static assets
│   └── favicon.ico
├── .dockerignore
├── .gitignore
├── Dockerfile                  # Docker configuration
├── package.json
├── react-router.config.ts      # React Router config
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

## 🏗️ Architecture Overview

### State Management

The application uses **Redux Toolkit** for state management:

- **Store**: Centralized state in `app/store.ts`
- **Slices**: Feature-based slices in `app/listings/`
  - `listingsSlice.ts` - Reducers and actions
  - `listingsThunks.ts` - Async actions (API calls)
  - `types.ts` - TypeScript type definitions

### Data Flow

1. **Component** calls `useListings()` hook
2. **Hook** dispatches `fetchListings()` thunk
3. **Thunk** calls `fetchListingsFromApi()` utility
4. **API utility** fetches data and maps to `Listing` type
5. **Redux** updates state with fetched listings
6. **Component** re-renders with new data

### Styling Architecture

- **SCSS Variables**: Centralized design tokens in `_variables.scss`
- **Component Styles**: Modular SCSS files per component
- **BEM Methodology**: Block Element Modifier naming convention
- **Responsive Design**: Mobile-first approach with breakpoints

## 📖 Development Guide

### Adding a New Component

1. Create component file in `app/components/`
2. Create corresponding SCSS file in `app/styles/` or `app/styles/[feature]/`
3. Import styles in component or parent route
4. Export component from appropriate location

### Adding a New Route

1. Create route file in `app/routes/`
2. Add route configuration in `app/routes.ts`
3. Import and use in navigation

### Working with Redux

#### Adding a New Action

```typescript
// In listingsSlice.ts
reducers: {
  newAction(state, action: PayloadAction<PayloadType>) {
    // Update state
  }
}
```

#### Adding an Async Action

```typescript
// In listingsThunks.ts
export const fetchNewData = createAsyncThunk(
  "listings/fetchNewData",
  async (params, { rejectWithValue }) => {
    try {
      const data = await apiCall(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Styling Guidelines

1. **Use Variables**: Always use variables from `_variables.scss`
2. **BEM Naming**: Follow Block__Element--Modifier pattern
3. **Component Isolation**: Keep component styles in separate files
4. **Mobile First**: Write mobile styles first, then desktop

Example:
```scss
.my-component {
  padding: $spacing-lg;
  color: $color-text-primary;
  
  &__title {
    font-size: $font-size-xl;
  }
  
  &--highlighted {
    background: $color-accent;
  }
}
```

## ✅ Best Practices

### Code Organization

- ✅ **Keep components small and focused** - Single Responsibility Principle
- ✅ **Use TypeScript types** - Define types in `types.ts` files
- ✅ **Extract reusable logic** - Create custom hooks for shared logic
- ✅ **Separate concerns** - API calls in `api/`, state in Redux, UI in components

### Performance

- ✅ **Use React.memo** - Memoize expensive components
- ✅ **Virtualize long lists** - Use `react-virtuoso` for large datasets
- ✅ **Lazy load images** - Implement image lazy loading
- ✅ **Code splitting** - Leverage React Router's code splitting

### State Management

- ✅ **Use Redux Toolkit** - Follow RTK patterns and conventions
- ✅ **Normalize state** - Keep state structure flat and normalized
- ✅ **Async actions** - Use `createAsyncThunk` for API calls
- ✅ **Selectors** - Use `useAppSelector` for accessing state

### Styling

- ✅ **Use design tokens** - Always reference variables from `_variables.scss`
- ✅ **Consistent spacing** - Use spacing scale variables
- ✅ **Responsive design** - Mobile-first approach
- ✅ **Accessibility** - Use semantic HTML and ARIA attributes

### Git Workflow

- ✅ **Meaningful commits** - Write clear commit messages
- ✅ **Feature branches** - Work on feature branches, not main
- ✅ **Code review** - Request reviews before merging
- ✅ **Keep commits focused** - One logical change per commit

## 📚 Technologies Used

- **React 19** - UI library
- **React Router v7** - Routing and SSR
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **SCSS** - Styling with variables
- **Vite** - Build tool and dev server
- **Google Maps API** - Map integration
- **Swiper** - Image carousels
- **React Virtuoso** - List virtualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

