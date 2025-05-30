# 🚀 Full-Stack Template

<div align="center">
  
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

*Production-ready full-stack template with clean architecture, complete authentication, OAuth integration, and role-based access control*

</div>

## ✨ Features

- 🔐 **Multi-Auth System** - Email/Password, OAuth (Google, GitHub, LinkedIn), Admin authentication
- 👥 **Role-Based Access Control** - User and Admin roles with protected endpoints
- 🔥 **Firebase OAuth** - Seamless social login integration with token validation
- 🏗️ **Clean Architecture** - Domain-driven design with dependency injection
- 🛡️ **Security First** - JWT tokens, HTTP-only cookies, rate limiting, bcrypt
- 🎨 **Modern UI** - Shadcn UI, Tailwind CSS, dark/light themes, responsive
- ⚡ **Developer Experience** - TypeScript, hot reload, testing ready
- 📧 **Email Integration** - OTP verification and password reset via Nodemailer

## 🔐 Authentication Flows

### User Authentication (Email/Password + OTP)

```mermaid
graph TB
    A[👤 Sign Up] --> B[📧 Email, Password, Name]
    B --> C[✅ Create Account]
    C --> D[🔑 Sign In Page]
    
    D --> E[🔐 Enter Credentials]
    E --> F{Valid?}
    F -->|❌| G[Error Message]
    G --> E
    F -->|✅| H[🔢 Generate OTP]
    H --> I[📧 Send Email]
    I --> J[🔢 OTP Page]
    
    J --> K[Enter OTP Code]
    K --> L{Valid & Fresh?}
    L -->|❌| M[Try Again]
    M --> K
    L -->|✅| N[🎯 Generate JWT]
    N --> O[🍪 Set Cookies]
    O --> P[✨ Authenticated User]
    
    P --> Q[🛡️ User Routes]
    Q --> R[👤 Profile Access]
    
    style A fill:#dbeafe,stroke:#3b82f6,stroke-width:2px,color:#000000
    style P fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#000000
    style N fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
```

### OAuth Authentication (Firebase)

```mermaid
graph TB
    A[🔑 Sign In/Up Page] --> B[🔥 OAuth Buttons]
    B --> C[Google | GitHub | LinkedIn]
    C --> D[🔥 Firebase Popup]
    D --> E[👤 Select Provider]
    E --> F[🔐 Provider Auth]
    F --> G{Auth Success?}
    G -->|❌| H[Error Handle]
    H --> A
    G -->|✅| I[🎯 Get Firebase Token]
    I --> J[📧 Extract User Info]
    J --> K[🔗 API Call to Backend]
    K --> L[🔍 Validate Firebase Token]
    L --> M{Token Valid?}
    M -->|❌| N[Auth Failed]
    N --> A
    M -->|✅| O{User Exists?}
    O -->|❌| P[👤 Create User]
    O -->|✅| Q[📝 Update User]
    P --> R[🎯 Generate JWT]
    Q --> R
    R --> S[🍪 Set Cookies]
    S --> T[✨ Authenticated User]
    
    style A fill:#dbeafe,stroke:#3b82f6,stroke-width:2px,color:#000000
    style T fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#000000
    style I fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
    style D fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#000000
```

### Admin Authentication

```mermaid
graph TB
    A[🔒 Admin Login] --> B[📧 Email & Password]
    B --> C[🔍 Validate Credentials]
    C --> D{Match .env?}
    D -->|❌| E[❌ Access Denied]
    E --> A
    D -->|✅| F[🎯 Generate Admin JWT]
    F --> G[🏷️ Set Admin Role]
    G --> H[🍪 Set Cookies]
    H --> I[✨ Authenticated Admin]
    I --> J[🛡️ Admin Routes]
    J --> K[👥 User Management]
    J --> L[📊 Analytics]
    J --> M[⚙️ System Config]
    
    style A fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
    style I fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#000000
    style F fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#000000
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, Radix UI |
| **Backend** | Express.js 5, Node.js, JWT Authentication |
| **Database** | MongoDB with Mongoose ODM |
| **Language** | TypeScript (Full Stack) |
| **OAuth** | Firebase Authentication |
| **State** | Zustand + React Query |
| **Email** | Nodemailer |
| **Security** | bcrypt, CORS, Rate Limiting, Role-based Access |

## 🚀 Quick Start

### Prerequisites
- Node.js v22+
- pnpm v10.6.4+
- MongoDB (local or Atlas)
- Firebase project with Authentication enabled

### Installation

```bash
# Clone repository
git clone git@github.com:sinanptm/fullstack-clean-auth-template.git
cd full-stack-template

