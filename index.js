const Koa = require("koa")
const app = new Koa()

app.use((ctx) => {
    if(ctx.url === '/') {
        ctx.body = "这是首页"
    } else if(ctx.url === '/users') {
        if(ctx.method === "GET") {
            ctx.body = "这是用户列表页"
        } else if(ctx.method === "POST") {
            ctx.body = "创建用户"
        } else {
            ctx.status = 405
        }
    } else if (ctx.url.match(/\/users\/(\w+)/) && ctx.method === "GET") {
        let userId = ctx.url.match(/\/users\/(\w+)/)[1];
        ctx.body = `用户id是 ${userId}`
    } 
    
    else {
        ctx.status = 404
    }
})

app.listen(8000,() => {
    console.log("server is start at localhost:8000")
})