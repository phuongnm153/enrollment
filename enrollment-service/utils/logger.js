const winston = require('winston')

const logger =  winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.colorize(),
        winston.format.printf((log) => {
            if (log.stack)
                return `{"level": "${log.level}", "msg": "${log.message} - error ${log.stack}", "time": "${new Date(log.timestamp).toISOString()}"}`;
            return `{"level": "${log.level}", "msg":"${log.message}", "time": "${new Date(log.timestamp).toISOString()}"}`;
        })
    ),
    defaultMeta: { service: 'user-service' },
})


if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
} else {
    // some thing logic add to log on production mode
    logger.add(new winston.transports.Console());
    //logger.add(new winston.transports.File({ filename: '/storage/logs/error.log', level: 'error' }))
    //logger.add(new winston.transports.File({ filename: '/storage/logs/combined.log' }))
}

module.exports = logger