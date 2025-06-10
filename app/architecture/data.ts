export interface FolderInfo {
    name: string;
    purpose: string;
    description: string;
    fileTypes: string[];
    layer: string;
    examples: string[];
    keyFeatures?: string[];
    dependencies?: string[];
    codeExample?: {
        filename: string;
        code: string;
        description: string;
    };
}

export const folderData: Record<string, FolderInfo> = {
    src: {
        name: "src",
        purpose: "Application Source Root Directory",
        description: "The primary source directory serving as the foundation for all application code. Organized following Clean Architecture principles with clear separation of concerns across layers. This directory acts as the main entry point and orchestrates the entire application structure.",
        fileTypes: ["TypeScript entry files", "Application bootstrapping", "Main configuration files"],
        layer: "Root",
        examples: ["index.ts"],
        keyFeatures: [
            "Clean Architecture layer organization",
            "Centralized application bootstrapping",
            "Environment-specific configurations",
            "Main server initialization"
        ],
        dependencies: ["Express.js", "Node.js runtime", "TypeScript compiler"]
    },
    config: {
        name: "config",
        purpose: "Centralized Application Configuration Hub",
        description: "Houses all configuration files essential for application initialization and external service connections. Manages environment variables, database connections, and application-wide settings. Provides a single source of truth for all configuration concerns, ensuring consistent setup across different environments (development, staging, production).",
        fileTypes: ["Database connection configs", "Environment variable handlers", "Service initialization configs", "Application startup configurations"],
        layer: "Infrastructure",
        examples: ["connectMongo.ts", "initConfig.ts", "index.ts", "envConfig.ts", "corsConfig.ts"],
        keyFeatures: [
            "Environment-based configuration management",
            "Database connection pooling and optimization",
            "External service integration setup",
            "Security configuration (CORS, rate limiting)",
            "Centralized environment variable validation"
        ],
        dependencies: ["MongoDB", "dotenv", "cors", "helmet"]
    },
    di: {
        name: "di",
        purpose: "Dependency Injection & Inversion of Control Container",
        description: "Implements the Dependency Injection pattern using Inversify container to manage application dependencies. This system enables loose coupling between components, facilitates unit testing through easy mocking, and provides a centralized registry for all service bindings. It's the backbone that makes Clean Architecture practical by ensuring proper dependency flow.",
        fileTypes: ["Container binding definitions", "Service registration modules", "Interface-to-implementation mappings", "Dependency resolution configurations"],
        layer: "Infrastructure",
        examples: ["controllers.ts", "services.ts", "repositories.ts", "useCases.ts", "middlewares.ts", "index.ts"],
        keyFeatures: [
            "Inversify container management",
            "Interface-based dependency binding",
            "Singleton and transient service lifetimes",
            "Automated dependency resolution",
            "Type-safe dependency injection",
            "Easy testing through mockable dependencies"
        ],
        dependencies: ["inversify", "reflect-metadata"],
        codeExample: {
            filename: "useCases.ts",
            code: `
import container from ".";
import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import SignupUseCase from "@/use_case/user/auth/SignupUseCase";
import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";

// Enum defining all available use case identifiers for type safety
export enum UseCases {
  SigninUseCase = "SigninUseCase",
  SignupUseCase = "SignupUseCase",
  LogoutUseCase = "LogoutUseCase",
  OtpUseCase = "OtpUseCase",
}

// Binding use case implementations to their identifiers
// This enables dependency injection throughout the application
container.bind(UseCases.SigninUseCase).to(SigninUseCase);
container.bind(UseCases.SignupUseCase).to(SignupUseCase);
container.bind(UseCases.OtpUseCase).to(OtpUseCase);
container.bind(UseCases.ResetPasswordUseCase).to(ResetPasswordUseCase);
container.bind(UseCases.OAuthUseCase).to(OAuthUseCase);
            `,
            description: "Dependency injection bindings for use cases using Inversify container, enabling loose coupling and easy testing through interface-based dependency management.",
        },
    },
    domain: {
        name: "domain",
        purpose: "Pure Business Domain Layer - Core of Clean Architecture",
        description: "The heart of Clean Architecture containing pure business logic, entities, and contracts. This layer is completely independent of external frameworks, databases, or UI concerns. It defines the core business rules, entities, and interfaces that represent the problem domain. All other layers depend on this layer, but it depends on nothing external.",
        fileTypes: ["Pure business entities", "Domain interfaces and contracts", "Business rule implementations", "Domain-specific exceptions"],
        layer: "Domain",
        examples: ["entities/", "interfaces/", "CustomErrors.ts", "valueObjects/", "specifications/"],
        keyFeatures: [
            "Framework-independent business logic",
            "Pure domain entities with business rules",
            "Interface definitions for external dependencies",
            "Domain-specific error handling",
            "Business invariants and constraints",
            "Value objects for domain concepts"
        ],
        dependencies: ["None - Pure TypeScript only"]
    },
    entities: {
        name: "entities",
        purpose: "Core Business Entities & Domain Models",
        description: "Contains pure business objects that represent the fundamental concepts of your domain. These entities encapsulate business rules and invariants, remaining completely independent of any external frameworks or technologies. They define the structure and behavior of core business concepts while maintaining their integrity through well-defined interfaces.",
        fileTypes: ["Business entity interfaces", "Domain model definitions", "Entity behavior specifications", "Business rule containers"],
        layer: "Domain",
        examples: ["IUser.ts", "IOtp.ts", "CustomErrors.ts", "IProduct.ts", "IOrder.ts"],
        keyFeatures: [
            "Framework-agnostic business models",
            "Encapsulated business rules and validations",
            "Immutable data structures where appropriate",
            "Type-safe domain representations",
            "Business invariant enforcement",
            "Clear entity relationships and dependencies"
        ],
        dependencies: ["TypeScript types only"],
        codeExample: {
            filename: "IUser.ts",
            code: `
import { DateString } from "@/types";

// User profile interface for public-facing operations
// Excludes sensitive information like passwords
export interface IUserProfile {
  readonly _id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly isBlocked?: boolean;
  readonly profile?: string;
}

// Complete user entity interface extending profile
// Includes all user properties including sensitive data
export default interface IUser extends IUserProfile {
  readonly isOAuthUser?: boolean;
  readonly password?: string;           // Hashed password storage
  readonly createdAt?: DateString;      // Account creation timestamp
  readonly updatedAt?: DateString;      // Last modification timestamp
  readonly token?: string;              // Session or verification token
}
`,
            description: "Domain entity defining the structure and properties of a User in the business domain, with clear separation between public profile and complete entity data.",
        },
    },
    interfaces: {
        name: "interfaces",
        purpose: "Domain Contracts & Dependency Inversion Interfaces",
        description: "Defines the contracts that external layers must implement, ensuring the Dependency Inversion Principle. These interfaces act as boundaries between the domain layer and external concerns, allowing the domain to remain independent while specifying exactly what it needs from external systems like databases, email services, or authentication providers.",
        fileTypes: ["Repository contracts", "External service interfaces", "Use case boundaries", "Domain service contracts"],
        layer: "Domain",
        examples: ["repositories/", "services/", "useCases/", "specifications/"],
        keyFeatures: [
            "Dependency inversion principle enforcement",
            "Clear contracts for external systems",
            "Interface segregation for focused responsibilities",
            "Testability through mockable contracts",
            "Technology-agnostic service definitions",
            "Boundary definitions between layers"
        ],
        dependencies: ["Domain entities only"],
        codeExample: {
            filename: "repositories/IUserRepository.ts",
            code: `
import IUser, { UserProfilePromise, UserPromise } from "@/domain/entities/IUser";
import IBaseRepository from "./IBaseRepository";

// User-specific repository contract extending base CRUD operations
// Defines all data access operations needed for user management
export default interface IUserRepository extends IBaseRepository<IUser> {
  // Public profile queries (without sensitive data)
  findByEmail(email: string): UserProfilePromise;
  findById(id: string): UserProfilePromise;

  // Full entity queries (with credentials for authentication)
  findByIdWithCredentials(id: string): UserPromise;
  findByEmailWithCredentials(email: string): UserPromise;
}
  `,
            description: "Repository interface defining contracts for user data access operations, separating public profile access from authenticated operations while maintaining clean abstractions.",
        },
    },
    "domain/repositories": {
        name: "domain/repositories",
        purpose: "Data Access Contract Definitions",
        description: "Contains interfaces that define how the domain layer expects to interact with data storage systems. These contracts ensure that business logic remains independent of specific database technologies while clearly specifying data access requirements. The actual implementations reside in the infrastructure layer.",
        fileTypes: ["Repository interface definitions", "Data access method contracts", "Query specification interfaces", "Base repository abstractions"],
        layer: "Domain",
        examples: ["IUserRepository.ts", "IOtpRepository.ts", "IBaseRepository.ts", "IProductRepository.ts"],
        keyFeatures: [
            "Database-agnostic data access contracts",
            "CRUD operation standardization",
            "Query method specifications",
            "Transaction boundary definitions",
            "Data consistency requirements",
            "Repository pattern implementation"
        ],
        dependencies: ["Domain entities only"]
    },
    "domain/services": {
        name: "domain/services",
        purpose: "External Service Contract Specifications",
        description: "Defines interfaces for all external services required by the domain layer, such as email delivery, authentication, encryption, and third-party API integrations. These contracts keep the domain layer completely independent of external service implementations while clearly specifying required capabilities and expected behaviors.",
        fileTypes: ["External service interfaces", "Authentication service contracts", "Communication service interfaces", "Utility service definitions"],
        layer: "Domain",
        examples: ["ITokenService.ts", "IMailService.ts", "IHashService.ts", "IOAuthService.ts", "IValidatorService.ts", "IFileService.ts"],
        keyFeatures: [
            "External service abstraction",
            "Provider-agnostic service contracts",
            "Authentication and authorization interfaces",
            "Communication service specifications",
            "Utility service definitions",
            "Error handling contract specifications"
        ],
        dependencies: ["Domain entities and types only"]
    },
    infrastructure: {
        name: "infrastructure",
        purpose: "External System Implementations & Technology Adapters",
        description: "Implements all the interfaces defined in the domain layer using concrete technologies and external systems. This layer contains database models, third-party service integrations, external API clients, and technology-specific implementations. It acts as the bridge between your pure business logic and the external world.",
        fileTypes: ["Database model implementations", "External service adapters", "Third-party API integrations", "Technology-specific implementations"],
        layer: "Infrastructure",
        examples: ["models/", "repositories/", "services/", "clients/", "adapters/"],
        keyFeatures: [
            "Concrete implementation of domain interfaces",
            "Database technology integration (MongoDB, PostgreSQL)",
            "External service provider implementations",
            "Third-party API client wrappers",
            "File system and cloud storage adapters",
            "Caching layer implementations"
        ],
        dependencies: ["MongoDB", "External APIs", "Cloud services", "Third-party libraries"]
    },
    models: {
        name: "models",
        purpose: "Database Schema Definitions & ORM Models",
        description: "Contains database-specific model definitions and schemas that map domain entities to database structures. These models handle data persistence, validation rules, indexing strategies, and database relationships. They serve as the bridge between the object-oriented domain and the relational/document database storage.",
        fileTypes: ["Database schema definitions", "ORM model configurations", "Index and constraint definitions", "Migration specifications"],
        layer: "Infrastructure",
        examples: ["User.ts", "Otp.ts", "Product.ts", "Order.ts", "Session.ts"],
        keyFeatures: [
            "Mongoose schema definitions for MongoDB",
            "Database validation and constraints",
            "Index optimization for query performance",
            "Relationship mapping and population rules",
            "Schema versioning and migration support",
            "Data transformation and serialization"
        ],
        dependencies: ["mongoose", "Database connection"],
        codeExample: {
            filename: "User.ts",
            code: `
import IUser from "@/domain/entities/IUser";
import { model, Schema } from "mongoose";

// Mongoose schema implementing the IUser domain entity
// Maps business entity to MongoDB document structure
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique constraint for business rule
    password: { type: String }, // Optional for OAuth users
    token: { type: String }, // Session or verification token
    isBlocked: { type: Boolean, default: false }, // Account status flag
    isOAuthUser: { type: String, default: false }, // Authentication method flag
    profile: { type: String } // Profile image URL or path
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    versionKey: false, // Disable MongoDB version key
  },
);

// Create and export the Mongoose model
const UserModel = model<IUser>("User", userSchema);
export default UserModel;
`,
            description: "Mongoose schema implementation for User entity with database-specific configurations, constraints, and automatic timestamp management.",
        },
    },
    "infrastructure/repositories": {
        name: "infrastructure/repositories",
        purpose: "Concrete Data Access Layer Implementations",
        description: "Provides concrete implementations of repository interfaces defined in the domain layer. These classes handle actual database operations, query optimization, data transformation, and error handling. They encapsulate all database-specific logic while maintaining the contracts expected by the business layer.",
        fileTypes: ["Repository class implementations", "Database query logic", "Data mapping and transformation", "Error handling and logging"],
        layer: "Infrastructure",
        examples: ["UserRepository.ts", "OtpRepository.ts", "ProductRepository.ts", "BaseRepository.ts"],
        keyFeatures: [
            "Complete CRUD operation implementations",
            "Query optimization and performance tuning",
            "Data transformation between domain and database models",
            "Error handling and logging",
            "Transaction management",
            "Connection pooling and resource management"
        ],
        dependencies: ["mongoose", "Database models", "Domain interfaces"],
        codeExample: {
            filename: "UserRepository.ts",
            code: `
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import UserModel from "../models/User";
import IUser, { UserProfilePromise, UserPromise } from "@/domain/entities/IUser";

// Concrete implementation of IUserRepository using Mongoose
// Handles all user-related database operations
export default class UserRepository implements IUserRepository {
  model = UserModel;
  credentials: string;

  constructor() {
    // Define fields to exclude for public profile queries
    this.credentials = "-password -token -isOAuthUser -updatedAt -createdAt -isBlocked";
  }

  // Public profile query - excludes sensitive information
  async findById(id: string): UserProfilePromise {
    return await this.model.findById(id).lean().select(this.credentials);
  }

  // Administrative query - returns all users
  async findAll(): Promise<IUser[]> {
    return await this.model.find().lean();
  }

  // Public profile query by email
  async findByEmail(email: string): UserProfilePromise {
    return await this.model.findOne({ email }).lean().select(this.credentials);
  }

  // Authentication query - includes all fields including credentials
  async findByIdWithCredentials(id: string): UserPromise {
    return await this.model.findById(id).lean();
  }

  // Authentication query by email - includes credentials
  async findByEmailWithCredentials(email: string): UserPromise {
    return await this.model.findOne({ email }).lean();
  }

  // Update user data with optimistic concurrency
  async update(id: string, entity: IUser): UserPromise {
    return await this.model.findByIdAndUpdate(id, entity, { new: true }).lean();
  }

  // Soft or hard delete based on business requirements
  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  // Create new user with validation
  async create(payload: IUser): Promise<IUser> {
    return await this.model.create(payload);
  }
}
`,
            description: "Concrete implementation of IUserRepository using Mongoose for MongoDB operations, with optimized queries and proper separation between public and authenticated data access.",
        },
    },
    "infrastructure/services": {
        name: "infrastructure/services",
        purpose: "External Service Integration & Implementation Layer",
        description: "Houses concrete implementations of all external service interfaces defined in the domain layer. This includes authentication providers, email services, file storage, payment gateways, and other third-party integrations. Each service encapsulates the complexity of external APIs while providing a clean interface to the application layer.",
        fileTypes: ["Service implementation classes", "External API client wrappers", "Authentication provider integrations", "Communication service implementations"],
        layer: "Infrastructure",
        examples: ["TokenService.ts", "HashService.ts", "MailService.ts", "OAuthService.ts", "ValidatorService.ts", "FileStorageService.ts"],
        keyFeatures: [
            "JWT token management and validation",
            "Password hashing and verification",
            "Email delivery with template support",
            "OAuth provider integration (Google, Facebook, etc.)",
            "File upload and cloud storage management",
            "Input validation and sanitization"
        ],
        dependencies: ["jsonwebtoken", "bcrypt", "nodemailer", "passport", "multer", "aws-sdk"],
        codeExample: {
            filename: "TokenService.ts",
            code: `
import ITokenService, {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "@/domain/interfaces/services/ITokenService";
import { JwtPayload, TokenExpiredError, sign, verify, SignOptions } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/config";
import { CustomError, ForbiddenError } from "@/domain/entities/CustomErrors";

import { StatusCode } from "@/types";

// JWT token service implementation handling authentication tokens
// Manages both access tokens (short-lived) and refresh tokens (long-lived)
export default class TokenService implements ITokenService {
  // Private helper method to create signed JWT tokens
  private signToken(payload: object, secret: string, options: SignOptions): string {
    return sign(payload, secret, { expiresIn: options.expiresIn });
  }
  
  // Private helper method to verify and decode JWT tokens
  private verifyToken(token: string, secret: string, type: "refresh" | "access"): JwtPayload {
    try {
      return verify(token, secret) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        if (type == "refresh") {
          throw new CustomError("Token expired", StatusCode.Forbidden);
        } else {
          throw new CustomError("Token expired", StatusCode.TokenExpired);
        }
      }
      throw new ForbiddenError("Invalid token");
    }
  }

  // Create long-lived refresh token for secure authentication
  createRefreshToken({ email, id }: RefreshTokenPayload): string {
    return this.signToken({ email, id }, REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d", // 7 days for refresh token
    });
  }

  // Verify and decode refresh token
  verifyRefreshToken(token: string): RefreshTokenPayload {
    const decoded = this.verifyToken(token, REFRESH_TOKEN_SECRET!, "refresh");
    return { email: decoded.email, id: decoded.id };
  }

  // Create short-lived access token for API requests
  createAccessToken({ email, id, role }: AccessTokenPayload): string {
    return this.signToken({ email, id, role }, ACCESS_TOKEN_SECRET!, {
      expiresIn: "5m", // 5 minutes for access token (security best practice)
    });
  }

  // Verify and decode access token
  verifyAccessToken(token: string): AccessTokenPayload {
    const { email, id, role } = this.verifyToken(token, ACCESS_TOKEN_SECRET!, "access");
    return { email, id, role };
  }
}
`,
            description: "JWT token service implementation handling access and refresh token operations with proper security practices, error handling, and token lifecycle management.",
        },
    },
    presentation: {
        name: "presentation",
        purpose: "HTTP Interface & External Communication Layer",
        description: "Serves as the external interface of the application, handling HTTP requests, responses, routing, and middleware. This layer translates HTTP requests into application use cases and formats responses appropriately. It includes controllers, middleware for cross-cutting concerns, and route definitions that expose the application's functionality to external clients.",
        fileTypes: ["HTTP request controllers", "Express.js route definitions", "Middleware implementations", "Request/response transformers"],
        layer: "Presentation",
        examples: ["controllers/", "routes/", "middlewares/", "transformers/", "validators/"],
        keyFeatures: [
            "RESTful API endpoint management",
            "HTTP request/response handling",
            "Authentication and authorization middleware",
            "Input validation and sanitization",
            "Error handling and logging",
            "Rate limiting and security middleware"
        ],
        dependencies: ["express", "cors", "helmet", "express-rate-limit", "express-validator"]
    },
    controllers: {
        name: "controllers",
        purpose: "HTTP Request Orchestration & Response Management",
        description: "Handle incoming HTTP requests by orchestrating the appropriate use cases and formatting responses. Controllers act as the bridge between HTTP requests and business logic, ensuring proper request validation, error handling, and response formatting. They coordinate multiple use cases when needed and manage the HTTP-specific concerns like status codes and headers.",
        fileTypes: ["HTTP request handlers", "Response formatting logic", "Request validation coordinators", "Error response managers"],
        layer: "Presentation",
        examples: [
            "admin/AuthController.ts",
            "admin/AdminController.ts",
            "user/AuthControllers.ts",
            "user/ProfileController.ts",
            "user/ProductController.ts"
        ],
        keyFeatures: [
            "HTTP request orchestration",
            "Use case coordination and execution",
            "Response formatting and status code management",
            "Request validation and sanitization",
            "Error handling and logging",
            "Authentication token management"
        ],
        dependencies: ["express", "Use cases", "Validation libraries"],
        codeExample: {
            filename: "admin/AuthController.ts",
            code: `
import { UseCases } from "@/di/useCases";
import { Cookies, StatusCode } from "@/types";
import AdminSigninUseCase from "@/use_case/admin/SigninUseCase";
import { tryCatch } from "@/utils";
import { inject } from "inversify";

// Admin authentication controller handling HTTP requests
// Orchestrates authentication use cases and manages HTTP responses
export default class AdminAuthController {
    constructor(
        @inject(UseCases.AdminSigninUseCase) private readonly adminSigninUseCase: AdminSigninUseCase
    ) { };

    // Handle admin signin request
    signin = tryCatch(async (req, res) => {
        // Execute signin use case with request data
        const { accessToken, refreshToken } = this.adminSigninUseCase.exec(req.body);

        // Set secure HTTP-only cookie for refresh token
        res.cookie(Cookies.Admin, refreshToken, {
            httpOnly: true,        // Prevent XSS attacks
            secure: true,          // HTTPS only
            sameSite: "strict",    // CSRF protection
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Return access token in response body
        res.status(StatusCode.Success).json({ accessToken, message: "Signin Successful." });
    });

    // Handle admin logout request
    logout = tryCatch(async (req, res) => {
        const { admin_token } = req.cookies;
        if (!admin_token) return res.sendStatus(StatusCode.NoContent);

        // Clear authentication cookie
        res.clearCookie(Cookies.Admin, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        res.status(StatusCode.Success).json({ message: "Successfully logged out." });
    });

    // Handle access token refresh request
    refreshAccessToken = tryCatch(async (req, res) => {
        const { admin_token } = req.cookies;
        const { accessToken } = await this.adminSigninUseCase.refreshAccessToken(admin_token);
        res.status(StatusCode.Success).json({ accessToken, message: "Access token refreshed successfully." });
    });
}
            `,
            description: "HTTP controller handling admin authentication requests with proper security measures, cookie management, and use case orchestration.",
        },
    },
    middlewares: {
        name: "middlewares",
        purpose: "Cross-Cutting HTTP Concerns & Request Processing Pipeline",
        description: "Implements middleware functions that handle cross-cutting concerns in the HTTP request pipeline. This includes authentication verification, request validation, error handling, logging, rate limiting, and security headers. Middleware ensures consistent behavior across all routes and provides reusable functionality for common HTTP processing needs.",
        fileTypes: ["Authentication middleware", "Authorization guards", "Error handling middleware", "Validation middleware", "Security middleware"],
        layer: "Presentation",
        examples: ["UserAuthMiddleware.ts", "AdminAuthMiddleware.ts", "ErrorHandler.ts", "RateLimiterMiddleware.ts", "ValidationMiddleware.ts"],
        keyFeatures: [
            "JWT token validation and user context injection",
            "Role-based access control",
            "Global error handling and logging",
            "Request rate limiting and throttling",
            "Input validation and sanitization",
            "Security headers and CORS management"
        ],
        dependencies: ["express", "jsonwebtoken", "express-rate-limit", "helmet", "express-validator"]
    },
    routes: {
        name: "routes",
        purpose: "API Endpoint Definition & Route Organization",
        description: "Defines and organizes all API endpoints, mapping HTTP routes to their corresponding controllers and middleware. Routes are organized by feature areas and user types, providing a clear structure for API navigation. Each route definition specifies the HTTP method, path, middleware chain, and controller action.",
        fileTypes: ["Route definition modules", "API endpoint configurations", "Route group organizations", "Middleware binding specifications"],
        layer: "Presentation",
        examples: ["admin/authRoutes.ts", "admin/userRoutes.ts", "user/authRoutes.ts", "user/profileRoutes.ts", "index.ts"],
        keyFeatures: [
            "RESTful route organization",
            "Feature-based route grouping",
            "Middleware chain configuration",
            "Controller method binding",
            "Route parameter handling",
            "API versioning support"
        ],
        dependencies: ["express", "Controllers", "Middleware"],
        codeExample: {
            filename: "admin/authRoutes.ts",
            code: `
import { resolve } from "@/di";
import { Controllers } from "@/di/controllers";
import AdminAuthController from "@/presentation/controllers/admin/AuthController";
import { Router } from "express";

// Create Express router for admin authentication routes
const router = Router();

// Resolve admin auth controller from dependency injection container
const authController = resolve<AdminAuthController>(Controllers.AdminAuthController);

// POST /admin/auth - Admin signin endpoint
router.post("/", authController.signin.bind(authController));

// DELETE /admin/auth/logout - Admin logout endpoint
router.delete("/logout", authController.logout.bind(authController));

// POST /admin/auth/refresh - Access token refresh endpoint
router.post("/refresh", authController.refreshAccessToken.bind(authController));

export default router;
`,
            description: "Express router defining admin authentication endpoints with proper controller method binding and dependency injection integration.",
        },
    },
    types: {
        name: "types",
        purpose: "Shared Type Definitions & TypeScript Contracts",
        description: "Centralizes all TypeScript type definitions, interfaces, enums, and utility types used throughout the application. This ensures type consistency across layers and provides a single source of truth for shared data structures. Includes API types, common enums, utility types, and global type definitions that enhance type safety and developer experience.",
        fileTypes: ["Global type definitions", "API request/response types", "Enum definitions", "Utility type helpers", "Shared interface definitions"],
        layer: "Shared",
        examples: ["index.ts", "api.ts", "common.ts", "enums.ts", "utilities.ts"],
        keyFeatures: [
            "Centralized type definition management",
            "API contract type definitions",
            "Reusable utility types and helpers",
            "Enum definitions for constants",
            "Generic type constraints and mappings",
            "Type-safe configuration definitions"
        ],
        dependencies: ["TypeScript", "Express Types"],
        codeExample: {
            filename: "index.ts",
            code: `
import { Request } from "express";

export enum UserRole {
  Admin = "Admin",
  User = "User",
}

export enum Cookies {
  User = "user_token",
  Admin = "admin_token",
}

export enum StatusCode {
  Success = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentError = 402,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  RateLimitExceeded = 429,
  TokenExpired = 498,
}

export type DateString = Date | string;

export interface CustomRequest extends Request {
  user?: {
    email: string;
    id: string;
  };
  admin?: {
    email: string;
    id: string;
  };
}
        `,
            description: "Defines common types, enums, and request extensions used across the application. Includes user roles, cookie names, and custom request interfaces."
        }
    },
    use_case: {
        name: "use_case",
        purpose: "Application Business Logic Orchestration Layer",
        description: "Contains the core application logic that orchestrates domain entities, repositories, and external services to fulfill specific business use cases. This layer implements the actual business workflows and rules, coordinating between different domain services while remaining independent of external frameworks. Each use case represents a single business operation or user story.",
        fileTypes: ["Business workflow implementations", "Use case orchestration logic", "Application service coordinators", "Business rule enforcers"],
        layer: "Application",
        examples: [
            "admin/GetUsersUseCase.ts",
            "admin/SigninUseCase.ts",
            "user/auth/SignupUseCase.ts",
            "user/GetProfileUseCase.ts",
            "user/UpdateProfileUseCase.ts"
        ],
        keyFeatures: [
            "Business workflow orchestration",
            "Domain service coordination",
            "Input validation and business rule enforcement",
            "Transaction management and consistency",
            "Error handling and business exception management",
            "Integration between multiple domain services"
        ],
        dependencies: ["Domain interfaces", "Repository contracts", "Service contracts"],
        codeExample: {
            filename: "user/auth/SignupUseCase.ts",
            code: `
import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IUser from "@/domain/entities/IUser";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IHashService from "@/domain/interfaces/services/IHashService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { ConflictError } from "@/domain/entities/CustomErrors";
import { inject } from "inversify";

// User signup use case orchestrating multiple domain services
// Implements the complete business workflow for user registration
export default class SignupUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
    @inject(Services.HashService) private readonly hashService: IHashService,
  ) {}

  // Main execution method for user signup workflow
  async exec(data: IUser) {
    // Step 1: Validate input data according to business rules
    const { email, name, password } = this.validate(data)
    
    // Step 2: Check for existing user to prevent duplicates
    const existingUser = await this.userRepository.findByEmail(email!);
    if (existingUser) {
      throw new ConflictError("User with this email already exists");
    }

    // Step 3: Hash password for secure storage
    const hashedPassword = await this.hashService.hash(password!);

    // Step 4: Create new user record
    await this.userRepository.create({
      password: hashedPassword,
      email,
      name,
    });
  }

  // Private validation method enforcing business rules
  private validate({ email, name, password }: IUser) {
    // Validate required fields presence
    this.validatorService.validateRequiredFields({ email, name, password });
    
    // Validate email format
    this.validatorService.validateEmailFormat(email!);
    
    // Validate password strength
    this.validatorService.validatePassword(password!);
    
    // Validate name length constraints
    this.validatorService.validateLength(name!, 2, 50);

    return { email, name, password };
  }
}
            `,
            description:
                "Use case implementing user signup business logic with comprehensive validation, duplicate checking, password hashing, and secure user creation workflow.",
        },
    },
    "use_case/admin": {
        name: "use_case/admin",
        purpose: "Administrative Business Logic & Management Operations",
        description:
            "Contains business logic specifically designed for administrative operations such as user management, system configuration, reporting, and administrative authentication. These use cases typically require elevated privileges and handle system-wide operations that regular users cannot perform. Each use case implements specific administrative workflows while maintaining proper authorization and audit logging.",
        fileTypes: ["Administrative workflow implementations", "User management operations", "System configuration logic", "Reporting and analytics use cases"],
        layer: "Application",
        examples: ["GetUsersUseCase.ts", "UpdateUserStatusUseCase.ts", "SigninUseCase.ts", "GenerateReportsUseCase.ts", "ManageSystemSettingsUseCase.ts"],
        keyFeatures: [
            "User account management and moderation",
            "System-wide configuration management",
            "Administrative authentication and session management",
            "Bulk operations and data management",
            "Audit logging and compliance reporting",
            "Role and permission management"
        ],
        dependencies: ["Admin repositories", "Audit services", "Notification services"]
    },
    "use_case/user": {
        name: "use_case/user",
        purpose: "End-User Business Logic & Self-Service Operations",
        description:
            "Implements business logic for end-user operations including profile management, account settings, user authentication, and self-service features. These use cases focus on individual user workflows and personal data management while ensuring proper authorization and data privacy. Each use case represents a specific user journey or feature.",
        fileTypes: ["User workflow implementations", "Profile management operations", "Self-service feature logic", "User preference handling"],
        layer: "Application",
        examples: ["auth/", "GetProfileUseCase.ts", "UpdateProfileUseCase.ts", "ChangePasswordUseCase.ts", "DeleteAccountUseCase.ts"],
        keyFeatures: [
            "User profile management and customization",
            "Account security and privacy controls",
            "Personal data export and portability",
            "Notification preferences and settings",
            "Social features and connections",
            "User activity tracking and analytics"
        ],
        dependencies: ["User repositories", "Profile services", "Notification services"]
    },
    auth: {
        name: "auth",
        purpose: "Authentication & Authorization Business Logic Hub",
        description:
            "Houses all authentication-related business logic including user registration, login, password management, OAuth integration, multi-factor authentication, and session management. This module ensures secure user authentication flows while providing flexibility for different authentication methods and maintaining security best practices throughout the user lifecycle.",
        fileTypes: ["Authentication workflow implementations", "Authorization logic", "Session management operations", "Security validation use cases"],
        layer: "Application",
        examples: ["SignupUseCase.ts", "SigninUseCase.ts", "OAuthUseCase.ts", "OtpUseCase.ts", "ResetPasswordUseCase.ts", "RefreshTokenUseCase.ts"],
        keyFeatures: [
            "Multi-method authentication support (email/password, OAuth, OTP)",
            "Secure password reset and recovery workflows",
            "Two-factor authentication implementation",
            "Session management and token refresh logic",
            "Account verification and email confirmation",
            "Security event logging and monitoring"
        ],
        dependencies: ["Authentication services", "Email services", "Token services", "OTP services"]
    },
    utils: {
        name: "utils",
        purpose: "Reusable Utility Functions & Common Operations Hub",
        description: "Provides a comprehensive collection of utility functions, helper methods, and common operations used across the entire application. This includes data transformation utilities, validation helpers, logging utilities, date/time operations, string manipulation, and other generic functions that promote code reusability and maintain consistency throughout the application.",
        fileTypes: ["Utility function collections", "Helper method libraries", "Common operation implementations", "Generic algorithm implementations"],
        layer: "Shared",
        examples: ["generateOtp.ts", "logger.ts", "dateUtils.ts", "stringUtils.ts", "validationHelpers.ts", "index.ts"],
        keyFeatures: [
            "Data transformation and formatting utilities",
            "Validation and sanitization helpers",
            "Logging and debugging utilities",
            "Date/time manipulation functions",
            "String processing and formatting",
            "Error handling and async operation helpers"
        ],
        dependencies: ["Minimal external dependencies", "Node.js built-ins"],
        codeExample: {
            filename: "utils/index.ts",
            code: `
import { NextFunction, Response } from "express";
import { CustomRequest } from "@/types";

// Generate secure 6-digit OTP for verification purposes
// Uses cryptographically secure random number generation
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Higher-order function for async error handling in Express controllers
// Automatically catches and forwards errors to error handling middleware
export const tryCatch = <T>(
  controllerFn: (req: CustomRequest, res: Response, next: NextFunction) => Promise<T>,
) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error); // Forward error to Express error handling middleware
    }
  };
};

// Format date to standardized string format
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Sanitize string input by removing potentially harmful characters
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Generate random string for tokens, IDs, etc.
export const generateRandomString = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
            `,
            description: "Collection of utility functions including OTP generation, async error handling, date formatting, input sanitization, and random string generation for common application needs."
        }
    },
};

