type LogContext = Record<string, unknown>;

function formatContext(context?: LogContext) {
  return context ? ` ${JSON.stringify(context)}` : "";
}

export const logger = {
  info(message: string, context?: LogContext) {
    console.info(`[l4rs0n] ${message}${formatContext(context)}`);
  },
  warn(message: string, context?: LogContext) {
    console.warn(`[l4rs0n] ${message}${formatContext(context)}`);
  },
  error(message: string, context?: LogContext) {
    console.error(`[l4rs0n] ${message}${formatContext(context)}`);
  },
};
