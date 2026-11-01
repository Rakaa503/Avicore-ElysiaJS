"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/security/index.ts
var security_exports = {};
__export(security_exports, {
  DEFAULT_CONTENT_TYPE: () => DEFAULT_CONTENT_TYPE,
  DEFAULT_CONTENT_TYPE_OPTIONS: () => DEFAULT_CONTENT_TYPE_OPTIONS,
  DEFAULT_COOKIE_NAME: () => DEFAULT_COOKIE_NAME,
  DEFAULT_CSRF_COOKIE: () => DEFAULT_CSRF_COOKIE,
  DEFAULT_CSRF_HEADER: () => DEFAULT_CSRF_HEADER,
  DEFAULT_FRAME_OPTIONS: () => DEFAULT_FRAME_OPTIONS,
  DEFAULT_PERMISSIONS_POLICY: () => DEFAULT_PERMISSIONS_POLICY,
  DEFAULT_RATE_LIMIT: () => DEFAULT_RATE_LIMIT,
  DEFAULT_RATE_WINDOW: () => DEFAULT_RATE_WINDOW,
  DEFAULT_REFERRER_POLICY: () => DEFAULT_REFERRER_POLICY,
  DEFAULT_SECURITY_HEADERS: () => DEFAULT_SECURITY_HEADERS,
  DEFAULT_TOKEN_LENGTH: () => DEFAULT_TOKEN_LENGTH,
  MemoryStore: () => MemoryStore,
  RateLimiter: () => RateLimiter,
  SECURITY_NAME: () => SECURITY_NAME,
  SECURITY_VERSION: () => SECURITY_VERSION,
  SecurityFramework: () => SecurityFramework,
  SecurityHeadersBuilder: () => SecurityHeadersBuilder,
  createCorsHeaders: () => createCorsHeaders,
  createSecurity: () => createSecurity,
  csrfMiddleware: () => csrfMiddleware,
  defaultCookieConfig: () => defaultCookieConfig,
  defaultCorsConfig: () => defaultCorsConfig,
  defaultCsrfConfig: () => defaultCsrfConfig,
  defaultHeaderConfig: () => defaultHeaderConfig,
  defaultProxyConfig: () => defaultProxyConfig,
  defaultRateLimitConfig: () => defaultRateLimitConfig,
  defaultXssConfig: () => defaultXssConfig,
  escapeHtml: () => escapeHtml,
  generateCsrfToken: () => generateCsrfToken,
  getProxyInfo: () => getProxyInfo,
  getSecurityConfig: () => getSecurityConfig,
  isTrustedProxy: () => isTrustedProxy,
  parseCookies: () => parseCookies,
  rateLimit: () => rateLimit,
  resetSecurityConfig: () => resetSecurityConfig,
  sanitize: () => sanitize,
  serializeCookie: () => serializeCookie,
  setSecurityConfig: () => setSecurityConfig,
  validateCsrfToken: () => validateCsrfToken
});
module.exports = __toCommonJS(security_exports);

// src/security/config.ts
var config = {};
function setSecurityConfig(value) {
  config = {
    ...config,
    ...value
  };
}
function getSecurityConfig() {
  return Object.freeze({
    ...config
  });
}
function resetSecurityConfig() {
  config = {};
}

// src/security/constants.ts
var SECURITY_NAME = "AVSS Security";
var SECURITY_VERSION = "1.0.0-alpha";
var DEFAULT_TOKEN_LENGTH = 64;
var DEFAULT_RATE_LIMIT = 100;
var DEFAULT_RATE_WINDOW = 6e4;
var DEFAULT_COOKIE_NAME = "avss.session";
var DEFAULT_CSRF_HEADER = "X-CSRF-Token";
var DEFAULT_CSRF_COOKIE = "avss.csrf";
var DEFAULT_CONTENT_TYPE = "application/json";
var DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
var DEFAULT_FRAME_OPTIONS = "DENY";
var DEFAULT_CONTENT_TYPE_OPTIONS = "nosniff";
var DEFAULT_PERMISSIONS_POLICY = "camera=(), microphone=(), geolocation=()";

// src/security/csrf/config.ts
var defaultCsrfConfig = {
  headerName: "x-csrf-token",
  tokenLength: 32,
  enabled: true
};

// src/security/csrf/token.ts
var import_node_crypto = require("crypto");
function generateCsrfToken(config2 = defaultCsrfConfig) {
  return (0, import_node_crypto.randomBytes)(config2.tokenLength).toString("hex");
}
function validateCsrfToken(token, expected) {
  return token.length > 0 && token === expected;
}

// src/security/csrf/middleware.ts
function csrfMiddleware(request, config2 = defaultCsrfConfig) {
  if (!config2.enabled) {
    return {
      success: true,
      message: "CSRF Disabled"
    };
  }
  const token = request.headers[config2.headerName];
  if (!token) {
    return {
      success: false,
      message: "Missing CSRF Token"
    };
  }
  if (token !== request.csrfToken) {
    return {
      success: false,
      message: "Invalid CSRF Token"
    };
  }
  return {
    success: true,
    message: "CSRF Verified"
  };
}

