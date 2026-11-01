"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AVSSError: () => AVSSError,
  Audit: () => Audit,
  AuditEvent: () => AuditEvent,
  Colors: () => Colors,
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
  Doctor: () => Doctor,
  ErrorCode: () => ErrorCode,
  EventEmitter: () => EventEmitter,
  ForbiddenError: () => ForbiddenError,
  InternalServerError: () => InternalServerError,
  Logger: () => Logger,
  MemoryStore: () => MemoryStore,
  RateLimiter: () => RateLimiter,
  SECURITY_NAME: () => SECURITY_NAME,
  SECURITY_VERSION: () => SECURITY_VERSION,
  SecurityFramework: () => SecurityFramework,
  SecurityHeadersBuilder: () => SecurityHeadersBuilder,
  SessionExpiredError: () => SessionExpiredError,
  Spinner: () => Spinner,
  Symbols: () => Symbols,
  Timer: () => Timer,
  UnauthorizedError: () => UnauthorizedError,
  ValidationError: () => ValidationError,
  audit: () => audit,
  auditPlugin: () => auditPlugin,
  banner: () => banner,
  box: () => box,
  corsMiddleware: () => corsMiddleware,
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
  divider: () => divider,
  doctor: () => doctor,
  endTimer: () => endTimer,
  error: () => error,
  errorHandler: () => errorHandler,
  escapeHtml: () => escapeHtml,
  events: () => events,
  fail: () => fail,
  footer: () => footer,
  formatAudit: () => formatAudit,
  generateCsrfToken: () => generateCsrfToken,
  getProxyInfo: () => getProxyInfo,
  getSecurityConfig: () => getSecurityConfig,
  header: () => header,
  info: () => info,
  isTrustedProxy: () => isTrustedProxy,
  logRequest: () => logRequest,
  logger: () => logger,
  loggerPlugin: () => loggerPlugin,
  output: () => output,
  parseCookies: () => parseCookies,
  pass: () => pass,
  prisma: () => prisma,
  progress: () => progress,
  rateLimit: () => rateLimit,
  resetSecurityConfig: () => resetSecurityConfig,
  rotateLogs: () => rotateLogs,
  sanitize: () => sanitize,
  section: () => section,
  serializeCookie: () => serializeCookie,
  setSecurityConfig: () => setSecurityConfig,
  showBanner: () => showBanner,
  startTimer: () => startTimer,
  success: () => success,
  table: () => table,
  tree: () => tree,
  validate: () => validate,
  validateCsrfToken: () => validateCsrfToken,
  validateEnv: () => validateEnv,
  validateOrThrow: () => validateOrThrow,
  warning: () => warning
});
module.exports = __toCommonJS(src_exports);

// src/cors/cors.ts
var import_cors = __toESM(require("cors"), 1);
var corsMiddleware = (0, import_cors.default)({
  origin: true,
  credentials: true
});

// src/env/env.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum([
    "development",
    "production",
    "test"
  ]).default("development"),
  DATABASE_URL: import_zod.z.string().min(1),
  BETTER_AUTH_SECRET: import_zod.z.string().min(32, "BETTER_AUTH_SECRET minimal 32 karakter"),
  BETTER_AUTH_URL: import_zod.z.string().url("BETTER_AUTH_URL harus berupa URL yang valid")
});
function validateEnv() {
  return envSchema.parse(process.env);
}

// src/prisma/prisma.ts
var import_client = require("@prisma/client");
var prisma = global.prisma ?? new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// src/validation/validation.ts
function validate(schema, input) {
  const result = schema.safeParse(input);
  if (result.success) {
    return {
      success: true,
      data: result.data
    };
  }
  return {
    success: false,
    errors: result.error.issues.map(
      (issue) => issue.message
    )
  };
}
function validateOrThrow(schema, input) {
  return schema.parse(input);
}

// src/audit/events.ts
var AuditEvent = /* @__PURE__ */ ((AuditEvent2) => {
  AuditEvent2["LOGIN"] = "LOGIN";
  AuditEvent2["LOGOUT"] = "LOGOUT";
  AuditEvent2["REGISTER"] = "REGISTER";
  AuditEvent2["FAILED_LOGIN"] = "FAILED_LOGIN";
  AuditEvent2["CHANGE_PASSWORD"] = "CHANGE_PASSWORD";
  AuditEvent2["CHANGE_ROLE"] = "CHANGE_ROLE";
  AuditEvent2["CREATE_USER"] = "CREATE_USER";
  AuditEvent2["UPDATE_USER"] = "UPDATE_USER";
  AuditEvent2["DELETE_USER"] = "DELETE_USER";
  AuditEvent2["VERIFY_EMAIL"] = "VERIFY_EMAIL";
  AuditEvent2["RESET_PASSWORD"] = "RESET_PASSWORD";
  return AuditEvent2;
})(AuditEvent || {});

