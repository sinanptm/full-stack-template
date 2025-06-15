# Full-Stack Authentication Template

> A production-ready authentication system built with clean architecture principles and modern technologies

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-22+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## Overview

This is a comprehensive full-stack authentication template designed with clean architecture principles. It provides a solid foundation for building scalable web applications with robust user authentication and authorization systems.

### Live Demo
🌐 **Documentation**: [https://full-stack-clean-auth-template.vercel.app/](https://full-stack-clean-auth-template.vercel.app/)

### Preview
![Application Preview](https://github.com/user-attachments/assets/cbbfc5f3-c470-4426-a823-aaf796607203)

## Key Features

### 🏗️ Architecture & Design
- **Clean Architecture** - Domain-driven design with clear separation of concerns
- **Modular Structure** - Easy to extend and maintain
- **Framework Independence** - Core business logic is decoupled from frameworks
- **TypeScript First** - Full type safety across the entire stack

### 🔐 Authentication & Security
- **Multi-factor Authentication** - Email/Password with OTP verification
- **OAuth Integration** - Google and GitHub social login
- **Role-based Access Control** - User and admin roles with protected routes
- **JWT Token Management** - Secure access and refresh token implementation
- **Security Best Practices** - Rate limiting, CORS, bcrypt hashing

### ⚡ Modern Technology Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS, Shadcn UI
- **Backend**: Express.js 5, Node.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **State Management**: Zustand + React Query
- **Authentication**: Firebase OAuth, JWT, Nodemailer

### 🚀 Production Ready
- **Scalable Architecture** - Built for enterprise-level applications
- **Comprehensive Testing** - Unit and integration tests included
- **Development Tools** - ESLint, Prettier, Hot reload
- **Deployment Ready** - Production-optimized builds
- **CI/CD Pipeline** - Automated testing, building, and quality checks

## Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI |
| **Backend** | Express.js 5, Node.js, TypeScript |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT, Firebase Auth, Nodemailer |
| **State Management** | Zustand, React Query |
| **Development** | ESLint, Prettier, Jest |
| **Security** | bcrypt, CORS, Rate Limiting, Joi Validation |
| **CI/CD** | GitHub Actions, Automated Testing, Code Quality Checks |

## Architecture

### Clean Architecture Benefits
- **Separation of Concerns**: Each layer has a single responsibility
- **Dependency Inversion**: Abstractions don't depend on concrete implementations  
- **Testability**: Business logic is framework-independent
- **Maintainability**: Easy to modify and extend features

### Authentication Flow
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
    B -->|"🔥 OAuth (Google/GitHub)"| M["🔥 Firebase OAuth Popup"]
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

## CI/CD Pipeline

### 🔄 Automated Workflows
- **Continuous Integration** - Automated testing and building on every push
- **Quality Assurance** - Code formatting, linting, and type checking
- **Security Auditing** - Weekly dependency vulnerability scans
- **Dependency Management** - Automated dependency updates with PR creation

### GitHub Actions Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI/CD Pipeline** | Push to `main`/`develop`, PRs | Build, test, and quality checks |
| **Security Audit** | Weekly schedule, Push/PR | Vulnerability scanning |
| **Update Dependencies** | Weekly schedule, Manual | Automated dependency updates |

#### Pipeline Features
- **Parallel Execution** - Server and web builds run simultaneously
- **Caching Strategy** - Optimized build times with dependency caching
- **Artifact Management** - Build artifacts stored for deployment
- **Multi-stage Validation** - Tests, linting, and type checking

## Getting Started

### Prerequisites
- Node.js v22 or higher
- pnpm v10.8.1 or higher
- MongoDB (local installation or MongoDB Atlas)
- Firebase project with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:sinanptm/fullstack-clean-auth-template.git
   cd fullstack-clean-auth-template
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**

   Create `.env` file in the `server/` directory:
   ```env
   # Database
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   
   # Server Configuration
   PORT=8000
   NODE_ENV=development
   
   # JWT Secrets
   ACCESS_TOKEN_SECRET=your-super-secure-access-token-secret
   REFRESH_TOKEN_SECRET=your-super-secure-refresh-token-secret
   
   # Email Configuration (for OTP)
   SENDER_EMAIL=your-email@example.com
   NODEMAILER_PASSKEY=your-email-app-password
   
   # Company Information
   COMPANY_NAME=Your Company Name
   COMPANY_DOMAIN=yourcompany.com
   
   # Admin Credentials
   ADMIN_MAIL=admin@yourcompany.com
   ADMIN_PASSWORD=your-secure-admin-password
   
   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
   ```

   Create `.env.local` file in the `web/` directory:
   ```env
   # API Configuration
   NEXT_PUBLIC_SERVER_URL=http://localhost:8000
   
   # Firebase Client Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
   ```

4. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   pnpm dev
   
   # Or start individually
   pnpm --prefix server dev    # Backend: http://localhost:8000
   pnpm --prefix web dev       # Frontend: http://localhost:3000
   ```

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/auth/signup` | User registration | `{ email, password, name }` |
| `POST` | `/api/auth/signin` | Email/password login | `{ email, password }` |
| `POST` | `/api/auth/verify-otp` | Verify OTP code | `{ email, otp }` |
| `POST` | `/api/auth/oauth-2` | OAuth authentication | `{ firebaseToken }` |
| `POST` | `/api/auth/forgot-password` | Request password reset | `{ email }` |
| `POST` | `/api/auth/reset-password` | Reset password with OTP | `{ email, otp, newPassword }` |
| `POST` | `/api/auth/refresh` | Refresh access token | `{ refreshToken }` |
| `POST` | `/api/auth/logout` | User logout | - |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/user/profile` | Get user profile | ✅ User |
| `PUT` | `/api/user/profile` | Update user profile | ✅ User |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/admin/signin` | Admin login | - |
| `GET` | `/api/admin/users` | List all users | ✅ Admin |
| `GET` | `/api/admin/users/:id` | Get specific user | ✅ Admin |
| `PUT` | `/api/admin/users/:id` | Update user | ✅ Admin |
| `DELETE` | `/api/admin/users/:id` | Delete user | ✅ Admin |
| `GET` | `/api/admin/analytics` | System analytics | ✅ Admin |

## Security Features

### 🔐 Authentication Security
- **JWT Tokens**: Secure access and refresh token implementation
- **HTTP-Only Cookies**: Protection against XSS attacks
- **Password Hashing**: bcrypt with 10 salt rounds
- **OTP Verification**: Time-limited one-time passwords

### 🛡️ Authorization & Access Control
- **Role-Based Access Control (RBAC)**: User and admin roles
- **Protected Routes**: Middleware-based route protection
- **Token Validation**: Server-side Firebase token verification

### 🚫 Attack Prevention
- **Rate Limiting**: Request throttling to prevent abuse
- **CORS Configuration**: Cross-origin request security
- **Input Validation**: Comprehensive Joi schema validation
- **SQL Injection Prevention**: Parameterized database queries

### 🔍 Monitoring & Logging
- **Request Logging**: Detailed API request logging
- **Error Tracking**: Comprehensive error handling
- **Security Headers**: Helmet.js security headers

## Development

### Available Scripts

#### Root Level
```bash
pnpm dev          # Start both frontend and backend
pnpm format       # Format code using Prettier
pnpm lint         # Lint entire project
```

#### Backend (`server/`)
```bash
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production
pnpm start        # Start production server
pnpm test         # Run test suite
```

#### Frontend (`web/`)
```bash
pnpm dev          # Start Next.js development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Lint frontend code
```

## Deployment

### Production Checklist

- [ ] Environment variables configured for production
- [ ] MongoDB Atlas connection established
- [ ] Firebase production project configured
- [ ] Admin credentials secured
- [ ] CORS origins updated for production domains
- [ ] Rate limiting configured appropriately
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Monitoring and logging setup
- [ ] Backup strategy implemented

### Deployment Options

#### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** the existing code style and architecture patterns
4. **Add** tests for new functionality
5. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
6. **Push** to the branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### Development Guidelines

- Follow the clean architecture principles
- Write comprehensive tests for new features
- Update documentation for API changes
- Use TypeScript for type safety
- Follow the existing code formatting standards

### Reporting Issues

If you find a bug or have a feature request, please open an issue with:
- Clear description of the problem
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- System information (OS, Node.js version, etc.)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Commercial Use**: Use this code in commercial projects
- ✅ **Modification**: Modify the code as needed
- ✅ **Distribution**: Share and distribute the code
- ✅ **Private Use**: Use for private projects
- ❗ **License Notice**: Keep the original license notice

---

## Support

- 📚 **Documentation**: [Full Documentation](https://full-stack-clean-auth-template.vercel.app/)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/sinanptm/fullstack-clean-auth-template/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/sinanptm/fullstack-clean-auth-template/discussions)

---

<div align="center">

**⭐ If this project helped you, please consider giving it a star!**

[![GitHub stars](https://img.shields.io/github/stars/sinanptm/fullstack-clean-auth-template?style=social)](https://github.com/sinanptm/fullstack-clean-auth-template)

*Built with ❤️ by the open source community*

</div>

</div>