// src/security/xss/config.ts
var defaultXssConfig = {
  enabled: true,
  escapeHtml: true,
  trimInput: true
};

// src/security/xss/escape.ts
var HTML_ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function escapeHtml(value) {
  return value.replace(/[&<>"'/]/g, (character) => HTML_ESCAPE_MAP[character]);
}

// src/security/xss/sanitizer.ts
function sanitize(input, config2 = defaultXssConfig) {
  if (!config2.enabled) {
    return input;
  }
  let value = input;
  if (config2.trimInput) {
    value = value.trim();
  }
  if (config2.escapeHtml) {
    value = escapeHtml(value);
  }
  return value;
}

// src/security/headers/config.ts
var defaultHeaderConfig = {
  contentSecurityPolicy: true,
  strictTransportSecurity: true,
  frameOptions: true,
  contentTypeOptions: true,
  referrerPolicy: true,
  permissionsPolicy: true
};

// src/security/headers/defaults.ts
var DEFAULT_SECURITY_HEADERS = {
  "Content-Security-Policy": "default-src 'self'; object-src 'none'; frame-ancestors 'none';",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
};

// src/security/headers/builder.ts
var SecurityHeadersBuilder = class _SecurityHeadersBuilder {
  headers = /* @__PURE__ */ new Map();
  static create() {
    return new _SecurityHeadersBuilder();
  }
  withDefaults(config2 = defaultHeaderConfig) {
    if (config2.contentSecurityPolicy) {
      this.headers.set(
        "Content-Security-Policy",
        DEFAULT_SECURITY_HEADERS["Content-Security-Policy"]
      );
    }
    if (config2.strictTransportSecurity) {
      this.headers.set(
        "Strict-Transport-Security",
        DEFAULT_SECURITY_HEADERS["Strict-Transport-Security"]
      );
    }
    if (config2.frameOptions) {
      this.headers.set(
        "X-Frame-Options",
        DEFAULT_SECURITY_HEADERS["X-Frame-Options"]
      );
    }
    if (config2.contentTypeOptions) {
      this.headers.set(
        "X-Content-Type-Options",
        DEFAULT_SECURITY_HEADERS["X-Content-Type-Options"]
      );
    }
    if (config2.referrerPolicy) {
      this.headers.set(
        "Referrer-Policy",
        DEFAULT_SECURITY_HEADERS["Referrer-Policy"]
      );
    }
    if (config2.permissionsPolicy) {
      this.headers.set(
        "Permissions-Policy",
        DEFAULT_SECURITY_HEADERS["Permissions-Policy"]
      );
    }
    return this;
  }
  add(name, value) {
    this.headers.set(name, value);
    return this;
  }
  remove(name) {
    this.headers.delete(name);
    return this;
  }
  build() {
    return Object.freeze(
      Object.fromEntries(this.headers)
    );
  }
};

// src/security/cors/config.ts
var defaultCorsConfig = {
  enabled: true,
  origin: "*",
  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ],
  headers: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token"
  ],
  credentials: true,
  maxAge: 86400
};

// src/security/cors/middleware.ts
function createCorsHeaders(config2 = defaultCorsConfig) {
  if (!config2.enabled) {
    return {};
  }
  return Object.freeze({
    "Access-Control-Allow-Origin": Array.isArray(config2.origin) ? config2.origin.join(",") : config2.origin,
    "Access-Control-Allow-Methods": config2.methods.join(","),
    "Access-Control-Allow-Headers": config2.headers.join(","),
    "Access-Control-Allow-Credentials": String(config2.credentials),
    "Access-Control-Max-Age": String(config2.maxAge)
  });
}

// src/security/cookies/config.ts
var defaultCookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24
};

// src/security/cookies/parser.ts
function parseCookies(cookieHeader) {
  if (!cookieHeader.trim()) {
    return {};
  }
  return cookieHeader.split(";").reduce((cookies, cookie) => {
    const index = cookie.indexOf("=");
    if (index === -1) {
      return cookies;
    }
    const key = cookie.slice(0, index).trim();
    const value = cookie.slice(index + 1).trim();
    cookies[key] = decodeURIComponent(value);
    return cookies;
  }, {});
}
function serializeCookie(name, value, config2 = defaultCookieConfig) {
  const parts = [];
  parts.push(`${name}=${encodeURIComponent(value)}`);
  parts.push(`Path=${config2.path}`);
  parts.push(`Max-Age=${config2.maxAge}`);
  if (config2.httpOnly) {
    parts.push("HttpOnly");
  }
  if (config2.secure) {
    parts.push("Secure");
  }
  parts.push(`SameSite=${config2.sameSite}`);
  return parts.join("; ");
}

// src/security/proxy/config.ts
var defaultProxyConfig = {
  enabled: true,
  trustedProxies: [
    "127.0.0.1",
    "::1"
  ],
  trustForwardedHost: true,
  trustForwardedProto: true
};

