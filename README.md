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
- 🔐 **Complete Authentication System** - Sign up, login, OTP verification, password reset
- 🎨 **Modern UI Components** - Built with Radix UI and Tailwind CSS
- 📱 **Responsive Design** - Mobile-first approach with dark/light theme support
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🔄 **Real-time Updates** - React Query for efficient data fetching
- 📧 **Email Integration** - Nodemailer for email services
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

## 🔐 Authentication Flow

The template includes a complete authentication system with clean architecture:

### 1. User Registration Flow (`SignupUseCase`)
```
📧 Email/Password → Validation → Password Hashing → User Creation
```
- **Input validation**: Email format, password strength, name length
- **Duplicate check**: Prevents multiple accounts with same email
- **Secure hashing**: bcrypt with salt for password protection
- **Clean error handling**: Domain-specific error messages

### 2. User Login Flow (`SigninUseCase`)
```
📧 Credentials → Validation → Password Verification → OTP Generation → Email Sent
```
- **Credential verification**: Email and password validation
- **Password comparison**: Secure bcrypt comparison
- **OTP generation**: 6-digit verification code
- **Email delivery**: Automated OTP email via Nodemailer
- **Token refresh**: JWT refresh token mechanism

### 3. OTP Verification Flow (`OtpUseCase`)
```
🔢 OTP Input → Validation → Expiration Check → Token Generation → Login Success
```
- **OTP validation**: Database verification with expiration check
- **Time-based expiry**: Configurable expiration (default: 10 minutes)
- **JWT generation**: Access and refresh token creation
- **User session**: Secure token storage and management
- **OTP cleanup**: Automatic removal after successful verification

### 4. Password Reset Flow (`ResetPasswordUseCase`)
```
📧 Email → Reset Link → OTP Verification → Password Update → Cleanup
```
- **Forgot password**: Email-based reset link generation
- **Secure links**: Time-limited reset URLs with embedded tokens
- **Link expiration**: 5-minute expiry for security
- **Password update**: Secure hash generation and storage
- **Token cleanup**: Automatic OTP removal after reset

### 5. Session Management Features
- **Automatic token refresh**: Seamless user experience
- **Secure cookie handling**: HTTP-only cookies for tokens
- **Session persistence**: Refresh token storage
- **Account blocking**: Admin capability to block users
- **Multi-device support**: Multiple active sessions

## 🛡️ API Security Features

- **Rate Limiting**: Prevents API abuse with configurable limits
- **CORS Protection**: Configured for cross-origin requests
- **Input Validation**: Joi schema validation for all inputs
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: bcrypt hashing with salt rounds
- **Cookie Security**: HTTP-only cookies for token storage

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
