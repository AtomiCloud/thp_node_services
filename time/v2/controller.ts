import moment from 'moment';
import 'moment-timezone';
import {DynamicConfig} from "./dynamic_config";
import {StaticConfig} from "./static_config";
import {Express} from "express";
import {Exit} from "./util";


function StartServices(app: Express, _: number,
                       __: StaticConfig,
                       dyn: DynamicConfig) {
    
    dyn.logger.trace('registering GET `/now/:timezone` endpoint');
    app.get('/now/:timezone', (req, res) => {
        const logger = dyn.logger;
        logger.info('hit `/now/:timezone`');
        
        
        const format = (req.query.format as string | null) ?? dyn.cfg.format;
        logger.trace(`format used: ${format}`);
        
        const timezone = req.params.timezone;
        logger.trace('obtained timezone', timezone);
        
        logger.trace('obtaining current time...')
        const now = moment().tz(timezone);
        logger.trace('obtained now time', now);
        
        const nowFormatted = now.format(format);
        const nowUTC = now.utc().format(format);
        
        res.send({
            now: nowFormatted,
            utc: nowUTC,
            timezone: timezone,
        });
    })
    dyn.logger.trace('GET `/now/:timezone` endpoint registered');
    
    dyn.logger.trace('registering GET `/error` endpoint');
    app.get('/error', (_, res) => {
        const logger = dyn.logger;
        logger.info('hit `/error`');
        
       res.send("<h1> Failed spectacularly </h1>");
       Exit('Force fail triggered manually');
    })
    dyn.logger.trace('GET /error endpoint registered');
    
}

export {StartServices}
