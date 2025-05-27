# 🚀 Full-Stack Template

<div align="center">
  
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

*A production-ready full-stack template with clean architecture, complete authentication system, and modern tech stack*

</div>

## ✨ Features

- 🏗️ **Clean Architecture** - Well-structured and maintainable codebase
- 🔐 **Complete Authentication System** - Signup → Signin → OTP → Authenticated session with automatic token refresh
- 🔑 **JWT Token Management** - Access and refresh tokens with HTTP-only cookies
- 📧 **Email-based OTP** - Secure verification via Nodemailer
- 🛡️ **Protected Routes** - Profile endpoint and authentication middleware
- 🎨 **Modern UI Components** - Built with Radix UI and Tailwind CSS
- 📱 **Responsive Design** - Mobile-first approach with dark/light theme support
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🔄 **Real-time Updates** - React Query for efficient data fetching
- ⚡ **Fast Development** - Hot reload with Turbopack
- 🧪 **Testing Ready** - Jest configuration included
- 📊 **Logging System** - Winston logger with daily rotation
- 🚦 **Rate Limiting** - Built-in API rate limiting
- 🔄 **State Management** - Zustand for client-side state

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.2 with React 19
- **Styling**: Tailwind CSS 4.0 with custom animations
- **UI Components**: Radix UI primitives
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Theme**: next-themes for dark/light mode

### Backend
- **Runtime**: Node.js with Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt for password hashing
- **Validation**: Joi for request validation
- **Email**: Nodemailer for email services
- **Logging**: Winston with daily file rotation
- **Security**: CORS, rate limiting, cookie parsing

