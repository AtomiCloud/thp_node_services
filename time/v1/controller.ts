import moment from 'moment';
import 'moment-timezone';
import {DynamicConfig} from "./dynamic_config";
import {StaticConfig} from "./static_config";
import {ILogger} from "./logger";
import {Express} from "express";


function StartServices(app: Express, logger: ILogger, _: number,
                       __: StaticConfig,
                       {cfg}: DynamicConfig) {
    
    logger.trace('GET `/:timezone` endpoint registered');
    app.get('/:timezone', (req, res) => {
        logger.info('hit `/:timezone`');
        const format = cfg.format;
        const timezone = req.params.timezone;
        
        logger.trace('obtained timezone', timezone);
        
        logger.trace('obtaining current time...')
        const now = moment().tz(timezone);
        logger.trace('obtained now time', now);
        
        const nowFormatted = now.format(format);
        res.send({
            now: nowFormatted,
        });
    })
    logger.trace('GET `/:timezone` endpoint registered');
}

export {StartServices}
