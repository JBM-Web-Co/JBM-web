const logger = console;

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

type LogObject = {
    level: LogLevel;
    message: string;
    context?: string;
    data?: Record<string, unknown>;
};

function get_context_from_stack(): string | undefined {
    const stack = new Error().stack;
    if (!stack) return;

    const lines = stack.split('\n');
    // Find the first line that's not from this logger file
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        if (!line.includes('logger.ts')) {
            // Extract filename and function
            const file_match = line.match(
                /([^\\\\/]+\.(ts|tsx|js|jsx))(\?.*)?:(\d+)/
            );
            const func_match = line.match(/at ([\w.]+)/);

            if (file_match) {
                const filename = file_match[1];
                const func_name = func_match ? func_match[1] : 'anonymous';
                return `${filename} > ${func_name}`;
            }
        }
    }
}

function make_log_object(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>
) {
    const context = get_context_from_stack();
    const log_object: LogObject = {
        level,
        message,
    };
    if (context) {
        log_object.context = context;
    }
    if (data) {
        log_object.data = data;
    }

    return log_object;
}

export function debug(message: string, data?: Record<string, unknown>) {
    logger.debug(make_log_object('DEBUG', message, data));
}

export function info(message: string, data?: Record<string, unknown>) {
    logger.info(make_log_object('INFO', message, data));
}

export function warn(message: string, data?: Record<string, unknown>) {
    logger.warn(make_log_object('WARN', message, data));
}

export function error(message: string, data?: Record<string, unknown>) {
    logger.error(make_log_object('ERROR', message, data));
}
