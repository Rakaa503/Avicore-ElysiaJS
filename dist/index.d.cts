import cors from 'cors';
import { z, ZodType } from 'zod';
import * as _prisma_client_runtime_library from '@prisma/client/runtime/library';
import * as _prisma_client from '@prisma/client';
import { PrismaClient } from '@prisma/client';
export { ClientInfo, CookieConfig, CookieMap, CorsConfig, CorsHeaders, CsrfConfig, CsrfRequest, CsrfResult, DEFAULT_CONTENT_TYPE, DEFAULT_CONTENT_TYPE_OPTIONS, DEFAULT_COOKIE_NAME, DEFAULT_CSRF_COOKIE, DEFAULT_CSRF_HEADER, DEFAULT_FRAME_OPTIONS, DEFAULT_PERMISSIONS_POLICY, DEFAULT_RATE_LIMIT, DEFAULT_RATE_WINDOW, DEFAULT_REFERRER_POLICY, DEFAULT_SECURITY_HEADERS, DEFAULT_TOKEN_LENGTH, HeaderConfig, MemoryStore, ProxyConfig, ProxyHeaders, ProxyInfo, RateLimitConfig, RateLimitEntry, RateLimitResult, RateLimiter, RateLimiterOptions, SECURITY_NAME, SECURITY_VERSION, SecurityConfig, SecurityFramework, SecurityHeaders, SecurityHeadersBuilder, SecurityModule, SecurityResult, XssConfig, createCorsHeaders, createSecurity, csrfMiddleware, defaultCookieConfig, defaultCorsConfig, defaultCsrfConfig, defaultHeaderConfig, defaultProxyConfig, defaultRateLimitConfig, defaultXssConfig, escapeHtml, generateCsrfToken, getProxyInfo, getSecurityConfig, isTrustedProxy, parseCookies, rateLimit, resetSecurityConfig, sanitize, serializeCookie, setSecurityConfig, validateCsrfToken } from './security.cjs';

declare const corsMiddleware: (req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;

declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    DATABASE_URL: z.ZodString;
    BETTER_AUTH_SECRET: z.ZodString;
    BETTER_AUTH_URL: z.ZodString;
}, z.core.$strip>;
type Env = z.infer<typeof envSchema>;
declare function validateEnv(): Env;

declare global {
    var prisma: PrismaClient | undefined;
}
declare const prisma: PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client_runtime_library.DefaultArgs>;

interface ValidationResult<T> {
    success: boolean;
    data?: T;
    errors?: string[];
}
declare function validate<T>(schema: ZodType<T>, input: unknown): ValidationResult<T>;
declare function validateOrThrow<T>(schema: ZodType<T>, input: unknown): T;

interface AuditUser {
    id: string;
    name: string;
    email?: string;
    role?: string;
}
interface AuditEntry {
    event: string;
    user?: AuditUser;
    message?: string;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
    timestamp: Date;
}
interface AuditOptions {
    enabled?: boolean;
    showTimestamp?: boolean;
    showUserAgent?: boolean;
    showIp?: boolean;
}

declare class Audit {
    log(entry: AuditEntry): void;
    login(user: AuditUser): void;
    logout(user: AuditUser): void;
    register(user: AuditUser): void;
    failedLogin(email: string): void;
    changePassword(user: AuditUser): void;
    changeRole(user: AuditUser, oldRole: string, newRole: string): void;
    createUser(user: AuditUser): void;
    updateUser(user: AuditUser): void;
    deleteUser(user: AuditUser): void;
    verifyEmail(user: AuditUser): void;
    resetPassword(user: AuditUser): void;
}
declare const audit: Audit;

declare enum AuditEvent {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REGISTER = "REGISTER",
    FAILED_LOGIN = "FAILED_LOGIN",
    CHANGE_PASSWORD = "CHANGE_PASSWORD",
    CHANGE_ROLE = "CHANGE_ROLE",
    CREATE_USER = "CREATE_USER",
    UPDATE_USER = "UPDATE_USER",
    DELETE_USER = "DELETE_USER",
    VERIFY_EMAIL = "VERIFY_EMAIL",
    RESET_PASSWORD = "RESET_PASSWORD"
}

declare function formatAudit(entry: AuditEntry): string;

interface CheckResult {
    name: string;
    success: boolean;
}
declare class Doctor {
    private results;
    check(name: string, success: boolean): void;
    render(): void;
}
declare const doctor: Doctor;

declare enum ErrorCode {
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    SESSION_EXPIRED = "SESSION_EXPIRED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
}

declare class AVSSError extends Error {
    readonly status: number;
    readonly code: ErrorCode;
    readonly timestamp: Date;
    constructor(message: string, status: number, code: ErrorCode);
    toJSON(): {
        name: string;
        message: string;
        status: number;
        code: ErrorCode;
        timestamp: string;
    };
}

