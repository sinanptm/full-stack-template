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

# 🔐 Complete Authentication System Flow

## Combined User Authentication (Email/Password + OAuth)

```mermaid
graph TB
    %% Entry Point
    A["🔑 Sign In/Up Page"] --> B{"Authentication Method"}
    
    %% Email/Password Flow
    B -->|"📧 Email/Password"| C["📝 Enter Credentials"]
    C --> D{"Valid Credentials?"}
    D -->|"❌"| E["❌ Error Message"]
    E --> C
    D -->|"✅"| F["🔢 Generate OTP"]
    F --> G["📧 Send OTP Email"]
    G --> H["🔢 OTP Verification Page"]
    H --> I["Enter OTP Code"]
    I --> J{"Valid & Fresh OTP?"}
    J -->|"❌"| K["Try Again"]
    K --> I
    J -->|"✅"| L["🎯 Generate JWT"]
    
    %% OAuth Flow
    B -->|"🔥 OAuth (Google/GitHub/LinkedIn)"| M["🔥 Firebase OAuth Popup"]
    M --> N["👤 Select Provider"]
    N --> O["🔐 Provider Authentication"]
    O --> P{"Auth Success?"}
    P -->|"❌"| Q["❌ OAuth Error"]
    Q --> A
    P -->|"✅"| R["🎯 Get Firebase Token"]
    R --> S["📧 Extract User Info"]
    S --> T["🔗 Send Token to Backend"]
    T --> U["🔍 Validate Firebase Token"]
    U --> V{"Token Valid?"}
    V -->|"❌"| W["❌ Token Invalid"]
    W --> A
    V -->|"✅"| X{"User Exists?"}
    X -->|"❌"| Y["👤 Create New User"]
    X -->|"✅"| Z["📝 Update User Info"]
    Y --> L
    Z --> L
    
    %% Common Final Steps
    L --> AA["🍪 Set HTTP-Only Cookies"]
    AA --> BB["✨ Authenticated User"]
    BB --> CC["🛡️ User Dashboard Access"]
    
    %% Additional Flows
    DD["🔄 Token Expiry"] --> EE["🔄 Auto Refresh"]
    EE --> BB
    
    FF["🔒 Forgot Password"] --> GG["📧 Reset Email with OTP"]
    GG --> HH["🔢 OTP Verification"]
    HH --> II["🔑 New Password"]
    II --> A
    
    %% Admin Flow (Separate)
    JJ["🔒 Admin Login"] --> KK["📧 Admin Credentials"]
    KK --> LL["🔍 Validate with .env"]
    LL --> MM{"Match Admin Config?"}
    MM -->|"❌"| NN["❌ Access Denied"]
    NN --> JJ
    MM -->|"✅"| OO["🎯 Generate Admin JWT"]
    OO --> PP["🏷️ Set Admin Role"]
    PP --> QQ["🍪 Set Admin Cookies"]
    QQ --> RR["✨ Authenticated Admin"]
    RR --> SS["👑 Admin Panel Access"]
    
    %% Styling
    style A fill:#dbeafe,stroke:#3b82f6,stroke-width:3px
    style BB fill:#dcfce7,stroke:#22c55e,stroke-width:3px
    style RR fill:#fef3c7,stroke:#f59e0b,stroke-width:3px
    style L fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style M fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style CC fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style SS fill:#fef7ff,stroke:#a855f7,stroke-width:2px
    
    %% Error States
    style E fill:#fecaca,stroke:#dc2626,stroke-width:1px
    style Q fill:#fecaca,stroke:#dc2626,stroke-width:1px
    style W fill:#fecaca,stroke:#dc2626,stroke-width:1px
    style NN fill:#fecaca,stroke:#dc2626,stroke-width:1px
```

### Admin Authentication

```mermaid
graph TB
    A["🔒 Admin Login"] --> B["📧 Email & Password"]
    B --> C["🔍 Validate Credentials"]
    C --> D{"Match .env?"}
    D -->|"❌"| E["❌ Access Denied"]
    E --> A
    D -->|"✅"| F["🎯 Generate Admin JWT"]
    F --> G["🏷️ Set Admin Role"]
    G --> H["🍪 Set Cookies"]
    H --> I["✨ Authenticated Admin"]
    I --> J["🛡️ Admin Routes"]
    J --> K["👥 User Management"]
    J --> L["📊 Analytics Dashboard"]
    J --> M["⚙️ System Configuration"]
    
    N["🔄 Admin Token Expiry"] --> O["Admin Auto Refresh"]
    O --> I
    
    style A fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style I fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style F fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style J fill:#f3e8ff,stroke:#8b5cf6,stroke-width:2px
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
MONGO_URI=mongodb+srv://mur0

# Server Configuration
PORT=8000
NODE_ENV=development

# JWT Secrets
ACCESS_TOKEN_SECRET=your-secure-access-token-secret-1234567890
REFRESH_TOKEN_SECRET=your-secure-refresh-token-secret-0987654321

# Nodemailer Email Configuration
NODEMAILER_PASSKEY=jdd
SENDER_EMAIL=felistob@gmail.com

# Company Information
COMPANY_NAME=Expense Tracker
COMPANY_DOMAIN=ex-tracker.dev.com

# Admin Credentials
ADMIN_MAIL=admin@gmail.com
ADMIN_PASSWORD=fjfjfj

# Firebase Configuration (Server-side)
FIREBASE_PROJECT_ID=full-stack-
FIREBASE_CLIENT_EMAIL=firebase@full-stack-.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----\n"
```