# Install dependencies
pnpm install
```

### Environment Setup

**Server** (`.env` in `server/` directory):
```env
# Database
MONGODB_URI=mongodb://localhost:27017/your-database

# JWT Secrets
ACCESS_TOKEN_SECRET=your-secure-access-token-secret
REFRESH_TOKEN_SECRET=your-secure-refresh-token-secret

# Email Configuration
NODEMAILER_PASSKEY=your-email-app-password
SENDER_EMAIL=your-email@gmail.com

# Server Configuration
PORT=8000
CLIENT_URL=http://localhost:3000

# Admin Credentials
ADMIN_MAIL=admin@gmail.com
ADMIN_PASSWORD=your-secure-admin-password

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
```

**Client** (`.env.local` in `web/` directory):
```env
# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:8000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project
   - Enable Authentication

2. **Configure OAuth Providers**
   ```bash
   # Enable in Firebase Console > Authentication > Sign-in method:
   - Google ✅
   - GitHub ✅  
   - LinkedIn ✅ (if available)
   ```

3. **Generate Service Account**
   - Go to Project Settings > Service Accounts
   - Generate private key (JSON)
   - Extract credentials for server `.env`

4. **Configure Authorized Domains**
   ```
   localhost (for development)
   your-production-domain.com
   ```

### Start Development

```bash
# Start both frontend and backend
pnpm dev

# Or individually
pnpm --prefix server dev    # Backend: http://localhost:8000
pnpm --prefix web dev       # Frontend: http://localhost:3000
```

## 📁 Project Structure

```
full-stack-template/
├── 📁 server/                 # Backend (Clean Architecture)
│   ├── 📁 src/
│   │   ├── 📁 domain/         # Business entities & interfaces
│   │   │   ├── 📁 entities/   # User, Admin entities
│   │   │   └── 📁 enums/      # UserRole enum
│   │   ├── 📁 use_case/       # Application logic
│   │   │   ├── 📁 auth/       # Authentication use cases
│   │   │   ├── 📁 admin/      # Admin-specific use cases
│   │   │   └── 📁 oauth/      # OAuth use cases
│   │   ├── 📁 infrastructure/ # Database & external services
│   │   │   ├── 📁 database/   # MongoDB repositories
│   │   │   ├── 📁 firebase/   # Firebase admin SDK
│   │   │   └── 📁 middleware/ # Auth & RBAC middleware
│   │   ├── 📁 presentation/   # Controllers & routes
│   │   │   ├── 📁 routes/     # API routes
│   │   │   ├── 📁 controllers/# Request handlers
│   │   │   └── 📁 middleware/ # Route-specific middleware
│   │   └── 📁 di/             # Dependency injection
│   └── 📁 __tests__/          # Test files
├── 📁 web/                    # Frontend (Next.js)
│   ├── 📁 app/                # App router
│   │   ├── 📁 (auth)/         # Auth pages
│   │   ├── 📁 (user)/         # User dashboard
│   │   └── 📁 (admin)/        # Admin dashboard
│   ├── 📁 components/         # React components
│   │   ├── 📁 ui/             # Base UI components
│   │   ├── 📁 auth/           # Auth-specific components
│   │   └── 📁 oauth/          # OAuth buttons & handlers
│   ├── 📁 hooks/              # Custom hooks
│   ├── 📁 lib/                # Utilities
│   │   ├── 📁 firebase/       # Firebase client config
│   │   └── 📁 auth/           # Auth utilities
│   └── 📁 types/              # TypeScript definitions
└── 📄 package.json            # Root configuration
```

## 🔐 API Endpoints

### 🔓 Public Routes
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - Login (sends OTP)
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/oauth` - OAuth authentication
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset with OTP

### 🛡️ User Protected Routes
- `GET /api/user/profile` - User profile data
- `PUT /api/user/profile` - Update user profile
- `POST /api/auth/refresh` - Token refresh (automatic)

### 👑 Admin Protected Routes
- `POST /api/admin/signin` - Admin login
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get specific user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/analytics` - System analytics
- `POST /api/admin/refresh` - Admin token refresh

## 👥 Role-Based Access Control

### User Roles
```typescript
enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}
```

### Middleware Implementation
```typescript
// User routes protection
app.use('/api/user/*', authenticateUser);

// Admin routes protection  
app.use('/api/admin/*', authenticateAdmin);

// Role-based middleware
const authenticateAdmin = (req, res, next) => {
  // Validate JWT token
  // Check if role === 'admin'
  // Grant/deny access
};
```

### Access Control Matrix

