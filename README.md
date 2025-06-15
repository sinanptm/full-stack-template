# 🚀 Full-Stack Authentication Template

<div align="center">

[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red?style=for-the-badge)](https://opensource.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

### 🌟 _Production-ready full-stack template with clean architecture and complete authentication system_

**🎯 Built for Easy Customization & Rapid Development**  
**📚 Documentation: https://full-stack-clean-auth-template.vercel.app/**

---

### 💝 **This is a completely FREE and OPEN SOURCE project!**

_Feel free to use, modify, and contribute to help the developer community grow together._

</div>

---

## ✨ **Key Features**

<table>
<tr>
<td width="50%">

### 🏗️ **Architecture & Design**

- **Clean Architecture Design** - Domain-driven structure makes adding/removing features effortless
- **Highly Customizable** - Modular components and services for easy adaptation
- **Framework Independence** - Core logic isn't tied to specific frameworks

</td>
<td width="50%">

### 🔐 **Security & Authentication**

- **Complete Authentication System** - Email/Password with OTP, OAuth (Google, GitHub)
- **Role-Based Access Control** - Secure user and admin roles with protected routes
- **Security-First Design** - JWT tokens, HTTP-only cookies, rate limiting, bcrypt hashing

</td>
</tr>
<tr>
<td width="50%">

### ⚡ **Modern Technology**

- **Latest Tech Stack** - Next.js 15, Express.js 5, MongoDB, TypeScript, Firebase OAuth
- **Excellent Developer Experience** - Hot reload, TypeScript support, comprehensive testing setup

</td>
<td width="50%">

### 🚀 **Production Ready**

- **Scalable Structure** - Built for enterprise-level applications
- **Testing Setup** - Comprehensive testing framework included
- **Documentation** - Complete setup and usage guides

</td>
</tr>
</table>

---

## 🎨 **Why This Template is Perfect for Customization**

<details>
<summary><strong>🏛️ Clean Architecture Benefits</strong></summary>

- **Separation of Concerns**: Each layer has a single responsibility, making changes isolated and predictable
- **Dependency Inversion**: Abstractions don't depend on details, making it easy to swap implementations
- **Testable Code**: Business logic is independent of frameworks, making unit testing straightforward
- **Framework Independence**: Core business logic isn't tied to Express.js or Next.js

</details>

<details>
<summary><strong>🔄 Easy Feature Management</strong></summary>

✅ **Want to add a new user role?** → Add entity + use case + controller  
✅ **Need different OAuth provider?** → Implement new service following existing interface  
✅ **Switch from MongoDB to PostgreSQL?** → Replace repository implementation  
✅ **Add email notifications?** → Create new service and inject where needed  
✅ **Implement two-factor authentication?** → Extend existing auth use cases  
✅ **Change UI library?** → Components are decoupled from business logic

</details>

<details>
<summary><strong>🎯 Modular Structure for Rapid Development</strong></summary>

- **Frontend**: Component-based architecture with reusable UI elements
- **Backend**: Use case driven development with clear boundaries
- **Shared Types**: TypeScript interfaces ensure type safety across the stack
- **Plugin Architecture**: Easy to extend without modifying core functionality

</details>

---

## 🔐 **Complete Authentication System Flow**

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

---

## 🛠️ **Technology Stack**

<table align="center">
<thead>
<tr>
<th width="20%">Layer</th>
<th width="30%">Technology</th>
<th width="50%">Why This Choice</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Frontend</strong></td>
<td>Next.js 15, React 19, Tailwind CSS, Shadcn UI</td>
<td>Server-side rendering, component reusability, rapid styling</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>Express.js 5, Node.js, TypeScript</td>
<td>Lightweight, flexible, strongly typed</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>MongoDB with Mongoose ODM</td>
<td>Schema flexibility, easy scaling</td>
</tr>
<tr>
<td><strong>Authentication</strong></td>
<td>JWT, Firebase OAuth, Nodemailer</td>
<td>Secure, scalable, multiple providers</td>
</tr>
<tr>
<td><strong>State Management</strong></td>
<td>Zustand + React Query</td>
<td>Simple, performant, server state sync</td>
</tr>
<tr>
<td><strong>Security</strong></td>
<td>bcrypt, CORS, Rate Limiting, RBAC</td>
<td>Industry-standard security practices</td>
</tr>
</tbody>
</table>

---

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js v22+
- pnpm v10.8.1+
- MongoDB (local or Atlas)
- Firebase project with Authentication enabled

### **Installation**

```bash
git clone git@github.com:sinanptm/fullstack-clean-auth-template.git
cd full-stack-template
pnpm install
```

### **Environment Setup**

<details>
<summary><strong>🔧 Server Configuration</strong> (`.env` in `server/` directory)</summary>

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

</details>

<details>
<summary><strong>🌐 Client Configuration</strong> (`.env.local` in `web/` directory)</summary>

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

</details>

### **🎬 Start Development**

```bash
# 🚀 Start both frontend and backend
pnpm dev

# 🔧 Or start individually
pnpm --prefix server dev    # Backend: http://localhost:8000
pnpm --prefix web dev       # Frontend: http://localhost:3000
```

---

## 🔐 **API Routes**

<table>
<tr>
<td width="50%">

### **🔑 Authentication Routes**

```
POST /api/auth/signup         - User registration
POST /api/auth/signin         - Login with OTP
POST /api/auth/verify-otp     - OTP verification
POST /api/auth/oauth-2        - OAuth authentication
POST /api/auth/forgot-password - Password reset
POST /api/auth/reset-password  - Reset with OTP
```

</td>
<td width="50%">

### **🛡️ Protected Routes**

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

</td>
</tr>
</table>

---

## 🧪 **Development Commands**

<table>
<tr>
<td width="33.33%">

### **🔧 Development**

```bash
pnpm dev                      # Both servers
pnpm --prefix server dev      # Backend only
pnpm --prefix web dev         # Frontend only
```

</td>
<td width="33.33%">

### **🧪 Testing & Quality**

```bash
pnpm --prefix server test     # Backend tests
pnpm --prefix web lint        # Lint frontend
pnpm format                   # Format code
```

</td>
<td width="33.33%">

### **🚀 Production**

```bash
pnpm --prefix server build    # Build backend
pnpm --prefix web build       # Build frontend
pnpm --prefix server start    # Start production
```

</td>
</tr>
</table>

---

## 🔒 **Security Features**

<div align="center">

| Feature                     | Description              | Implementation               |
| --------------------------- | ------------------------ | ---------------------------- |
| 🔐 **JWT Authentication**   | Secure token-based auth  | Automatic token refresh      |
| 🛡️ **Role-Based Access**    | User/Admin role control  | Protected route middleware   |
| 🔥 **Firebase OAuth**       | Social login integration | Server-side token validation |
| 🍪 **HTTP-Only Cookies**    | XSS attack prevention    | Secure cookie configuration  |
| 🔒 **Password Security**    | Strong password hashing  | bcrypt with 10 rounds        |
| ⚡ **Rate Limiting**        | DDoS protection          | Request throttling + CORS    |
| ✅ **Input Validation**     | Data integrity           | Comprehensive Joi schemas    |
| 🚫 **Injection Prevention** | SQL injection protection | Parameterized queries        |

</div>

### **🔥 Firebase Setup**

1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication providers (Google, GitHub)
3. Generate service account key
4. Configure authorized domains

### **✅ Production Checklist**

- [ ] Environment variables configured
- [ ] MongoDB Atlas connection established
- [ ] Firebase production settings applied
- [ ] Admin credentials secured
- [ ] CORS origins updated for production
- [ ] Rate limiting configured appropriately
- [ ] SSL certificates installed
- [ ] Monitoring and logging setup

---

## 🤝 **Contributing**

<div align="center">

### **We welcome contributions from the community! 🎉**

</div>

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** the existing architecture patterns
4. **Add** tests for new functionality
5. **Commit** changes (`git commit -m 'Add amazing feature'`)
6. **Push** to branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

---

## 📄 **License**

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**🎯 This means you can use, modify, distribute, and even sell this code!**  
_Just keep the license notice intact._

</div>

---

<div align="center">

## 🌟 **Ready to build your next project?**

### _This template provides everything you need to start building production-ready applications with clean architecture that scales with your requirements._

**💝 100% Free & Open Source • 🏗️ Built with Modern Technologies • 🚀 Production Ready**

---

### **⭐ If this project helped you, please consider giving it a star!**

_It helps others discover this template and motivates continued development._

[![GitHub stars](https://img.shields.io/github/stars/sinanptm/fullstack-clean-auth-template?style=social)](https://github.com/sinanptm/fullstack-clean-auth-template)

</div>