### Development Tools
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Testing**: Jest
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Process Management**: Nodemon for development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22 or higher)
- [pnpm](https://pnpm.io/) (v10.6.4 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone git@github.com:sinanptm/full-stack-template.git
cd full-stack-template
```

### 2. Install Dependencies

```bash
# Install all dependencies for both frontend and backend
pnpm install
```

### 3. Environment Setup

#### Server Environment Variables
Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/your-database-name
# or for MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT
ACCESS_TOKEN_SECRET=your-secure-access-token-secret-1234567890
REFRESH_TOKEN_SECRET=your-secure-refresh-token-secret-0987654321

# Email Configuration (for OTP and password reset)
NODEMAILER_PASSKEY=ffff ffff ffff ffff
SENDER_EMAIL=yourmail@gmail.com

# Application
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### Client Environment Variables
Create a `.env.local` file in the `web` directory:

```env
NEXT_PUBLIC_SERVER_URL = http://localhost:8000
```

### 4. Start Development Servers

```bash
# Start both frontend and backend concurrently
pnpm dev

# Or start individually
pnpm --prefix server dev    # Backend on http://localhost:8000
pnpm --prefix web dev       # Frontend on http://localhost:3000
```

## 📁 Project Structure

```
full-stack-template/
├── 📁 server/                 # Backend application (Clean Architecture)
│   ├── 📁 src/
│   │   ├── 📁 config/         # Application configuration
│   │   ├── 📁 di/             # Dependency Injection container
│   │   ├── 📁 domain/         # Business logic & entities
│   │   │   ├── 📁 entities/   # Domain entities & custom errors
│   │   │   └── 📁 interfaces/ # Repository & service interfaces
│   │   ├── 📁 infrastructure/ # External concerns (database, email)
│   │   ├── 📁 presentation/   # Controllers & API routes
│   │   ├── 📁 types/          # TypeScript type definitions
│   │   ├── 📁 use_case/       # Application business logic
│   │   ├── 📁 utils/          # Utility functions
│   │   └── 📄 index.ts        # Server entry point
│   ├── 📁 __tests__/          # Test files
│   ├── 📁 logs/               # Log files
│   └── 📄 package.json
├── 📁 web/                    # Frontend application
│   ├── 📁 app/                # Next.js app directory
│   ├── 📁 components/         # React components
│   │   └── 📁 ui/             # Reusable UI components
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 lib/                # Utility libraries
│   ├── 📁 styles/             # Global styles
│   ├── 📁 types/              # TypeScript type definitions
│   └── 📄 package.json
└── 📄 package.json            # Root package.json
```

## 🏗️ Clean Architecture Implementation

This template follows **Clean Architecture** principles with clear separation of concerns:

### Architecture Layers

1. **Domain Layer** (`domain/`)
   - Core business entities and interfaces
   - Custom error definitions
   - Repository and service contracts

2. **Use Case Layer** (`use_case/`)
   - Application-specific business logic
   - Orchestrates domain entities and services
   - Independent of external frameworks

3. **Infrastructure Layer** (`infrastructure/`)
   - Database implementations
   - External service integrations
   - Framework-specific code

4. **Presentation Layer** (`presentation/`)
   - API controllers and routes
   - Request/response handling
   - HTTP-specific logic

5. **Dependency Injection** (`di/`)
   - IoC container setup with Inversify
   - Service and repository bindings
   - Loose coupling between layers

## 🔐 Complete Authentication System

The template provides a comprehensive authentication system with JWT-based session management and automatic token refresh capabilities.

### 📊 Authentication Flow Diagram

```mermaid
graph TB
    A[User Registration] --> B[Fill Email, Password, Name]
    B --> C[Validation & Account Creation]
    C --> D[Redirect to Sign In Page]
    
    D --> E[User Sign In]
    E --> F[Enter Email & Password]
    F --> G{Credentials Valid?}
    G -->|No| H[Show Error Message]
    H --> F
    G -->|Yes| I[Generate 6-digit OTP]
    I --> J[Send OTP to Email]
    J --> K[Redirect to OTP Page]
    
    K --> L[Enter OTP]
    L --> M{OTP Valid & Not Expired?}
    M -->|No| N[Show Error Message]
    N --> L
    M -->|Yes| O[Generate JWT Tokens]
    O --> P[Set HTTP-Only Cookies]
    P --> Q[Authenticated Session]
    
    Q --> R[Access Protected Routes]
    R --> S[Profile Endpoint]
    R --> T[Other Protected APIs]
    
    U[Token Expiry] --> V[Automatic Refresh]
    V --> W[New Access Token]
    W --> Q
    
    X[Forgot Password] --> Y[Send Reset Link]
    Y --> Z[OTP Verification]
    Z --> AA[Password Reset]
    AA --> D
    
    style A fill:#e1f5fe
    style Q fill:#c8e6c9
    style O fill:#fff3e0
    style V fill:#fce4ec
```

### 🔄 Authentication Flow Overview

```
Sign Up → Sign In → OTP Verification → Authenticated Session → Profile Access
```

#### Step-by-Step User Journey:

1. **User Registration** 📝
   - User enters email, password, and name on signup page
   - System validates input and creates account
   - User is redirected to signin page

2. **User Login** 🔑
   - User enters the same email and password used during signup
   - System validates credentials and generates 6-digit OTP
   - OTP is sent to user's email address
   - User is redirected to OTP verification page

3. **OTP Verification** ✅
   - User enters the OTP received in their email
   - System validates OTP and expiration (10-minute limit)
   - Upon successful verification:
     - Access token (JWT) is generated and stored as HTTP-only cookie
     - Refresh token is generated for automatic token renewal
     - User gains access to protected routes

4. **Authenticated Session** 🛡️
   - User can now access protected endpoints like `/api/profile`
   - Access and refresh tokens work together automatically in the background
   - No manual token management required from the user

### 🏗️ Authentication Architecture

#### 1. User Registration Flow (`SignupUseCase`)
```
📧 Email/Password → Validation → Password Hashing → User Creation → Redirect to Signin
```
- **Input validation**: Email format, password strength, name length
- **Duplicate check**: Prevents multiple accounts with same email
- **Secure hashing**: bcrypt with salt for password protection
- **Clean error handling**: Domain-specific error messages

#### 2. User Login Flow (`SigninUseCase`)
```
📧 Credentials → Validation → Password Verification → OTP Generation → Email Sent → Redirect to OTP
```
- **Credential verification**: Email and password validation
- **Password comparison**: Secure bcrypt comparison
- **OTP generation**: 6-digit verification code with expiration
- **Email delivery**: Automated OTP email via Nodemailer

#### 3. OTP Verification Flow (`OtpUseCase`)
```
🔢 OTP Input → Validation → Expiration Check → JWT Generation → Authenticated Session
```
- **OTP validation**: Database verification with expiration check
- **Time-based expiry**: Configurable expiration (default: 10 minutes)
- **JWT generation**: Access and refresh token creation
- **Cookie storage**: Secure HTTP-only cookie for token storage
- **OTP cleanup**: Automatic removal after successful verification

#### 4. Profile Access (`ProfileUseCase`)
```
🔒 Protected Request → Token Validation → User Data Retrieval → Response
```
- **Token authentication**: Automatic validation of access token
- **User profile**: Returns authenticated user's profile information
- **Testing endpoint**: Validates that JWT authentication is working correctly

#### 5. Token Refresh Flow (`RefreshTokenUseCase`)
```
🔄 Expired Access Token → Refresh Token Validation → New Access Token → Seamless Continuation
```
- **Automatic refresh**: Background token renewal without user intervention
- **Seamless experience**: Users never experience authentication interruptions
- **Security**: Refresh tokens have longer expiry but are securely managed

#### 6. Password Reset Flow (`ResetPasswordUseCase`)
```
📧 Forgot Password → Reset Link → OTP Verification → Password Update → Cleanup
```
- **Email-based reset**: Secure reset link generation
- **Time-limited access**: 5-minute expiry for security
- **Password update**: Secure hash generation and storage
- **Token cleanup**: Automatic OTP removal after reset

### 🛡️ Session Management Features
- **Automatic token refresh**: Seamless user experience with background token renewal
- **Secure cookie handling**: HTTP-only cookies prevent XSS attacks
- **Session persistence**: Refresh tokens maintain long-term sessions
- **Token expiration**: Configurable access token lifetimes
- **Account security**: Admin capability to block users
- **Multi-device support**: Multiple active sessions across devices

## 🛡️ API Security & Endpoints

### Protected Routes
All protected routes require valid JWT authentication via HTTP-only cookies.

#### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login (sends OTP to email)
- `POST /api/auth/verify-otp` - OTP verification (generates JWT tokens)
- `POST /api/auth/refresh` - Automatic token refresh
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset with OTP

#### Protected Endpoints
- `GET /api/profile` - Get authenticated user's profile data
  - **Purpose**: Testing endpoint to validate JWT authentication
  - **Returns**: User profile information (name, email, etc.)
  - **Authentication**: Requires valid access token

### Security Features
- **Rate Limiting**: Prevents API abuse with configurable limits
- **CORS Protection**: Configured for cross-origin requests  
- **Input Validation**: Joi schema validation for all inputs
- **JWT Authentication**: Secure token-based authentication with automatic refresh
- **Password Security**: bcrypt hashing with salt rounds
- **Cookie Security**: HTTP-only cookies prevent XSS attacks
- **Token Management**: Access tokens with refresh token rotation

## 🧪 Testing

```bash
# Run backend tests
pnpm --prefix server test
```

## 📦 Build for Production

```bash
# Build backend
pnpm --prefix server build

# Build frontend
pnpm --prefix web build

# Start production servers
pnpm --prefix server start    # Backend
pnpm --prefix web start       # Frontend
```

## 🎨 Customization

### UI Components
- All UI components are built with Radix UI primitives
- Styling is handled with Tailwind CSS
- Components are located in `web/components/ui/`
- Custom animations available via `tw-animate-css`

### Backend Configuration
- Domain entities and interfaces in `server/src/domain/`
- Use cases (business logic) in `server/src/use_case/`
- Infrastructure implementations in `server/src/infrastructure/`
- API controllers in `server/src/presentation/`
- Dependency injection setup in `server/src/di/`

### Theme Customization
- Light/dark theme support via `next-themes`
- Tailwind configuration in `web/tailwind.config.js`
- CSS variables in `web/styles/globals.css`

## 📚 Available Scripts

### Root Level
- `pnpm dev` - Start both frontend and backend in development
- `pnpm format` - Format code with Prettier

### Backend (`server/`)
- `pnpm dev` - Start development server with nodemon
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run Jest tests

### Frontend (`web/`)
- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Create a new issue with detailed information
3. Provide steps to reproduce the problem

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [MongoDB](https://www.mongodb.com/) - Document database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives

---

<div align="center">
  Made with ❤️ for the developer community
</div>