**Client** (`.env.local` in `web/` directory):
```env
# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:8000

# Firebase Configuration (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDrf-
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=full-stackm
NEXT_PUBLIC_FIREBASE_PROJECT_ID=full-stack-
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=full-stack-
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=7
NEXT_PUBLIC_FIREBASE_APP_ID=1:7984738348
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
├── 📁 server/                       # Backend (Clean Architecture)
│   ├── 📁 src/
│   │   ├── 📁 domain/               # Enterprise business logic
│   │   │   ├── 📁 entities/         # Core domain models 
│   │   │   └── 📁 interfaces/       # Abstractions for services and repositories
│   │   │       ├── 📁 services/     # Service interfaces
│   │   │       └── 📁 repositories/ # Repository interfaces 
│   │   ├── 📁 use_case/             # Application-specific business rules
│   │   │   ├── 📁 auth/             # Auth-related use cases
│   │   │   ├── 📁 admin/            # Admin operations
│   │   │   └── 📁 oauth/            # OAuth login/registration flows
│   │   ├── 📁 infrastructure/       # Implementation details
│   │   │   ├── 📁 database/         # MongoDB implementations of repositories
│   │   │   ├── 📁 firebase/         # Firebase SDK integrations
│   │   │   └── 📁 middleware/       # General backend middleware 
│   │   ├── 📁 presentation/         # Framework adapters (input/output handlers)
│   │   │   ├── 📁 routes/           # Express/Router API definitions
│   │   │   ├── 📁 controllers/      # Request handlers / controllers
│   │   │   └── 📁 middleware/       # Middleware for route-level logic
│   │   └── 📁 di/                   # Dependency injection container setup
│   └── 📁 __tests__/                # Unit and integration tests
├── 📁 web/                          # Frontend (Next.js)
│   ├── 📁 app/                      # App router structure 
│   │   ├── 📁 (auth)/               # Auth-related pages (login, signup)
│   │   ├── 📁 (user)/               # User dashboard and features
│   │   └── 📁 (admin)/              # Admin dashboard and tools
│   ├── 📁 components/               # Reusable React components
│   │   ├── 📁 ui/                   # Low-level UI components 
│   │   ├── 📁 forms/                # Composable form elements
│   ├── 📁 hooks/                    # Custom React hooks
│   ├── 📁 lib/                      # Utility functions and helpers
│   ├── 📁 public/                   # Static assets 
│   ├── 📁 constants/                # Constant values and enums
│   ├── 📁 styles/                   # Tailwind and global CSS files
│   └── 📁 types/                    # Global TypeScript types and interfaces
└── 📄 package.json                  # Root configuration and dependencies
```

## 🔐 API Endpoints

### 🔓 Public Routes
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - Login (sends OTP)
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/oauth-2` - OAuth authentication
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset with OTP

### 🛡️ User Protected Routes
- `GET /api/user/profile` - User profile data
- `POST /api/auth/refresh` - Token refresh (automatic)

### 👑 Admin Protected Routes
- `POST /api/admin/signin` - Admin login
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get specific user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/analytics` - System analytics
- `POST /api/admin/refresh` - Admin token refresh

### Role-Based Access Control Flow

```mermaid
graph TB
    A["🌐 Incoming Request"] --> B["🔍 Extract JWT Token"]
    B --> C{"Token Present?"}
    C -->|"❌"| D["❌ Unauthorized"]
    C -->|"✅"| E["🔐 Verify JWT Signature"]
    E --> F{"Valid Signature?"}
    F -->|"❌"| G["❌ Invalid Token"]
    F -->|"✅"| H["📋 Extract User Role"]
    H --> I{"Check Role"}
    
    I -->|"👤 USER"| J["🛡️ User Middleware"]
    I -->|"👑 ADMIN"| K["🛡️ Admin Middleware"]
    
    J --> L{"User Route?"}
    L -->|"✅"| M["✅ Access Granted"]
    L -->|"❌"| N["❌ Forbidden"]
    
    K --> O{"Admin Route?"}
    O -->|"✅"| P["✅ Admin Access"]
    O -->|"❌"| Q["❌ Forbidden"]
    
    M --> R["👤 User Dashboard"]
    P --> S["👑 Admin Panel"]
    
    style A fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style M fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style P fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style D fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style G fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style N fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style Q fill:#fee2e2,stroke:#ef4444,stroke-width:2px
```

### Access Control Matrix

| Route Type | User Role | Admin Role | Public |
|------------|-----------|------------|--------|
| `/api/auth/*` | ✅ | ✅ | ✅ |
| `/api/user/*` | ✅ | ❌ | ❌ |
| `/api/admin/*` | ❌ | ✅ | ❌ |

## 🔥 Firebase OAuth Implementation

### Backend Validation

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
4. Test authentication flow

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
