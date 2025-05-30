# 🚀 Full-Stack Authentication Template

<div align="center">
  
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

*Production-ready full-stack template with clean architecture and complete authentication system*

</div>

## ✨ Key Features

- **Complete Authentication System** - Email/Password with OTP verification, OAuth (Google, GitHub), and Admin authentication
- **Role-Based Access Control** - Secure user and admin roles with protected routes
- **Clean Architecture** - Domain-driven design with dependency injection and separation of concerns
- **Modern Tech Stack** - Next.js 15, Express.js 5, MongoDB, TypeScript, Firebase OAuth
- **Security-First Design** - JWT tokens, HTTP-only cookies, rate limiting, bcrypt hashing
- **Developer Experience** - Hot reload, TypeScript support, comprehensive testing setup

# 🔐 Complete Authentication System Flow

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
    
    %% Styling with Black Text
    style A fill:#dbeafe,stroke:#3b82f6,stroke-width:3px,color:#000000
    style BB fill:#dcfce7,stroke:#22c55e,stroke-width:3px,color:#000000
    style RR fill:#fef3c7,stroke:#f59e0b,stroke-width:3px,color:#000000
    style L fill:#e0e7ff,stroke:#6366f1,stroke-width:2px,color:#000000
    style M fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#000000
    style CC fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#000000
    style SS fill:#fef7ff,stroke:#a855f7,stroke-width:2px,color:#000000
    
    %% Error States with Black Text
    style E fill:#fecaca,stroke:#dc2626,stroke-width:1px,color:#000000
    style Q fill:#fecaca,stroke:#dc2626,stroke-width:1px,color:#000000
    style W fill:#fecaca,stroke:#dc2626,stroke-width:1px,color:#000000
    style NN fill:#fecaca,stroke:#dc2626,stroke-width:1px,color:#000000
    
    %% Additional Key Nodes with Black Text
    style B fill:#f3f4f6,stroke:#6b7280,stroke-width:2px,color:#000000
    style D fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
    style J fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
    style P fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
    style V fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
    style X fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
    style MM fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000000
    style AA fill:#e0f2fe,stroke:#0ea5e9,stroke-width:2px,color:#000000
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, Shadcn UI |
| **Backend** | Express.js 5, Node.js, TypeScript |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT, Firebase OAuth, Nodemailer |
| **State Management** | Zustand + React Query |
| **Security** | bcrypt, CORS, Rate Limiting, RBAC |

## 🚀 Quick Start

### Prerequisites
- Node.js v22+
- pnpm v10.6.4+
- MongoDB (local or Atlas)
- Firebase project with Authentication enabled

### Installation

```bash
git clone git@github.com:sinanptm/fullstack-clean-auth-template.git
cd full-stack-template
pnpm install
```

### Environment Setup

**Server** (`.env` in `server/` directory):
```env
# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# Server Configuration
PORT=8000
NODE_ENV=development

# JWT Secrets
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret

# Email Configuration
SENDER_EMAIL=your-email@example.com
NODEMAILER_PASSKEY=your-email-app-password

# Company Info
COMPANY_NAME=Your Company
COMPANY_DOMAIN=yourcompany.com

# Admin Credentials
ADMIN_MAIL=admin@example.com
ADMIN_PASSWORD=your-secure-admin-password

# Firebase (Server-side)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@example.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your-private-key>\n-----END PRIVATE KEY-----\n"
```

**Client** (`.env.local` in `web/` directory):
```env
# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:8000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
```

### Start Development

```bash
# Start both frontend and backend
pnpm dev

# Or start individually
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

## 🔐 API Routes

### Authentication Routes
```
POST /api/auth/signup         - User registration
POST /api/auth/signin         - Login with OTP
POST /api/auth/verify-otp     - OTP verification
POST /api/auth/oauth-2        - OAuth authentication
POST /api/auth/forgot-password - Password reset
POST /api/auth/reset-password  - Reset with OTP
```

### Protected Routes
```
# User Routes
GET  /api/user/profile        - User profile
POST /api/auth/refresh        - Token refresh

# Admin Routes  
POST /api/admin/signin        - Admin login
GET  /api/admin/users         - All users
GET  /api/admin/users/:id     - Specific user
PUT  /api/admin/users/:id     - Update user
DELETE /api/admin/users/:id   - Delete user
GET  /api/admin/analytics     - System analytics
```

## 🔧 Development Commands

```bash
# Development
pnpm dev                      # Start both servers
pnpm --prefix server dev      # Backend only
pnpm --prefix web dev         # Frontend only

# Testing & Quality
pnpm --prefix server test     # Run backend tests
pnpm --prefix web lint        # Lint frontend
pnpm format                   # Format code

# Production
pnpm --prefix server build    # Build backend
pnpm --prefix web build       # Build frontend
pnpm --prefix server start    # Start production server
```

## 🔒 Security Features

- **JWT Authentication** with automatic token refresh
- **Role-Based Access Control** (User/Admin roles)
- **Firebase OAuth Integration** with server-side token validation
- **HTTP-Only Cookies** prevent XSS attacks
- **Password Hashing** with bcrypt
- **Rate Limiting** and CORS protection
- **Input Validation** with comprehensive schemas

## 🚀 Deployment

### Firebase Setup
1. Create Firebase project
2. Enable Authentication providers (Google, GitHub)
3. Generate service account key
4. Configure authorized domains

### Production Checklist
- [ ] Environment variables configured
- [ ] MongoDB Atlas connection
- [ ] Firebase production settings
- [ ] Admin credentials secured
- [ ] CORS origins updated
- [ ] Rate limiting configured

---

<div align="center">
  Production-ready full-stack template • Built with modern technologies and best practices
</div>
