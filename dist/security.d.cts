interface CsrfConfig {
    /**
     * Header yang digunakan untuk mengirim CSRF token.
     */
    headerName: string;
    /**
     * Panjang token yang dihasilkan.
     */
    tokenLength: number;
    /**
     * Mengaktifkan validasi CSRF.
     */
    enabled: boolean;
}
declare const defaultCsrfConfig: Readonly<CsrfConfig>;

declare function generateCsrfToken(config?: CsrfConfig): string;
declare function validateCsrfToken(token: string, expected: string): boolean;

interface CsrfRequest {
    headers: Record<string, string | undefined>;
    csrfToken: string;
}
interface CsrfResult {
    success: boolean;
    message: string;
}
declare function csrfMiddleware(request: CsrfRequest, config?: CsrfConfig): CsrfResult;

interface XssConfig {
    enabled: boolean;
    escapeHtml: boolean;
    trimInput: boolean;
}
declare const defaultXssConfig: Readonly<XssConfig>;

declare function escapeHtml(value: string): string;

declare function sanitize(input: string, config?: XssConfig): string;

interface HeaderConfig {
    contentSecurityPolicy: boolean;
    strictTransportSecurity: boolean;
    frameOptions: boolean;
    contentTypeOptions: boolean;
    referrerPolicy: boolean;
    permissionsPolicy: boolean;
}
declare const defaultHeaderConfig: Readonly<HeaderConfig>;

declare class SecurityHeadersBuilder {
    private readonly headers;
    static create(): SecurityHeadersBuilder;
    withDefaults(config?: HeaderConfig): SecurityHeadersBuilder;
    add(name: string, value: string): SecurityHeadersBuilder;
    remove(name: string): SecurityHeadersBuilder;
    build(): Readonly<Record<string, string>>;
}

declare const DEFAULT_SECURITY_HEADERS: {
    readonly "Content-Security-Policy": "default-src 'self'; object-src 'none'; frame-ancestors 'none';";
    readonly "Strict-Transport-Security": "max-age=31536000; includeSubDomains";
    readonly "X-Frame-Options": "DENY";
    readonly "X-Content-Type-Options": "nosniff";
    readonly "Referrer-Policy": "strict-origin-when-cross-origin";
    readonly "Permissions-Policy": "camera=(), microphone=(), geolocation=()";
};

interface CorsConfig {
    enabled: boolean;
    origin: string | string[];
    methods: string[];
    headers: string[];
    credentials: boolean;
    maxAge: number;
}
declare const defaultCorsConfig: Readonly<CorsConfig>;

interface CorsHeaders {
    [key: string]: string;
}
declare function createCorsHeaders(config?: CorsConfig): Readonly<CorsHeaders>;

interface CookieConfig {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
    path: string;
    maxAge: number;
}
declare const defaultCookieConfig: Readonly<CookieConfig>;

type CookieMap = Record<string, string>;
declare function parseCookies(cookieHeader: string): CookieMap;
declare function serializeCookie(name: string, value: string, config?: CookieConfig): string;

interface ProxyConfig {
    enabled: boolean;
    trustedProxies: string[];
    trustForwardedHost: boolean;
    trustForwardedProto: boolean;
}
declare const defaultProxyConfig: Readonly<ProxyConfig>;

interface ProxyHeaders {
    "x-forwarded-for"?: string;
    "x-forwarded-host"?: string;
    "x-forwarded-proto"?: string;
}
interface ProxyInfo {
    clientIp: string;
    host?: string;
    protocol?: string;
}
declare function getProxyInfo(headers: ProxyHeaders, config?: ProxyConfig): ProxyInfo;
declare function isTrustedProxy(ip: string, config?: ProxyConfig): boolean;

interface RateLimitConfig {
    enabled: boolean;
    windowMs: number;
    maxRequests: number;
}
declare const defaultRateLimitConfig: Readonly<RateLimitConfig>;

interface RateLimitEntry {
    count: number;
    resetAt: number;
}
interface RateLimiterOptions {
    limit: number;
    windowMs: number;
}
interface RateLimitResult$1 {
    allowed: boolean;
    remaining: number;
    reset: number;
}
declare class MemoryStore {
    private readonly store;
    get(key: string): RateLimitEntry | undefined;
    set(key: string, value: RateLimitEntry): void;
    delete(key: string): void;
    clear(): void;
    keys(): string[];
    size(): number;
}
declare class RateLimiter {
    private readonly options;
    private readonly store;
    constructor(options: RateLimiterOptions);
    consume(key: string): RateLimitResult$1;
    stats(): {
        keys: number;
        limit: number;
        windowMs: number;
    };
    keys(): string[];
    clear(): void;
}

