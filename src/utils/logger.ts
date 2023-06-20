import { Router } from "express";

class Logger {
    private handler(message: string, type: enLogs) {
        const logFlag = logFlags[type]
        const dateConfig: Intl.DateTimeFormatOptions = { hour:'2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit'}
        const date = new Date().toLocaleDateString('pt-br', dateConfig)

        return console.log(`${date} ~ ${logFlag} » ${message}`)
    }

    public alert = (message: any) => this.handler(message, enLogs.alert)

    public sucess = (message: any) => this.handler(message, enLogs.sucess)

    public info = (message: any) => this.handler(message, enLogs.info)

    public error = (message: any) => this.handler(message, enLogs.error)
}

export const handleLogRoutes = (routes: Router) => {
    console.log('\x1b[92mRoutes: \x1b[33m');
    
    routes.stack.forEach(x => {
        x.route.stack.forEach((route: any) => {
            console.log(`Path:\x1b[0m ${x.route.path};\x1b[0m\x1b[32m Method:\x1b[0m ${route.method.toUpperCase()}\x1b[33m;`)
        })
    })
}

export const logger = new Logger()

enum enLogs {
    alert = 'alert',
    error = 'error',
    info = 'info',
    sucess = 'sucess'
}

const logFlags: Record<enLogs, string> = {
    alert: '\x1b[93m[ Alert ]\x1b[0m',
    error: '\x1b[31m[ Error ]\x1b[0m',
    sucess: '\x1b[32m[ Sucess ]\x1b[0m',
    info: '\x1b[36m[ Info ]\x1b[0m',
}