// Additional metadata for the folder structure
export const architectureLayers = {
    "Domain": {
        description: "Pure business logic independent of external frameworks",
        folders: ["domain", "entities", "interfaces"],
        dependencies: "None (framework-independent)"
    },
    "Application": {
        description: "Use cases and application-specific business logic",
        folders: ["use_case"],
        dependencies: "Domain layer only"
    },
    "Infrastructure": {
        description: "External system implementations and technology adapters",
        folders: ["infrastructure", "models", "config"],
        dependencies: "Domain interfaces, external libraries"
    },
    "Presentation": {
        description: "HTTP interface and external communication",
        folders: ["presentation", "controllers", "routes", "middlewares"],
        dependencies: "Application layer, HTTP frameworks"
    },
    "Shared": {
        description: "Common utilities and type definitions",
        folders: ["types", "utils"],
        dependencies: "Minimal, used by all layers"
    }
};

export const projectBenefits = [
    "Clean separation of concerns following Clean Architecture principles",
    "High testability through dependency injection and interface abstractions",
    "Framework independence in core business logic",
    "Easy maintenance and feature additions",
    "Scalable architecture supporting team collaboration",
    "Type safety throughout the application with TypeScript",
    "Consistent error handling and logging patterns",
    "Security best practices implementation",
    "Efficient database operations with proper abstraction",
    "Extensible design supporting multiple authentication methods"
];