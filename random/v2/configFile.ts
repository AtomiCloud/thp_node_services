import {Exit} from "./util";
import * as fs from "fs";
import yaml from 'yaml';


interface ConfigFile {
    logs: string
    secret_key_path: string
    random_settings: {
        int: { start: number, end: number },
        float: { start: number, end: number },
        word: {
            number: number,
            format: "kebab" | "camel" | "sentence" | "lower" | "title",
        }
    }
}

const formats = ["kebab", "camel", "sentence", "lower", "title"]

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
    if (cfg.random_settings.word.number < 1) Exit(`Random word settings' number has to be larger than zero: ${cfg.random_settings.word.number}`)
    if (!formats.includes(cfg.random_settings.word.format)) Exit(`Random word settings' format is unknown: ${cfg.random_settings.word.format}`);
    
    return cfg;
}

export {LoadConfigFile, ConfigFile}
