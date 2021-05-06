import winston from 'winston';
import express from 'express'
import WinstonLogStash from 'winston3-logstash-transport';


const loggerOptions = {
    transports: [
        new winston.transports.Console(),
        new WinstonLogStash({
            mode: 'udp',
            host: process.env.LOGSTASH_HOST || 'logstash',
            port: 5000
        })
    ],

};

const logger = winston.createLogger(loggerOptions);

const app = express();

app.get('/',(req, res) => {
    logger.info('sample log');
    res.json({message:'OK'});
});

const port = process.env.WEBAPP_PORT || 8080;

app.listen(port,()=>{
    console.log(`server started.${port}`);
})


