const Koa = require("koa")
const app = new Koa()

app.use((ctx) => {
    ctx.body = "Hello World!"
})

app.listen(8000,() => {
    console.log("server is start at localhost:8000")
})