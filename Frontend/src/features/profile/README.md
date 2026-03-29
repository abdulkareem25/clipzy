# Profile Page Documentation

## Overview
A professional profile page implementation with comprehensive features for viewing user information, following/unfollowing users, and browsing user posts.

## Features

### 🎯 Core Features
- **Profile Header**: Displays user profile picture, full name, username, and bio
- **Follow System**: Follow/Unfollow functionality with status tracking
- **Statistics**: Posts count, followers count, and following count with quick access
- **Edit Profile**: Option to edit profile for logged-in users viewing their own profile
- **Posts Grid**: Responsive grid displaying user's posts
- **Social Lists**: Browse followers and following lists with user navigation

### 📱 Responsive Design
- Mobile-first responsive layout
- Optimized for desktop, tablet, and mobile screens
- Smooth transitions and animations
- Touch-friendly interactive elements

## File Structure

```
features/profile/
├── contexts/
│   └── ProfileContext.jsx          # State management for profile data
├── hooks/
│   └── useProfile.js               # Hook for accessing profile context
├── pages/
│   └── Profile.jsx                 # Main profile page component
├── services/
│   └── profile.api.js              # API calls for profile endpoints
└── styles/
    └── profile.scss                # Profile page styling
```

## Component Architecture

### ProfileContext
Manages profile state including:
- `profileUser`: Current user's profile data
- `userPosts`: User's posts array
- `followers`: List of followers
- `following`: List of users the profile user follows
- `isFollowing`: Follow status for non-own profiles
- `loading`: Loading state
- `error`: Error handling

### useProfile Hook
Custom hook for accessing profile context with error handling:
```javascript
const { profileUser, userPosts, followers, following } = useProfile();
```

### Profile Component
Main component handling:
- Profile data fetching on mount
- Follow/unfollow interactions
- Tab navigation (currently posts)
- Responsive followers/following modal lists
- Loading and error states

## API Endpoints

### Frontend (Using axios)

#### Profile API Services (`profile.api.js`)
```javascript
// Fetch user profile
fetchUserProfile(userId)

// Fetch user's posts
fetchUserPosts(userId)

// Fetch followers
fetchFollowers(userId)

// Fetch following
fetchFollowing(userId)

// Check follow status
checkFollowStatus(userId)

// Follow a user
followUser(userId)

// Unfollow a user
unfollowUser(userId)

// Update user profile
updateUserProfile(userData)
```

### Backend (Node.js/Express)

#### Endpoints Added

**GET** `/api/users/:userId`
- Fetch user profile by ID
- Middleware: `identifyUser`, `validateObjectId`
- Response: User object (password excluded)

**PUT** `/api/users/profile`
- Update current user's profile
- Middleware: `identifyUser`
- Body: `{ fullName?, bio?, profilePicture? }`
- Response: Updated user object

#### Existing Endpoints Used
- **GET** `/api/users/followers/:userId` - Get followers list
- **GET** `/api/users/following/:userId` - Get following list
- **GET** `/api/users/follow/check/:userId` - Check follow status
- **POST** `/api/users/follow/:userId` - Follow user
- **POST** `/api/users/unfollow/:userId` - Unfollow user
- **GET** `/api/posts/get-posts/user/:userId` - Get user's posts

## Backend Controller Functions

### New Functions Added

#### `getUserById(req, res)`
- Retrieves user profile by ID
- Excludes password from response
- Returns formatted user object

#### `updateUserProfile(req, res)`
- Updates current user's profile information
- Validates input fields
- Returns updated user object

## Routing

### Frontend Routes
Added to `AppRoutes.jsx`:
```javascript
{
  path: '/profile/:userId',
  element: <Profile />
}
```

### Usage
- View own profile: Click profile button (after implementation in navbar)
- View others' profile: Click username/profile picture from posts or user lists
- Example URL: `/profile/userId123`

## Context Provider Setup

Make sure `ProfileProvider` is wrapped in your app hierarchy. Updated `App.jsx`:
```javascript
<AuthProvider>
  <PostProvider>
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  </PostProvider>
</AuthProvider>
```

## Styling System

Uses SCSS with CSS variables:
- **Color Palette**: Modern dark theme with blue primary accent
- **Spacing**: Consistent 8px-based spacing system
- **Typography**: Semantic font sizes and weights
- **Animations**: Smooth transitions (0.2s default)
- **Responsive Breakpoints**:
  - Desktop: Full grid layout
  - Tablet (768px): Adjusted grid
  - Mobile (480px): Single column

### Key SCSS Classes
```scss
.profile-container        // Main container
.profile-header          // Sticky header
.profile-hero            // Hero section with bio
.profile-stats           // Statistics section
.profile-tabs            // Tab navigation
.posts-grid              // Posts display grid
.followers-section       // Followers modal
.following-section       // Following modal
```

## Usage Examples

### Navigate to Profile
```javascript
import { useNavigate } from 'react-router';

const navigate = useNavigate();
navigate(`/profile/${userId}`);
```

### Access Profile Data
```javascript
import { useProfile } from './features/profile/hooks/useProfile';

function MyComponent() {
  const { profileUser, userPosts, isFollowing } = useProfile();
  
  return (
    <div>
      <h1>{profileUser.fullName}</h1>
      <p>Posts: {userPosts.length}</p>
    </div>
  );
}
```

## State Management Flow

```
1. User navigates to /profile/:userId
   ↓
2. Profile component mounted
   ↓
3. Fetch profile data (user, posts, followers, following)
   ↓
4. ProfileContext updated with data
   ↓
5. Component renders with data
   ↓
6. User interactions (follow, view followers, etc.)
   ↓
7. State updated accordingly
```

## Error Handling

- Profile not found: Error message with back button
- Network errors: User-friendly error display
- Loading states: Spinner during data fetch
- Follow/Unfollow errors: Inline error notifications

## Future Enhancements

1. **Edit Profile Modal**: Full edit functionality
2. **Profile Completion**: Show profile completion percentage
3. **User Badges**: Developer level, reputation badges
4. **Activity Feed**: User activity timeline
5. **Projects Showcase**: Featured projects section
6. **Bio Links**: Clickable links in bio
7. **Cover Image**: Header background customization
8. **Analytics Dashboard**: For own profile
9. **Block/Report User**: Safety features
10. **User Search**: Find users by name/username

## Testing Checklist

- [ ] Profile loads correctly for different users
- [ ] Follow/unfollow works properly
- [ ] Followers/following lists display correctly
- [ ] Posts grid responsive on all devices
- [ ] Profile picture loads with fallback
- [ ] Navigation between profiles works
- [ ] Own profile shows edit button
- [ ] Other profiles show follow button
- [ ] Loading states appear and disappear
- [ ] Error states display properly
- [ ] Back button works on all views

## Performance Considerations

- Posts are fetched once on component mount
- Profile data cached in context to avoid refetching
- Lazy loaded followers/following modal lists
- Optimized image loading with error fallback
- Responsive grid with CSS Grid for performance
- Memoization ready for future optimization

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliant
- Focus states for interactive elements
- Error messages properly announced

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes for Developers

1. **API Base URLs**: Ensure `baseURL` matches your backend server
2. **Authentication**: Requires valid authentication token in cookies
3. **Image Optimization**: Consider implementing image optimization for performance
4. **Error Logging**: Add logging service for production monitoring
5. **Rate Limiting**: Consider adding rate limiting for follow/unfollow
6. **Pagination**: Implement pagination for large post collections
7. **Caching Strategy**: Implement cache invalidation for profile updates
