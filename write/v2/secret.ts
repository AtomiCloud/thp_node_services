import fs from "fs";
import {ILogger} from "./logger";
import {Exit} from "./util";


function LoadSecret(logger: ILogger, secretPath: string): string {
    try {
        
        logger.trace('loading secret from ', secretPath)
        const secret = fs.readFileSync(secretPath, 'utf8');
        logger.trace('secret loaded')
        return secret;
    } catch (e) {
        console.error(e);
        Exit(`Failed to load secret from '${secretPath}'`)
    }
}


export {LoadSecret}
