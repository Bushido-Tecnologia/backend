import Express from 'express'
import routes from './routes'

const app = Express()
const port = process.env.PORT || 3000

app.use(Express.json())
app.use(routes)

app.listen(port, () => {
    console.log('\n=====================')
    console.log('= Server is running =')
    console.log(`==== on port ${port} ===`)
    console.log('=====================\n')
    handleLogRoutes()
})

const handleLogRoutes = () => {
    console.log('\x1b[92mRoutes: \x1b[33m');
    console.log('tetse')
    routes.stack.forEach(x => {
        x.route.stack.forEach((route: any) => {
            console.log(`Path:\x1b[0m ${x.route.path};\x1b[0m\x1b[32m Method:\x1b[0m ${route.method.toUpperCase()}\x1b[33m;`)
        })
    })
}