declare class UnauthorizedError extends AVSSError {
    constructor(message?: string);
}

declare class ForbiddenError extends AVSSError {
    constructor(message?: string);
}

declare class ValidationError extends AVSSError {
    constructor(message?: string);
}

declare class SessionExpiredError extends AVSSError {
    constructor(message?: string);
}

declare class InternalServerError extends AVSSError {
    constructor(message?: string);
}

interface ErrorResponse {
    success: false;
    error: {
        name: string;
        message: string;
        status: number;
        code: string;
        timestamp: string;
    };
}
declare function errorHandler(error: unknown): ErrorResponse;

interface LoginEvent {
    id: string;
    name: string;
    email?: string;
    role?: string;
}
interface LogoutEvent {
    id: string;
    name: string;
}
interface RegisterEvent {
    id: string;
    name: string;
    email?: string;
}
interface FailedLoginEvent {
    email: string;
}
interface EventMap {
    login: LoginEvent;
    logout: LogoutEvent;
    register: RegisterEvent;
    failedLogin: FailedLoginEvent;
    changePassword: LoginEvent;
    changeRole: LoginEvent;
    deleteUser: LoginEvent;
    verifyEmail: LoginEvent;
    resetPassword: LoginEvent;
}
type EventName = keyof EventMap;

type EventListener<K extends keyof EventMap> = (payload: EventMap[K]) => void;

declare class EventEmitter {
    private listeners;
    on<K extends EventName>(event: K, listener: EventListener<K>): void;
    off<K extends EventName>(event: K, listener: EventListener<K>): void;
    emit<K extends EventName>(event: K, payload: EventMap[K]): void;
    clear(): void;
    listenerCount(event: EventName): number;
}
declare const events: EventEmitter;

declare class Logger {
    private log;
    info(message: string): void;
    success(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    security(message: string): void;
    database(message: string): void;
    access(message: string): void;
    fatal(message: string): void;
}
declare const logger: Logger;

declare function startTimer(name: string): void;
declare function endTimer(name: string): void;

interface RequestLog {
    method: string;
    url: string;
    status: number;
    ip?: string;
}
declare function logRequest(req: RequestLog): void;

declare function showBanner(): void;

declare function rotateLogs(): void;

interface AVSSPlugin {
    name: string;
    setup(): void;
}

declare function loggerPlugin(): AVSSPlugin;

declare function auditPlugin(): AVSSPlugin;

declare function banner(): void;

declare function box(title: string, width?: number): void;

declare const Colors: {
    reset: string;
};

declare function divider(char?: string, length?: number): void;

interface FooterOptions {
    framework: string;
    version: string;
    runtime?: string;
    status?: string;
}
declare function footer({ framework, version, runtime, status, }: FooterOptions): void;

declare function header(title: string): void;

declare function success(message: string): void;
declare function error(message: string): void;
declare function warning(message: string): void;
declare function info(message: string): void;
declare function pass(message: string): void;
declare function fail(message: string): void;

declare const output: {
    success: typeof success;
    error: typeof error;
    warning: typeof warning;
    info: typeof info;
};

declare function progress(current?: number, total?: number, width?: number): void;

declare function section(title: string): void;

declare class Spinner {
    private spinner;
    constructor(text?: string);
    start(): void;
    success(text?: string): void;
    fail(text?: string): void;
    warn(text?: string): void;
    info(text?: string): void;
    stop(): void;
}

declare const Symbols: {
    readonly success: "✔";
    readonly error: "✖";
    readonly warning: "⚠";
    readonly info: "ℹ";
    readonly section: "▶";
    readonly star: "★";
    readonly rocket: "🚀";
    readonly check: "✅";
};

declare function table(): void;

declare class Timer {
    private startTime;
    reset(): void;
    elapsed(): number;
}

declare function tree(title: string, items: string[]): void;

export { AVSSError, type AVSSPlugin, Audit, type AuditEntry, AuditEvent, type AuditOptions, type AuditUser, type CheckResult, Colors, Doctor, type Env, ErrorCode, type ErrorResponse, EventEmitter, type EventListener, type EventMap, type EventName, type FailedLoginEvent, type FooterOptions, ForbiddenError, InternalServerError, Logger, type LoginEvent, type LogoutEvent, type RegisterEvent, type RequestLog, SessionExpiredError, Spinner, Symbols, Timer, UnauthorizedError, ValidationError, type ValidationResult, audit, auditPlugin, banner, box, corsMiddleware, divider, doctor, endTimer, error, errorHandler, events, fail, footer, formatAudit, header, info, logRequest, logger, loggerPlugin, output, pass, prisma, progress, rotateLogs, section, showBanner, startTimer, success, table, tree, validate, validateEnv, validateOrThrow, warning };
