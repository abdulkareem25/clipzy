# Clipzy - Backend API Server

A production-ready REST API for social content sharing platform built with **Node.js**, **Express.js**, and **MongoDB**. This backend server handles all core functionalities including authentication, post management, user profiles, engagement tracking, and social interactions.

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: February 2026

---

## 🎯 Overview

Clipzy Backend is a complete REST API server providing:
- **User Management**: Registration, authentication, profile management
- **Content Platform**: Post creation with image uploads via ImageKit
- **Social Features**: Like system, advanced follow mechanism with request workflow
- **Security**: JWT-based authentication, password hashing with bcrypt
- **Database**: MongoDB with Mongoose ODM for data persistence
- **Scalability**: Clean MVC architecture ready for enterprise deployment

---

## 🛠️ Tech Stack

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| **express** | ^5.2.1 | Web framework |
| **mongoose** | ^9.2.0 | MongoDB ODM |
| **jsonwebtoken** | ^9.0.3 | JWT authentication |
| **bcrypt** | ^6.0.0 | Password hashing |
| **multer** | ^2.0.2 | File uploads |
| **@imagekit/nodejs** | ^7.3.0 | Cloud image storage |
| **morgan** | ^1.10.1 | HTTP logging |
| **cookie-parser** | ^1.4.7 | Cookie handling |
| **dotenv** | ^17.2.4 | Environment variables |

### Development Tools
- **nodemon**: Auto-restart on file changes
- **Node.js Runtime**: Server execution

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- ImageKit account for image storage
- npm or yarn

### Installation

1. **Clone and Setup**
```bash
cd Backend
npm install
```

2. **Environment Configuration** - Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clipzy
JWT_SECRET=your_super_secret_jwt_key_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NODE_ENV=development
```

3. **Start Server**
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will be running at `http://localhost:5000`

---

## 📁 Directory Structure

```
Backend/
│
├── server.js                          # Application entry point
├── package.json                       # Project dependencies
├── .env                              # Environment variables (not in git)
├── .gitignore                        # Git ignore rules
│
└── src/
    │
    ├── app.js                        # Express app setup & middleware
    │
    ├── config/
    │   └── db.js                     # MongoDB connection setup
    │
    ├── controllers/                  # Business logic layer
    │   ├── auth.controllers.js       # Auth endpoints logic
    │   ├── post.controllers.js       # Post CRUD & engagement
    │   └── user.controllers.js       # User & follow system logic
    │
    ├── middlewares/                  # Custom middleware functions
    │   ├── auth.middleware.js        # JWT verification & user identification
    │   └── validateObjectId.middleware.js  # MongoDB ObjectId validation
    │
    ├── models/                       # Data schemas & models
    │   ├── user.model.js             # User schema & validation
    │   ├── post.model.js             # Post schema with references
    │   ├── like.model.js             # Like schema with unique constraints
    │   └── follow.model.js           # Follow schema with status tracking
    │
    ├── routes/                       # API route definitions
    │   ├── auth.routes.js            # Authentication routes
    │   ├── post.routes.js            # Post management routes
    │   └── user.routes.js            # User & follow routes
    │
    └── services/
        └── storage.service.js        # ImageKit image upload service
```

---

## 🔌 API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Sign Up
```
POST /auth/sign-up
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "success": true,
  "user": { _id, name, username, email, bio, profilePicture }
}
```

#### Sign In
```
POST /auth/sign-in
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Sign Out
```
POST /auth/sign-out
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Post Endpoints

#### Create Post
```
POST /posts/create-post
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- image: [file]
- caption: "Beautiful sunset! 🌅"

Response: 201 Created
{
  "success": true,
  "post": { _id, imageUrl, caption, userId, createdAt }
}
```

#### Get All Posts
```
GET /posts/get-posts
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "posts": [...]
}
```

#### Get Post Details
```
GET /posts/details/:postId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "post": { ... }
}
```

#### Like Post
```
POST /posts/like/:postId
Authorization: Bearer {token}

Response: 201 Created
{
  "success": true,
  "message": "Post liked"
}
```

#### Unlike Post
```
POST /posts/dislike/:postId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Post unliked"
}
```

---

### User & Follow Endpoints

#### Send Follow Request
```
POST /users/follow/request/:followeeId
Authorization: Bearer {token}

Response: 201 Created
{
  "success": true,
  "message": "Follow request sent"
}
```

#### Get Pending Requests
```
GET /users/follow/pending/
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "requests": [...]
}
```

#### Accept Follow Request
```
POST /users/follow/accept/:followerId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Follow request accepted"
}
```

#### Reject Follow Request
```
POST /users/follow/reject/:followerId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Follow request rejected"
}
```

#### Get Followers
```
GET /users/followers/:followeeId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "followers": [...]
}
```

#### Get Following
```
GET /users/following/:followerId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "following": [...]
}
```

#### Unfollow User
```
POST /users/unfollow/:followeeId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Unfollowed successfully"
}
```