| Route Type | User Role | Admin Role | Public |
|------------|-----------|------------|--------|
| `/api/auth/*` | ✅ | ✅ | ✅ |
| `/api/user/*` | ✅ | ❌ | ❌ |
| `/api/admin/*` | ❌ | ✅ | ❌ |

## 🔥 Firebase OAuth Implementation

### Frontend Integration

```typescript
// OAuth button component
const OAuthButtons = () => {
  const handleGoogleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    
    // Send to backend
    await fetch('/api/auth/oauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        provider: 'google',
        userInfo: {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL
        }
      })
    });
  };
};
```

### Backend Validation

```typescript
// OAuth use case
class OAuthUseCase {
  async authenticateWithFirebase(token: string, userInfo: any) {
    // Validate Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Check if user exists
    let user = await this.userRepository.findByEmail(userInfo.email);
    
    if (!user) {
      // Create new user
      user = await this.userRepository.create({
        email: userInfo.email,
        name: userInfo.name,
        profilePicture: userInfo.photoURL,
        role: UserRole.USER,
        isEmailVerified: true, // OAuth emails are pre-verified
        authProvider: 'oauth'
      });
    }
    
    // Generate JWT tokens
    const { accessToken, refreshToken } = this.jwtService.generateTokens(user);
    
    return { user, accessToken, refreshToken };
  }
}
```

## 🏗️ Architecture Highlights

### Clean Architecture Layers
1. **Domain** - Core business logic and entities (User, Admin roles)
2. **Use Cases** - Application-specific operations (Auth, OAuth, Admin)
3. **Infrastructure** - Database, Firebase, and external integrations
4. **Presentation** - API controllers and routes with RBAC
5. **DI Container** - Dependency injection with Inversify

### Security Features
- JWT with automatic refresh tokens
- Role-based access control (RBAC)
- Firebase token validation
- HTTP-only cookies prevent XSS
- bcrypt password hashing for admin
- Rate limiting and CORS protection
- Input validation with Joi schemas

### OAuth Security Flow
1. **Client-side**: Firebase handles OAuth popup
2. **Token Exchange**: Client receives Firebase ID token
3. **Backend Validation**: Server validates token with Firebase Admin SDK
4. **User Management**: Create/update user in database
5. **JWT Generation**: Issue application-specific tokens
6. **Session Management**: Same JWT flow as email/password auth

## 🧪 Development

```bash
# Testing
pnpm --prefix server test

# Production build
pnpm --prefix server build
pnpm --prefix web build

# Production start
pnpm --prefix server start
pnpm --prefix web start
```

## 📚 Key Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development servers |
| `pnpm format` | Format code with Prettier |
| `pnpm --prefix server test` | Run backend tests |
| `pnpm --prefix web lint` | Lint frontend code |

## 🎨 Customization

### Adding New OAuth Providers
1. Enable provider in Firebase Console
2. Add provider configuration to frontend
3. Update OAuth use case to handle new provider
4. Test authentication flow

### Extending Admin Features
```typescript
// Add new admin routes
router.get('/api/admin/reports', authenticateAdmin, getReports);
router.post('/api/admin/broadcast', authenticateAdmin, sendBroadcast);
```

### Custom User Roles
```typescript
enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}
```

## 🔒 Security Best Practices

### Environment Variables
- Never commit `.env` files
- Use different secrets for each environment
- Rotate tokens regularly
- Use strong admin passwords

### Firebase Security
- Enable App Check in production
- Configure security rules
- Monitor authentication usage
- Set up billing alerts

### JWT Security
- Short-lived access tokens (15 minutes)
- Longer refresh tokens (7 days)
- HTTP-only cookies for refresh tokens
- Token rotation on refresh

## 🚀 Deployment

### Environment-Specific Configurations

**Development**
```env
CLIENT_URL=http://localhost:3000
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
```

**Production**
```env
CLIENT_URL=https://your-domain.com
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
```

### Deployment Checklist
- [ ] Firebase project configured for production domain
- [ ] Environment variables set in hosting platform
- [ ] MongoDB connection string updated
- [ ] Admin credentials secured
- [ ] CORS origins configured
- [ ] Rate limiting configured for production traffic

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Implement changes following clean architecture
4. Add tests for new functionality
5. Update documentation
6. Commit changes (`git commit -m 'Add feature'`)
7. Push branch (`git push origin feature/name`)
8. Open Pull Request

## 📖 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Clean Architecture Guide](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [RBAC Implementation Patterns](https://en.wikipedia.org/wiki/Role-based_access_control)

---

<div align="center">
  Made with ❤️ for developers • Full-stack template with OAuth, RBAC, and Admin panel ready for production
</div>