interface RateLimitResult {
    success: boolean;
    remaining: number;
    retryAfter: number;
}
declare function rateLimit(key: string, config?: RateLimitConfig): RateLimitResult;

interface SecurityConfig {
    csrf?: Partial<CsrfConfig>;
    xss?: Partial<XssConfig>;
    headers?: Partial<HeaderConfig>;
    cors?: Partial<CorsConfig>;
    cookies?: Partial<CookieConfig>;
    proxy?: Partial<ProxyConfig>;
    rateLimit?: Partial<RateLimitConfig>;
}
interface SecurityModule {
    readonly name: string;
    readonly version: string;
}
interface SecurityResult {
    success: boolean;
    message: string;
}
interface ClientInfo {
    ip: string;
    host?: string;
    protocol?: string;
}
interface SecurityHeaders {
    [key: string]: string;
}

declare function setSecurityConfig(value: SecurityConfig): void;
declare function getSecurityConfig(): Readonly<SecurityConfig>;
declare function resetSecurityConfig(): void;

/**
 * AVSS Lite Security Framework
 */
declare const SECURITY_NAME = "AVSS Security";
declare const SECURITY_VERSION = "1.0.0-alpha";
declare const DEFAULT_TOKEN_LENGTH = 64;
declare const DEFAULT_RATE_LIMIT = 100;
declare const DEFAULT_RATE_WINDOW = 60000;
declare const DEFAULT_COOKIE_NAME = "avss.session";
declare const DEFAULT_CSRF_HEADER = "X-CSRF-Token";
declare const DEFAULT_CSRF_COOKIE = "avss.csrf";
declare const DEFAULT_CONTENT_TYPE = "application/json";
declare const DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
declare const DEFAULT_FRAME_OPTIONS = "DENY";
declare const DEFAULT_CONTENT_TYPE_OPTIONS = "nosniff";
declare const DEFAULT_PERMISSIONS_POLICY = "camera=(), microphone=(), geolocation=()";

declare class SecurityFramework {
    constructor(config?: SecurityConfig);
    readonly csrf: {
        generateToken: typeof generateCsrfToken;
        validateToken: typeof validateCsrfToken;
        middleware: typeof csrfMiddleware;
    };
    readonly xss: {
        sanitize: typeof sanitize;
    };
    readonly headers: {
        builder: () => SecurityHeadersBuilder;
    };
    readonly cors: {
        createHeaders: typeof createCorsHeaders;
    };
    readonly cookies: {
        parse: typeof parseCookies;
        serialize: typeof serializeCookie;
    };
    readonly proxy: {
        info: typeof getProxyInfo;
        trusted: typeof isTrustedProxy;
    };
    readonly rateLimit: {
        check: typeof rateLimit;
    };
}
declare function createSecurity(config?: SecurityConfig): SecurityFramework;

export { type ClientInfo, type CookieConfig, type CookieMap, type CorsConfig, type CorsHeaders, type CsrfConfig, type CsrfRequest, type CsrfResult, DEFAULT_CONTENT_TYPE, DEFAULT_CONTENT_TYPE_OPTIONS, DEFAULT_COOKIE_NAME, DEFAULT_CSRF_COOKIE, DEFAULT_CSRF_HEADER, DEFAULT_FRAME_OPTIONS, DEFAULT_PERMISSIONS_POLICY, DEFAULT_RATE_LIMIT, DEFAULT_RATE_WINDOW, DEFAULT_REFERRER_POLICY, DEFAULT_SECURITY_HEADERS, DEFAULT_TOKEN_LENGTH, type HeaderConfig, MemoryStore, type ProxyConfig, type ProxyHeaders, type ProxyInfo, type RateLimitConfig, type RateLimitEntry, type RateLimitResult$1 as RateLimitResult, RateLimiter, type RateLimiterOptions, SECURITY_NAME, SECURITY_VERSION, type SecurityConfig, SecurityFramework, type SecurityHeaders, SecurityHeadersBuilder, type SecurityModule, type SecurityResult, type XssConfig, createCorsHeaders, createSecurity, csrfMiddleware, defaultCookieConfig, defaultCorsConfig, defaultCsrfConfig, defaultHeaderConfig, defaultProxyConfig, defaultRateLimitConfig, defaultXssConfig, escapeHtml, generateCsrfToken, getProxyInfo, getSecurityConfig, isTrustedProxy, parseCookies, rateLimit, resetSecurityConfig, sanitize, serializeCookie, setSecurityConfig, validateCsrfToken };
