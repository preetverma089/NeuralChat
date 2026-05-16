/**
 * Simple colored console logger.
 * Avoids adding a heavy logging library for this project size.
 */
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

const timestamp = () =>
  new Date().toLocaleTimeString("en-US", { hour12: false });

const logger = {
  info: (msg) =>
    console.log(`${colors.cyan}[INFO]${colors.reset} ${colors.gray}${timestamp()}${colors.reset} ${msg}`),

  success: (msg) =>
    console.log(`${colors.green}[OK]  ${colors.reset} ${colors.gray}${timestamp()}${colors.reset} ${msg}`),

  warn: (msg) =>
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${colors.gray}${timestamp()}${colors.reset} ${msg}`),

  error: (msg) =>
    console.error(`${colors.red}[ERR] ${colors.reset} ${colors.gray}${timestamp()}${colors.reset} ${msg}`),
};

export default logger;
