# Clipzy - Social Media Platform

A full-stack social content sharing application with complete backend infrastructure and active frontend development.

**Project Status**: 🟢 Backend Complete | 🟡 Frontend In Active Development (60% complete)

---

## 📊 Project Overview

Clipzy is a modern social media platform enabling users to share content, interact with posts, and build communities through an advanced follow system. The project is structured in two major components:

- **Backend** ✅ **COMPLETE** - Fully functional REST API with all core features
- **Frontend** 🚀 **IN PROGRESS** - Building responsive user interface

---

## ✅ Backend Status: COMPLETE

### Deliverables Summary
The backend has been successfully developed with the following implementations:

#### 🔐 Authentication System
- User registration with secure password hashing (bcrypt)
- JWT-based login/logout functionality
- Protected routes with middleware authentication
- Session management with cookie support

#### 👤 User Management
- User profile creation and customization
- Profile pictures with ImageKit cloud storage
- Bio and description support
- User discovery capabilities

#### 📸 Content Management
- Post creation with image uploads
- Cloud-based image hosting via ImageKit
- Caption support for posts
- Post retrieval and details endpoints

#### 💬 Engagement Features
- Like/Unlike system with unique constraints
- Post-specific engagement tracking
- One-like-per-user validation

#### 👥 Social Features
- Advanced follow request system
- Follow request approval workflow (pending/accepted/rejected)
- Follower and following lists
- Unfollow functionality
- Privacy-aware follow management

### Backend Tech Stack
```
Framework:      Node.js + Express.js
Database:       MongoDB with Mongoose ODM
Authentication: JWT + Bcrypt
File Storage:   ImageKit (Cloud)
Utilities:      Multer, Morgan, Cookie-Parser, Dotenv
```

### Backend Architecture
```
Backend/
├── server.js & package.json
├── .env (configuration)
└── src/
    ├── app.js (Express setup)
    ├── config/db.js (MongoDB connection)
    ├── controllers/ (business logic)
    ├── models/ (data schemas)
    ├── routes/ (API endpoints)
    ├── middlewares/ (auth & validation)
    └── services/ (storage service)
```

### API Endpoints (14 Total)
- **3 Auth Endpoints**: Sign up, Sign in, Sign out
- **5 Post Endpoints**: Create, Get all, Get details, Like, Unlike
- **6 User/Follow Endpoints**: Request, Accept, Reject, Get pending, Get followers, Get following, Unfollow

📋 **Full Backend Documentation**: See [Backend/README.md](Backend/README.md) for complete API reference and technical details

---

## 🚀 Frontend Status: IN DEVELOPMENT

### Current Phase
Frontend development is actively underway with focus on:

#### 🎨 Planned Features
- User-friendly authentication interface (Sign up/Sign in)
- Responsive post feed display
- Image upload interface
- Like/Unlike interaction UI
- Advanced follow system interface
- User profile pages
- Follower/Following management UI
- Real-time UI updates

#### 🛠️ Technology Stack
- **Framework**: React.js 18+ with Vite
- **Styling**: SCSS/SASS with modular structure
- **State Management**: React Context API + Custom Hooks
- **HTTP Client**: Fetch API
- **Build Tool**: Vite

#### 📁 Frontend Structure (Active)
```
Frontend/
├── public/
├── src/
│   ├── features/
│   │   ├── auth/        # Auth pages & services
│   │   ├── post/        # Post components & feed
│   │   ├── profile/     # User profiles
│   │   └── shared/      # Shared styles
│   ├── pages/           # Route pages
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── index.html
```

---

## 🔄 Project Workflow

### Development Timeline

| Phase | Component | Status | Details |
|-------|-----------|--------|---------|
| Phase 1 | Backend API | ✅ **COMPLETE** | All 14 endpoints functional & tested |
| Phase 2 | Frontend UI | 🟡 **IN PROGRESS** | 60% complete - Auth, Post, Profile features |
| Phase 3 | Integration | ⏳ Pending | Connect frontend with backend APIs |
| Phase 4 | Deployment | ⏳ Pending | Cloud deployment setup |
| Phase 5 | Testing | ⏳ Pending | QA & performance testing |

---

## 🎯 Next Steps

### Frontend Development (Active)
1. ✅ Backend ready for integration
2. ✅ Frontend project structure & Vite setup
3. ✅ Authentication pages (Sign up, Sign in) - Structure in place
4. ✅ Post feed component - Core structure built
5. ✅ Post creation interface - In development
6. ✅ User profile pages - Foundation created
7. 🚀 Connect all features to backend APIs
8. 🚀 Image upload functionality refinement
9. ⏳ Follow system UI improvements
10. ⏳ Real-time updates & notifications
11. ⏳ Responsive design polish

### Testing & Deployment
- Unit & integration testing
- End-to-end testing
- Performance optimization
- Cloud deployment (Heroku, Vercel, etc.)

---

## 🏗️ Getting Started

### Backend (Already Deployed)
```bash
cd Backend
npm install
npm run dev
# Server running on http://localhost:5000
```

### Frontend (In Development)
```bash
cd Frontend
npm install
npm run dev
# Frontend running on http://localhost:3000/5173 (depending on build tool)
```

---

## 📚 Documentation

- **Backend Documentation**: [Backend/README.md](Backend/README.md)
  - Complete API reference
  - Database schema details
  - Security implementation
  - Deployment guide

- **Project Structure**: See directory layout above

---

## 🔐 Security & Best Practices

### Implemented (Backend)
✅ Password encryption with bcrypt
✅ JWT-based authentication
✅ Protected API routes
✅ Database constraints & validation
✅ Input sanitization

### Planned (Frontend)
⏳ HTTPS enforcement
⏳ Secure token storage
⏳ CSRF protection
⏳ XSS prevention

---

## 📊 Features Checklist

### Backend ✅
- [x] User Authentication
- [x] User Profiles
- [x] Post Creation & Management
- [x] Image Upload & Storage
- [x] Like System
- [x] Follow System with Requests
- [x] Follow Acceptance/Rejection
- [x] Security & JWT
- [x] Database Optimization

### Frontend 🚀
- [x] Project Structure & Setup
- [x] Auth Pages (Sign up/Sign in structure)
- [x] Post Feed Component
- [x] Post Creation Interface
- [x] User Profile Pages
- [x] Context API & State Management Setup
- [x] API Service Integration
- [ ] Complete API Connectivity
- [ ] Image Upload UI
- [ ] Follow System UI
- [ ] Responsive Design Refinement
- [ ] Real-time Updates
- [ ] Error Handling

---

## 👥 Team & Contribution

This is an active development project. 

**Current Work**: Frontend development is ongoing. Backend APIs are stable and ready for integration.

---

## 📄 License

ISC

---

## 📞 Support & Documentation

For detailed backend API documentation and technical specifications, refer to the [Backend/README.md](Backend/README.md) file.

**Last Updated**: June 8, 2026
