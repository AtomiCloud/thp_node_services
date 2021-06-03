import {DynamicConfig} from "./dynamic_config";
import {StaticConfig} from "./static_config";
import {Express} from "express";
import * as fs from "fs";


function StartServices(app: Express, _: number,
                       __: StaticConfig,
                       dyn: DynamicConfig) {
    
    let cache: { [s: string]: string } = {};
    dyn.logger.trace('loading data');
    try {
        const data = fs.readFileSync('./data/data.json', 'utf8')
        cache = JSON.parse(data);
    } catch {
    
    }
    
    dyn.logger.trace('data loaded');
    
    dyn.logger.trace('registering GET `/write/:key/:val` endpoint');
    app.get('/write/:key/:val', (req, res) => {
        const logger = dyn.logger;
        logger.info('hit `/write/:key/:val`');
        const key = req.params.key;
        const val = req.params.val;
        logger.info('key', key, 'val', val);
        cache[key] = val;
        const data = JSON.stringify(cache);
        fs.writeFileSync('./data/data.json', data, 'utf8');
        res.send('write success')
        
    })
    dyn.logger.trace('GET `/write/:key/:val` endpoint registered');
    
    
    dyn.logger.trace('registering GET `/read/:key/` endpoint');
    app.get('/read/:key', (req, res) => {
        const logger = dyn.logger;
        
        logger.info('hit `/read/:key/`');
        const key = req.params.key;
        res.send(cache[key])
        
    })
    dyn.logger.trace('GET `/read/:key/` endpoint registered');
}

export {StartServices}
