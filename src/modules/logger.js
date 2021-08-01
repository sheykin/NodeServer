const winston = require('winston')
const MAX_FILESIZE = 5242880 //5mb

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'default-service' },
  transports: [

    new winston.transports.File({
      filename: process.cwd() + '/logs/error.log',
      level: 'error',
      maxSize: MAX_FILESIZE
    }),
    new winston.transports.File({
      filename: process.cwd() + '/logs/info.log',
      maxSize: MAX_FILESIZE
    }),
  ],
});

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

module.exports = logger
