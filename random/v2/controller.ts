import "colors"
import {DynamicConfig} from "./dynamic_config";
import {StaticConfig} from "./static_config";
import {Express} from "express";
import {generateSlug} from "random-word-slugs";
import {Exit} from "./util";

function GetRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}


function StartServices(app: Express, _: number,
                       __: StaticConfig,
                       dyn: DynamicConfig) {
    
    dyn.logger.trace('registering GET `/random` endpoint');
    app.get('/random', (_, res) => {
        const logger = dyn.logger
        logger.info('');
        logger.info('hit `/random`');
        
        const rs = dyn.cfg.random_settings;
        
        logger.trace(`generating random int between ${rs.int.start.toString().red} and ${rs.int.end.toString().red}`);
        const int = GetRandomInt(rs.int.start, rs.int.end);
        logger.trace(`random int generated: ${int.toString().red}`);
        
        logger.trace(`generating random float between ${rs.float.start.toString().red} and ${rs.float.end.toString().red}`);
        const float = GetRandomFloat(rs.float.start, rs.float.end);
        logger.trace(`random float generated: ${float.toString().red}`);
        
        logger.trace(`generating random word slug containing ${rs.word.number.toString().red} word in ${rs.word.format.red} format`);
        const word = generateSlug(rs.word.number, {format: rs.word.format});
        logger.trace(`random word slug generated: ${word.red}`);
        
        res.send({
            int,
            float,
            word,
        });
        logger.info('');
    })
    dyn.logger.trace('GET `/random` endpoint registered');
    
    dyn.logger.trace('registering GET `/error` endpoint');
    app.get('/error', (_, res) => {
        const logger = dyn.logger
        logger.info('');
        logger.info('hit `/error`');
        
        res.send('<h1>Failed spectacularly</h1>')
        
        logger.info('');
        Exit(`Manually triggered error`)
    })
    dyn.logger.trace('GET `/error` endpoint registered');
    
}

export {StartServices}