// src/audit/formatter.ts
function formatAudit(entry) {
  const lines = [];
  lines.push("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  lines.push(`\u{1F4CB} ${entry.event}`);
  lines.push("");
  if (entry.user) {
    lines.push(`\u{1F464} User  : ${entry.user.name}`);
    lines.push(`\u{1F194} ID    : ${entry.user.id}`);
    if (entry.user.email) {
      lines.push(`\u{1F4E7} Email : ${entry.user.email}`);
    }
    if (entry.user.role) {
      lines.push(`\u{1F6E1}\uFE0F Role  : ${entry.user.role}`);
    }
  }
  if (entry.ip) {
    lines.push(`\u{1F310} IP    : ${entry.ip}`);
  }
  if (entry.userAgent) {
    lines.push(`\u{1F4BB} Agent : ${entry.userAgent}`);
  }
  if (entry.message) {
    lines.push(`\u{1F4DD} Note  : ${entry.message}`);
  }
  lines.push(
    `\u{1F552} Time  : ${entry.timestamp.toLocaleString()}`
  );
  lines.push("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  return lines.join("\n");
}

// src/audit/audit.ts
var Audit = class {
  log(entry) {
    console.log(formatAudit(entry));
  }
  login(user) {
    this.log({
      event: "LOGIN" /* LOGIN */,
      user,
      message: "Login Success",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  logout(user) {
    this.log({
      event: "LOGOUT" /* LOGOUT */,
      user,
      message: "Logout Success",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  register(user) {
    this.log({
      event: "REGISTER" /* REGISTER */,
      user,
      message: "Account Registered",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  failedLogin(email) {
    this.log({
      event: "FAILED_LOGIN" /* FAILED_LOGIN */,
      message: `Failed Login (${email})`,
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  changePassword(user) {
    this.log({
      event: "CHANGE_PASSWORD" /* CHANGE_PASSWORD */,
      user,
      message: "Password Changed",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  changeRole(user, oldRole, newRole) {
    this.log({
      event: "CHANGE_ROLE" /* CHANGE_ROLE */,
      user,
      message: `${oldRole} \u279C ${newRole}`,
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  createUser(user) {
    this.log({
      event: "CREATE_USER" /* CREATE_USER */,
      user,
      message: "User Created",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  updateUser(user) {
    this.log({
      event: "UPDATE_USER" /* UPDATE_USER */,
      user,
      message: "User Updated",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  deleteUser(user) {
    this.log({
      event: "DELETE_USER" /* DELETE_USER */,
      user,
      message: "User Deleted",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  verifyEmail(user) {
    this.log({
      event: "VERIFY_EMAIL" /* VERIFY_EMAIL */,
      user,
      message: "Email Verified",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  resetPassword(user) {
    this.log({
      event: "RESET_PASSWORD" /* RESET_PASSWORD */,
      user,
      message: "Password Reset",
      timestamp: /* @__PURE__ */ new Date()
    });
  }
};
var audit = new Audit();

// src/doctor/doctor.ts
var Doctor = class {
  results = [];
  check(name, success2) {
    this.results.push({
      name,
      success: success2
    });
  }
  render() {
    console.clear();
    console.log("\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557");
    console.log("\u2551                  AVSS HEALTH CHECK                 \u2551");
    console.log("\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563");
    for (const item of this.results) {
      const status = item.success ? "\u{1F7E2} PASS" : "\u{1F534} FAIL";
      console.log(
        `\u2551 ${item.name.padEnd(18)} ${status.padEnd(31)}\u2551`
      );
    }
    console.log("\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563");
    const passed = this.results.filter((r) => r.success).length;
    const failed = this.results.length - passed;
    console.log(
      `\u2551 PASS : ${String(passed).padEnd(42)}\u2551`
    );
    console.log(
      `\u2551 FAIL : ${String(failed).padEnd(42)}\u2551`
    );
    console.log(
      `\u2551 STATUS : ${(failed === 0 ? "ALL TEST PASSED \u{1F389}" : "FAILED \u274C").padEnd(35)}\u2551`
    );
    console.log("\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D");
  }
};
var doctor = new Doctor();

// src/errors/base.ts
var AVSSError = class extends Error {
  status;
  code;
  timestamp;
  constructor(message, status, code) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.timestamp = /* @__PURE__ */ new Date();
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      timestamp: this.timestamp.toISOString()
    };
  }
};

// src/errors/codes.ts
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["UNAUTHORIZED"] = "UNAUTHORIZED";
  ErrorCode2["FORBIDDEN"] = "FORBIDDEN";
  ErrorCode2["VALIDATION_ERROR"] = "VALIDATION_ERROR";
  ErrorCode2["SESSION_EXPIRED"] = "SESSION_EXPIRED";
  ErrorCode2["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
  return ErrorCode2;
})(ErrorCode || {});

// src/errors/unauthorized.ts
var UnauthorizedError = class extends AVSSError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED" /* UNAUTHORIZED */);
  }
};

// src/errors/forbidden.ts
var ForbiddenError = class extends AVSSError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN" /* FORBIDDEN */);
  }
};

// src/errors/validation.ts
var ValidationError = class extends AVSSError {
  constructor(message = "Validation Failed") {
    super(message, 400, "VALIDATION_ERROR" /* VALIDATION_ERROR */);
  }
};

// src/errors/session-expired.ts
var SessionExpiredError = class extends AVSSError {
  constructor(message = "Session Expired") {
    super(message, 401, "SESSION_EXPIRED" /* SESSION_EXPIRED */);
  }
};

// src/errors/internal.ts
var InternalServerError = class extends AVSSError {
  constructor(message = "Internal Server Error") {
    super(message, 500, "INTERNAL_SERVER_ERROR" /* INTERNAL_SERVER_ERROR */);
  }
};

// src/errors/handler.ts
function errorHandler(error2) {
  if (error2 instanceof AVSSError) {
    return {
      success: false,
      error: {
        name: error2.name,
        message: error2.message,
        status: error2.status,
        code: error2.code,
        timestamp: error2.timestamp.toISOString()
      }
    };
  }
  return {
    success: false,
    error: {
      name: "InternalServerError",
      message: "Internal Server Error",
      status: 500,
      code: "INTERNAL_SERVER_ERROR",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
}

// src/events/emitter.ts
var EventEmitter = class {
  listeners = /* @__PURE__ */ new Map();
  on(event, listener) {
    const current = this.listeners.get(event) ?? [];
    current.push(listener);
    this.listeners.set(event, current);
  }
  off(event, listener) {
    const current = this.listeners.get(event);
    if (!current) return;
    this.listeners.set(
      event,
      current.filter(
        (l) => l !== listener
      )
    );
  }
  emit(event, payload) {
    const current = this.listeners.get(event);
    if (!current) return;
    current.forEach((listener) => {
      listener(payload);
    });
  }
  clear() {
    this.listeners.clear();
  }
  listenerCount(event) {
    return this.listeners.get(event)?.length ?? 0;
  }
};
var events = new EventEmitter();

// src/logger/colors.ts
var RESET = "\x1B[0m";
var COLORS = {
  INFO: "\x1B[36m",
  SUCCESS: "\x1B[32m",
  WARN: "\x1B[33m",
  ERROR: "\x1B[31m",
  DEBUG: "\x1B[35m",
  SECURITY: "\x1B[91m",
  DATABASE: "\x1B[34m",
  ACCESS: "\x1B[96m",
  FATAL: "\x1B[41m\x1B[37m"
};
var EMOJI = {
  INFO: "\u2139\uFE0F",
  SUCCESS: "\u2705",
  WARN: "\u26A0\uFE0F",
  ERROR: "\u274C",
  DEBUG: "\u{1F41E}",
  SECURITY: "\u{1F6E1}\uFE0F",
  DATABASE: "\u{1F5C4}\uFE0F",
  ACCESS: "\u{1F310}",
  FATAL: "\u{1F480}"
};

// src/logger/config.ts
var loggerConfig = {
  console: true,
  file: true,
  timestamp: true,
  emoji: true
};

// src/logger/formatter.ts
function getTimestamp() {
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
function formatLog(entry) {
  const color = COLORS[entry.level];
  const emoji = loggerConfig.emoji ? `${EMOJI[entry.level]} ` : "";
  const time = loggerConfig.timestamp ? `[${entry.timestamp}] ` : "";
  return `${time}${color}${emoji}${entry.level.padEnd(9)}${RESET} ${entry.message}`;
}

// src/logger/console.ts
function printConsole(entry) {
  if (!loggerConfig.console) {
    return;
  }
  console.log(formatLog(entry));
}

// src/logger/writer.ts
var import_fs2 = __toESM(require("fs"), 1);

// src/logger/file.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);

// src/logger/constants.ts
var LOG_FOLDER = "logs";
var LOG_FILES = {
  APP: "app.log",
  ERROR: "error.log",
  SECURITY: "security.log",
  DATABASE: "database.log",
  ACCESS: "access.log",
  DEBUG: "debug.log",
  FATAL: "fatal.log"
};

// src/logger/file.ts
var FileManager = class {
  logDir;
  constructor() {
    this.logDir = import_path.default.join(process.cwd(), LOG_FOLDER);
    this.initialize();
  }
  initialize() {
    if (!import_fs.default.existsSync(this.logDir)) {
      import_fs.default.mkdirSync(this.logDir, { recursive: true });
    }
    Object.values(LOG_FILES).forEach((file) => {
      const filePath = import_path.default.join(this.logDir, file);
      if (!import_fs.default.existsSync(filePath)) {
        import_fs.default.writeFileSync(filePath, "");
      }
    });
  }
  getFilePath(fileName) {
    return import_path.default.join(this.logDir, fileName);
  }
};
var fileManager = new FileManager();

// src/logger/writer.ts
var LogWriter = class {
  write(entry) {
    const appLog = fileManager.getFilePath(LOG_FILES.APP);
    import_fs2.default.appendFileSync(
      appLog,
      `[${entry.timestamp}] ${entry.level} ${entry.message}
`
    );
    switch (entry.level) {
      case "ERROR":
        import_fs2.default.appendFileSync(
          fileManager.getFilePath(LOG_FILES.ERROR),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "SECURITY":
        import_fs2.default.appendFileSync(
          fileManager.getFilePath(LOG_FILES.SECURITY),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "DATABASE":
        import_fs2.default.appendFileSync(
          fileManager.getFilePath(LOG_FILES.DATABASE),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "ACCESS":
        import_fs2.default.appendFileSync(
          fileManager.getFilePath(LOG_FILES.ACCESS),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "DEBUG":
        import_fs2.default.appendFileSync(
          fileManager.getFilePath(LOG_FILES.DEBUG),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "FATAL":
        import_fs2.default.appendFileSync(
          fileManager.getFilePath(LOG_FILES.FATAL),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
    }
  }
};
var logWriter = new LogWriter();

// src/logger/logger.ts
var Logger = class {
  log(level, message) {
    const entry = {
      level,
      message,
      timestamp: getTimestamp()
    };
    printConsole(entry);
    if (loggerConfig.file) {
      logWriter.write(entry);
    }
  }
  info(message) {
    this.log("INFO", message);
  }
  success(message) {
    this.log("SUCCESS", message);
  }
  warn(message) {
    this.log("WARN", message);
  }
  error(message) {
    this.log("ERROR", message);
  }
  debug(message) {
    this.log("DEBUG", message);
  }
  security(message) {
    this.log("SECURITY", message);
  }
  database(message) {
    this.log("DATABASE", message);
  }
  access(message) {
    this.log("ACCESS", message);
  }
  fatal(message) {
    this.log("FATAL", message);
  }
};
var logger = new Logger();

// src/logger/timer.ts
var timers = /* @__PURE__ */ new Map();
function startTimer(name) {
  timers.set(name, Date.now());
}
function endTimer(name) {
  const start = timers.get(name);
  if (!start) {
    console.log(`Timer "${name}" not found.`);
    return;
  }
  const duration = Date.now() - start;
  console.log(`\u23F1 ${name} finished in ${duration} ms`);
  timers.delete(name);
}

// src/logger/request.ts
function logRequest(req) {
  logger.access(
    `${req.method} ${req.url} | ${req.status} | ${req.ip ?? "-"}`
  );
}

// src/logger/banner.ts
function showBanner() {
  console.log("");
  console.log("==============================================");
  console.log("           AVSS LOGGER v1.0");
  console.log("==============================================");
  console.log("");
}

// src/logger/rotation.ts
var import_fs3 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
function rotateLogs() {
  const folder = import_path2.default.join(process.cwd(), LOG_FOLDER);
  if (!import_fs3.default.existsSync(folder)) {
    return;
  }
  console.log("\u{1F4E6} Log rotation checked.");
}

// src/plugins/logger.ts
function loggerPlugin() {
  return {
    name: "Logger",
    setup() {
      console.log("\u{1F4DD} Logger Plugin Loaded");
    }
  };
}

// src/plugins/audit.ts
function auditPlugin() {
  return {
    name: "Audit",
    setup() {
      console.log("\u{1F4CB} Audit Plugin Loaded");
    }
  };
}

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

// src/terminal/banner.ts
function banner() {
  console.log("AVSS Lite");
}

// src/terminal/box.ts
function box(title, width = 54) {
  const line = "\u2550".repeat(width);
  console.log(`\u2554${line}\u2557`);
  console.log(
    `\u2551${title.padStart((width + title.length) / 2).padEnd(width)}\u2551`
  );
  console.log(`\u255A${line}\u255D`);
}

// src/terminal/colors.ts
var Colors = {
  reset: "\x1B[0m"
};

// src/terminal/divider.ts
function divider(char = "\u2500", length = 54) {
  console.log(char.repeat(length));
}

// src/terminal/symbols.ts
var Symbols = {
  success: "\u2714",
  error: "\u2716",
  warning: "\u26A0",
  info: "\u2139",
  section: "\u25B6",
  star: "\u2605",
  rocket: "\u{1F680}",
  check: "\u2705"
};

// src/terminal/status.ts
function success(message) {
  console.log(`   ${Symbols.success} ${message}`);
}
function error(message) {
  console.log(`   ${Symbols.error} ${message}`);
}
function warning(message) {
  console.log(`   ${Symbols.warning} ${message}`);
}
function info(message) {
  console.log(`   ${Symbols.info} ${message}`);
}
function pass(message) {
  success(message);
}
function fail(message) {
  error(message);
}

// src/terminal/footer.ts
function footer({
  framework,
  version,
  runtime = process.version,
  status = "SUCCESS"
}) {
  divider();
  info(`Framework : ${framework}`);
  info(`Version   : ${version}`);
  info(`Runtime   : ${runtime}`);
  info(`Status    : ${status}`);
  divider();
  console.log("\n\u{1F680} READY FOR PRODUCTION\n");
}

// src/terminal/header.ts
function header(title) {
  console.log(title);
}

// src/terminal/output.ts
var output = {
  success,
  error,
  warning,
  info
};

// src/terminal/progress.ts
function progress(current = 1, total = 1, width = 30) {
  const percent = Math.round(current / total * 100);
  const filled = Math.round(percent / 100 * width);
  const empty = width - filled;
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(empty);
  console.log(`[${bar}] ${percent}%`);
}

// src/terminal/section.ts
function section(title) {
  console.log(`
\u25B6 ${title}
`);
}

// src/terminal/spinner.ts
var import_ora = __toESM(require("ora"), 1);
var Spinner = class {
  spinner;
  constructor(text = "Loading...") {
    this.spinner = (0, import_ora.default)(text);
  }
  start() {
    this.spinner.start();
  }
  success(text) {
    this.spinner.succeed(text);
  }
  fail(text) {
    this.spinner.fail(text);
  }
  warn(text) {
    this.spinner.warn(text);
  }
  info(text) {
    this.spinner.info(text);
  }
  stop() {
    this.spinner.stop();
  }
};

// src/terminal/table.ts
function table() {
  console.table([]);
}

// src/terminal/timer.ts
var Timer = class {
  startTime = Date.now();
  reset() {
    this.startTime = Date.now();
  }
  elapsed() {
    return Date.now() - this.startTime;
  }
};

// src/terminal/tree.ts
function tree(title, items) {
  console.log(`
${title}
`);
  items.forEach((item, index) => {
    const last = index === items.length - 1;
    console.log(
      `${last ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500"} ${item}`
    );
  });
  console.log();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AVSSError,
  Audit,
  AuditEvent,
  Colors,
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
  Doctor,
  ErrorCode,
  EventEmitter,
  ForbiddenError,
  InternalServerError,
  Logger,
  MemoryStore,
  RateLimiter,
  SECURITY_NAME,
  SECURITY_VERSION,
  SecurityFramework,
  SecurityHeadersBuilder,
  SessionExpiredError,
  Spinner,
  Symbols,
  Timer,
  UnauthorizedError,
  ValidationError,
  audit,
  auditPlugin,
  banner,
  box,
  corsMiddleware,
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
  divider,
  doctor,
  endTimer,
  error,
  errorHandler,
  escapeHtml,
  events,
  fail,
  footer,
  formatAudit,
  generateCsrfToken,
  getProxyInfo,
  getSecurityConfig,
  header,
  info,
  isTrustedProxy,
  logRequest,
  logger,
  loggerPlugin,
  output,
  parseCookies,
  pass,
  prisma,
  progress,
  rateLimit,
  resetSecurityConfig,
  rotateLogs,
  sanitize,
  section,
  serializeCookie,
  setSecurityConfig,
  showBanner,
  startTimer,
  success,
  table,
  tree,
  validate,
  validateCsrfToken,
  validateEnv,
  validateOrThrow,
  warning
});
//# sourceMappingURL=index.cjs.map