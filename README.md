# 🚀 Full-Stack Authentication Template

<div align="center">
  
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

*Production-ready full-stack template with clean architecture and complete authentication system*

**🎯 Built for Easy Customization & Rapid Development**
**📚 Documentation: https://full-stack-clean-auth-template.vercel.app/

</div>

## ✨ Key Features

- **🏗️ Clean Architecture Design** - Domain-driven structure makes adding/removing features effortless
- **🔧 Highly Customizable** - Modular components and services for easy adaptation to your needs
- **🔐 Complete Authentication System** - Email/Password with OTP verification, OAuth (Google, GitHub), and Admin authentication
- **🛡️ Role-Based Access Control** - Secure user and admin roles with protected routes
- **⚡ Modern Tech Stack** - Next.js 15, Express.js 5, MongoDB, TypeScript, Firebase OAuth
- **🔒 Security-First Design** - JWT tokens, HTTP-only cookies, rate limiting, bcrypt hashing
- **👨‍💻 Excellent Developer Experience** - Hot reload, TypeScript support, comprehensive testing setup

## 🎨 Why This Template is Perfect for Customization

### 🏛️ Clean Architecture Benefits
- **Separation of Concerns**: Each layer has a single responsibility, making changes isolated and predictable
- **Dependency Inversion**: Abstractions don't depend on details, making it easy to swap implementations
- **Testable Code**: Business logic is independent of frameworks, making unit testing straightforward
- **Framework Independence**: Core business logic isn't tied to Express.js or Next.js

### 🔄 Easy Feature Management
✅ Want to add a new user role? → Add entity + use case + controller
✅ Need different OAuth provider? → Implement new service following existing interface
✅ Switch from MongoDB to PostgreSQL? → Replace repository implementation
✅ Add email notifications? → Create new service and inject where needed
✅ Implement two-factor authentication? → Extend existing auth use cases
✅ Change UI library? → Components are decoupled from business logic

### 🎯 Modular Structure for Rapid Development
- **Frontend**: Component-based architecture with reusable UI elements
- **Backend**: Use case driven development with clear boundaries
- **Shared Types**: TypeScript interfaces ensure type safety across the stack
- **Plugin Architecture**: Easy to extend without modifying core functionality

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

## 🛠️ Tech Stack

| Layer | Technology | Why This Choice |
|-------|-----------|----------------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, Shadcn UI | Server-side rendering, component reusability, rapid styling |
| **Backend** | Express.js 5, Node.js, TypeScript | Lightweight, flexible, strongly typed |
| **Database** | MongoDB with Mongoose ODM | Schema flexibility, easy scaling |
| **Authentication** | JWT, Firebase OAuth, Nodemailer | Secure, scalable, multiple providers |
| **State Management** | Zustand + React Query | Simple, performant, server state sync |
| **Security** | bcrypt, CORS, Rate Limiting, RBAC | Industry-standard security practices |

## 🏗️ Clean Architecture Breakdown

### Backend Architecture Layers

```
🏛️ Domain Layer (Core Business Logic)
├── 📁 entities/          - Pure business objects (User, Admin, OTP)
└── 📁 interfaces/        - Contracts for external dependencies
    ├── services/         - External service contracts
    └── repositories/     - Data access contracts

⚙️ Use Case Layer (Application Logic)  
├── 📁 admin/            - Admin management operations
└── 📁 user/             - User useCases (Authentication, profile)

🔧 Infrastructure Layer (Implementation Details)
├── 📁 database/         - MongoDB implementations
├── 📁 firebase/         - Firebase service implementations
└── 📁 firebase/         - Firebase service implementations

🌐 Presentation Layer (External Interface)
├── 📁 routes/           - API route definitions  
├── 📁 controllers/      - Request/response handling
└── 📁 middleware/       - HTTP-specific middleware
```

### Frontend Architecture