// src/security/proxy/trusted.ts
function getProxyInfo(headers, config2 = defaultProxyConfig) {
  if (!config2.enabled) {
    return {
      clientIp: "127.0.0.1"
    };
  }
  const forwardedFor = headers["x-forwarded-for"]?.split(",")[0]?.trim() ?? "127.0.0.1";
  return {
    clientIp: forwardedFor,
    host: config2.trustForwardedHost ? headers["x-forwarded-host"] : void 0,
    protocol: config2.trustForwardedProto ? headers["x-forwarded-proto"] : void 0
  };
}
function isTrustedProxy(ip, config2 = defaultProxyConfig) {
  return config2.trustedProxies.includes(ip);
}

// src/security/rate-limit/config.ts
var defaultRateLimitConfig = {
  enabled: true,
  windowMs: 6e4,
  maxRequests: 100
};

// src/security/rate-limit/memory.ts
var MemoryStore = class {
  store = /* @__PURE__ */ new Map();
  get(key) {
    return this.store.get(key);
  }
  set(key, value) {
    this.store.set(key, value);
  }
  delete(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
  keys() {
    return [...this.store.keys()];
  }
  size() {
    return this.store.size;
  }
};
var RateLimiter = class {
  constructor(options) {
    this.options = options;
  }
  options;
  store = new MemoryStore();
  consume(key) {
    const now = Date.now();
    let entry = this.store.get(key);
    if (!entry || now >= entry.resetAt) {
      entry = {
        count: 0,
        resetAt: now + this.options.windowMs
      };
    }
    entry.count++;
    this.store.set(key, entry);
    return {
      allowed: entry.count <= this.options.limit,
      remaining: Math.max(
        0,
        this.options.limit - entry.count
      ),
      reset: entry.resetAt
    };
  }
  stats() {
    return {
      keys: this.store.size(),
      limit: this.options.limit,
      windowMs: this.options.windowMs
    };
  }
  keys() {
    return this.store.keys();
  }
  clear() {
    this.store.clear();
  }
};

// src/security/rate-limit/middleware.ts
var memoryStore = new MemoryStore();
function rateLimit(key, config2 = defaultRateLimitConfig) {
  if (!config2.enabled) {
    return {
      success: true,
      remaining: config2.maxRequests,
      retryAfter: 0
    };
  }
  const now = Date.now();
  let entry = memoryStore.get(key);
  if (!entry || now >= entry.resetAt) {
    entry = {
      count: 0,
      resetAt: now + config2.windowMs
    };
  }
  entry.count++;
  memoryStore.set(key, entry);
  const remaining = Math.max(
    config2.maxRequests - entry.count,
    0
  );
  if (entry.count > config2.maxRequests) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil(
        (entry.resetAt - now) / 1e3
      )
    };
  }
  return {
    success: true,
    remaining,
    retryAfter: 0
  };
}

// src/security/security.ts
var SecurityFramework = class {
  constructor(config2 = {}) {
    setSecurityConfig(config2);
  }
  csrf = {
    generateToken: generateCsrfToken,
    validateToken: validateCsrfToken,
    middleware: csrfMiddleware
  };
  xss = {
    sanitize
  };
  headers = {
    builder: () => SecurityHeadersBuilder.create().withDefaults()
  };
  cors = {
    createHeaders: createCorsHeaders
  };
  cookies = {
    parse: parseCookies,
    serialize: serializeCookie
  };
  proxy = {
    info: getProxyInfo,
    trusted: isTrustedProxy
  };
  rateLimit = {
    check: rateLimit
  };
};
function createSecurity(config2 = {}) {
  return new SecurityFramework(config2);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_CONTENT_TYPE,
  DEFAULT_CONTENT_TYPE_OPTIONS,
  DEFAULT_COOKIE_NAME,
  DEFAULT_CSRF_COOKIE,
  DEFAULT_CSRF_HEADER,
  DEFAULT_FRAME_OPTIONS,
  DEFAULT_PERMISSIONS_POLICY,
  DEFAULT_RATE_LIMIT,
  DEFAULT_RATE_WINDOW,
  DEFAULT_REFERRER_POLICY,
  DEFAULT_SECURITY_HEADERS,
  DEFAULT_TOKEN_LENGTH,
  MemoryStore,
  RateLimiter,
  SECURITY_NAME,
  SECURITY_VERSION,
  SecurityFramework,
  SecurityHeadersBuilder,
  createCorsHeaders,
  createSecurity,
  csrfMiddleware,
  defaultCookieConfig,
  defaultCorsConfig,
  defaultCsrfConfig,
  defaultHeaderConfig,
  defaultProxyConfig,
  defaultRateLimitConfig,
  defaultXssConfig,
  escapeHtml,
  generateCsrfToken,
  getProxyInfo,
  getSecurityConfig,
  isTrustedProxy,
  parseCookies,
  rateLimit,
  resetSecurityConfig,
  sanitize,
  serializeCookie,
  setSecurityConfig,
  validateCsrfToken
});
//# sourceMappingURL=security.cjs.map