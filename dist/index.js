import {
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
} from "./chunk-4YCHK2EZ.js";

// src/cors/cors.ts
import cors from "cors";
var corsMiddleware = cors({
  origin: true,
  credentials: true
});

// src/env/env.ts
import "dotenv/config";
import { z } from "zod";
var envSchema = z.object({
  NODE_ENV: z.enum([
    "development",
    "production",
    "test"
  ]).default("development"),
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET minimal 32 karakter"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL harus berupa URL yang valid")
});
function validateEnv() {
  return envSchema.parse(process.env);
}

// src/prisma/prisma.ts
import { PrismaClient } from "@prisma/client";
var prisma = global.prisma ?? new PrismaClient();
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
import fs2 from "fs";

// src/logger/file.ts
import fs from "fs";
import path from "path";

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
    this.logDir = path.join(process.cwd(), LOG_FOLDER);
    this.initialize();
  }
  initialize() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    Object.values(LOG_FILES).forEach((file) => {
      const filePath = path.join(this.logDir, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "");
      }
    });
  }
  getFilePath(fileName) {
    return path.join(this.logDir, fileName);
  }
};
var fileManager = new FileManager();

// src/logger/writer.ts
var LogWriter = class {
  write(entry) {
    const appLog = fileManager.getFilePath(LOG_FILES.APP);
    fs2.appendFileSync(
      appLog,
      `[${entry.timestamp}] ${entry.level} ${entry.message}
`
    );
    switch (entry.level) {
      case "ERROR":
        fs2.appendFileSync(
          fileManager.getFilePath(LOG_FILES.ERROR),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "SECURITY":
        fs2.appendFileSync(
          fileManager.getFilePath(LOG_FILES.SECURITY),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "DATABASE":
        fs2.appendFileSync(
          fileManager.getFilePath(LOG_FILES.DATABASE),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "ACCESS":
        fs2.appendFileSync(
          fileManager.getFilePath(LOG_FILES.ACCESS),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "DEBUG":
        fs2.appendFileSync(
          fileManager.getFilePath(LOG_FILES.DEBUG),
          `[${entry.timestamp}] ${entry.message}
`
        );
        break;
      case "FATAL":
        fs2.appendFileSync(
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
import fs3 from "fs";
import path2 from "path";
function rotateLogs() {
  const folder = path2.join(process.cwd(), LOG_FOLDER);
  if (!fs3.existsSync(folder)) {
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
import ora from "ora";
var Spinner = class {
  spinner;
  constructor(text = "Loading...") {
    this.spinner = ora(text);
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
export {
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
};
//# sourceMappingURL=index.js.map