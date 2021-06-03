import "colors";

interface ILogger {
    trace(...info: any[]): void;
    
    info(...info: any[]): void;
    
    error(...info: any[]): void;
}

class Logger implements ILogger {
    
    private readonly logLevel: number;
    private readonly service: string;
    private readonly version: string;
    
    
    error(...info: any[]): void {
        console.error(this.service.cyan, this.version.green, ...info);
    }
    
    info(...info: any[]): void {
        if (this.logLevel < 2) console.info(this.service.cyan, this.version.green, ...info)
    }
    
    trace(...info: any[]): void {
        if (this.logLevel == 0) console.log(this.service.cyan, this.version.green, ...info);
    }
    
    constructor(logLevel: number, service: string, version: string) {
        this.logLevel = logLevel;
        this.service = service;
        this.version = version;
    }
    
}

export {ILogger, Logger}
