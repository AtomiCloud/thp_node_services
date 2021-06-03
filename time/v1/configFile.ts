import {Exit} from "./util";
import * as fs from "fs";
import yaml from 'yaml';

interface ConfigFile {
    logs: string
    secret_key_path: string
    format: string
}


function LoadConfigFile(configPath: string): ConfigFile {
    console.log('loading configuration file')
    let config;
    try {
        config = fs.readFileSync(configPath, 'utf8');
    } catch (e) {
        console.error(e);
        Exit(`failed to read configPath ${configPath}`)
    }
    console.log('succeeded loading configuration file. Parsing config file...')
    let cfg: ConfigFile;
    try {
        cfg = yaml.parse(config) as ConfigFile;
        console.log('succeeded parsing configuration file.')
    } catch (e) {
        console.error(e);
        Exit(`Failed to unmarshal configuration file`)
    }
    return cfg;
}

export {LoadConfigFile, ConfigFile}
