import winston from 'winston';
const { transports, format, createLogger } = winston;
const { combine, printf } = format;

// Creo timeStamp 
const logTime = new Date().toLocaleDateString();
// Creo un log personalizado
const customLog = printf(({ level, message }) => {
    return `Nivel:[${ level }] LogTime: [${ logTime }] Mensaje:-[${ message }]`
})

const date = new Date();
const newdate = `${ date.getDate() }-${ date.getMonth() }-${ date.getFullYear() }`
const options = {
    info: {
        level: 'info',
        dirname: 'logs/combibned',
        json: true,
        handleExceptions: true,
        maxSize: '10',
        filename: `combined-${ newdate }.log`,
        datePattern: 'YYYY-MM-DD-HH',
    },
    error: {
        level: 'error',
        dirname: 'logs/error',
        json: true,
        handleExceptions: true,
        filename: `error-${ newdate }.log`,
    },
    console: {
        level: 'debug',
        json: false,
        handleExceptions: true,
        colorize: true,
    },
}

const logger = new createLogger({
    format: combine(customLog), transports: [
        new transports.File(options.info),
        new transports.File(options.error),
        new transports.Console(options.console)
    ], exitOnError: false
})

export default logger;