```
🎨 Component Architecture
├── 📁 app/                      # App router structure 
│   ├── 📁 (user)/               # User dashboard and features
│   └── 📁 (admin)/              # Admin dashboard and tools
├── 📁 components/               # Reusable React components
│   ├── 📁 ui/                   # Low-level UI components 
│   ├── 📁 forms/                # Composable form elements
├── 📁 hooks/                    # Custom React hooks
├── 📁 lib/                      # Utility functions and helpers
├── 📁 public/                   # Static assets 
├── 📁 constants/                # Constant values and enums
├── 📁 styles/                   # Tailwind and global CSS files
└── 📁 types/                    # Global TypeScript types and interfaces
```

## 🚀 Quick Start

### Prerequisites
- Node.js v22+
- pnpm v10.8.1+
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

## 🔧 Customization Examples

### Adding a New Feature: User Profile Picture Upload

**1. Domain Layer** - Add to User entity:
```typescript
// server/src/domain/entities/User.ts
export interface User {
  // ... existing fields
  profilePicture?: string;
  profilePictureUploadedAt?: Date;
}
```

**2. Use Case Layer** - Create upload use case:
```typescript
// server/src/use_case/user/UploadProfilePicture.ts
export class UploadProfilePictureUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Repositories.FileStorageService) private readonly fileStorageService: IFileStorageService,
    private fileStorageService: IFileStorageService
  ) {}
  
  async exec(userId: string, file: Express.Multer.File) {
    // Business logic here
  }
}
```

**3. Infrastructure Layer** - Implement file storage:
```typescript
// server/src/infrastructure/services/CloudinaryService.ts
export class CloudinaryService implements IFileStorageService {
  // Implementation
}
```

**4. Presentation Layer** - Add API endpoint:
```typescript
// server/src/presentation/routes/userRoutes.ts
router.post('/profile-picture', uploadMiddleware, profilePictureController.upload.exec);
```

**5. Frontend** - Add upload component:
```typescript
// web/components/forms/ProfilePictureUpload.tsx
export const ProfilePictureUpload = () => {
  // Component logic
}
```

### Switching Authentication Provider

Replace Firebase with Auth0 by:
1. Implementing `IAuthService` interface with Auth0
2. Updating dependency injection container
3. Zero changes to use cases or controllers!

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

## 🧪 Development Commands

```bash
# Development
pnpm dev                      # Start both servers with hot reload
pnpm --prefix server dev      # Backend only
pnpm --prefix web dev         # Frontend only

# Testing & Quality
pnpm --prefix server test     # Run backend tests
pnpm --prefix web lint        # Lint frontend code
pnpm format                   # Format code with Prettier

# Production
pnpm --prefix server build    # Build backend
pnpm --prefix web build       # Build frontend for production
pnpm --prefix server start    # Start production server
```

## 🔒 Security Features

- **🔐 JWT Authentication** with automatic token refresh
- **🛡️ Role-Based Access Control** (User/Admin roles)
- **🔥 Firebase OAuth Integration** with server-side token validation
- **🍪 HTTP-Only Cookies** prevent XSS attacks
- **🔒 Password Hashing** with bcrypt (10 rounds)
- **⚡ Rate Limiting** and CORS protection
- **✅ Input Validation** with comprehensive Joi schemas
- **🚫 SQL Injection Prevention** with parameterized queries

### Firebase Setup
1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication providers (Google, GitHub)
3. Generate service account key
4. Configure authorized domains

### Production Checklist
- [ ] Environment variables configured
- [ ] MongoDB Atlas connection established
- [ ] Firebase production settings applied
- [ ] Admin credentials secured
- [ ] CORS origins updated for production
- [ ] Rate limiting configured appropriately
- [ ] SSL certificates installed
- [ ] Monitoring and logging setup

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing architecture patterns
4. Add tests for new functionality
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**🎯 Ready to build your next project?**

This template provides everything you need to start building production-ready applications with clean architecture that scales with your requirements.

*Built with modern technologies and best practices • Easy to customize • Production-ready*

</div>