---

## 💾 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  bio: String,
  profilePicture: String (default: imagekit URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Posts Collection
```javascript
{
  _id: ObjectId,
  imageUrl: String (required),
  caption: String (required),
  userId: ObjectId (ref: 'users', required),
  createdAt: Date (default: now)
}
```

### Likes Collection
```javascript
{
  _id: ObjectId,
  postId: ObjectId (ref: 'posts', required),
  userId: ObjectId (ref: 'users', required),
  createdAt: Date,
  updatedAt: Date
}
// Unique compound index on (postId, userId) - prevents duplicate likes
```

### Follows Collection
```javascript
{
  _id: ObjectId,
  followerId: ObjectId (ref: 'users'),
  followeeId: ObjectId (ref: 'users'),
  status: String (enum: ['pending', 'accepted', 'rejected'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
// Unique compound index on (followerId, followeeId)
```

---

## 🔐 Middleware Pipeline

### Authentication Flow
```
Request → auth.middleware.js
  ↓ (Verify JWT token from headers)
  ↓ (Extract user ID from token)
  ↓ (Attach user to request object)
  ↓ Route Handler
  ↓ Response
```

### ObjectId Validation
```
Request with :paramId → validateObjectId.middleware.js
  ↓ (Check if valid MongoDB ObjectId)
  ↓ (Pass or return 400 error)
  ↓ Route Handler
```

---

## 🔒 Security Implementation

### Password Security
- **Bcrypt Hashing**: Passwords hashed with salt rounds (10)
- **Never Stored in Plain Text**: Database stores hashed values only
- **Comparison**: Uses bcrypt.compare() for authentication

### Authentication
- **JWT Tokens**: Stateless authentication
- **Token Payload**: Includes userId and expiration
- **Protected Routes**: All user endpoints require valid token
- **Cookie Support**: Tokens can be stored in secure http-only cookies

### Database Constraints
- **Unique Indexes**: Username, email (prevents duplicates)
- **Compound Indexes**: postId+userId (prevents like duplicates), followerId+followeeId
- **Foreign Keys**: User references in posts, likes, follows

### Input Validation
- **ObjectId Validation**: All MongoDB ID parameters validated
- **Schema Validation**: Mongoose schema-level validation
- **Required Fields**: Enforced at model level

---

## 🛡️ Error Handling

### Standard Response Format
```javascript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: "Error message" }
```

### Common HTTP Status Codes
- **201**: Created (post created successfully)
- **200**: OK (operation successful)
- **400**: Bad Request (invalid input)
- **401**: Unauthorized (missing/invalid token)
- **404**: Not Found (resource doesn't exist)
- **500**: Server Error

---

## 📊 Implementation Checklist

| Feature | Status | Details |
|---------|--------|---------|
| User Registration | ✅ | Secure password hashing with bcrypt |
| User Login | ✅ | JWT token generation |
| User Logout | ✅ | Cookie clearing |
| Post Creation | ✅ | Image upload via ImageKit |
| Post Retrieval | ✅ | List all/specific posts |
| Like System | ✅ | Unique constraint per user-post |
| Unlike System | ✅ | Remove like records |
| Follow Requests | ✅ | Pending approval system |
| Accept Follows | ✅ | Approve follow requests |
| Reject Follows | ✅ | Deny follow requests |
| Get Followers | ✅ | Retrieve follower list |
| Get Following | ✅ | Retrieve following list |
| Unfollow | ✅ | Remove follower relationship |

---

## 🚀 Deployment Guide

### Local Deployment
```bash
npm install
npm start
```

### Cloud Deployment (Heroku Example)
```bash
heroku create clipzy-api
heroku config:set PORT=5000
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your_secret
heroku config:set IMAGEKIT_PRIVATE_KEY=your_key
git push heroku main
```

### Environment-Specific Config
```javascript
// In app.js or config
if (process.env.NODE_ENV === 'production') {
  // Enable CORS for frontend domain
  // Enable compression
  // Set secure cookie options
}
```

---

## 📝 API Response Examples

### Create Post Success
```json
{
  "success": true,
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "imageUrl": "https://ik.imagekit.io/clipzy/image_abc123.jpg",
    "caption": "Amazing view!",
    "userId": "507f1f77bcf86cd799439012",
    "createdAt": "2026-02-21T10:30:00.000Z"
  }
}
```

### Follow Request Success
```json
{
  "success": true,
  "message": "Follow request sent",
  "follow": {
    "_id": "507f1f77bcf86cd799439013",
    "followerId": "507f1f77bcf86cd799439001",
    "followeeId": "507f1f77bcf86cd799439002",
    "status": "pending",
    "createdAt": "2026-02-21T10:35:00.000Z"
  }
}
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes following the code structure
3. Add tests if applicable
4. Commit: `git commit -m "Add: feature description"`
5. Push: `git push origin feature/feature-name`
6. Create Pull Request

---

## 📄 License

ISC

---

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository or contact the development team.
