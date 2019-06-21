const Koa = require("koa")
const app = new Koa()

app.use((ctx, next) => {
    console.log(1)
    next()
    ctx.body = "Hello World!"
    console.log(2)
})

app.use((ctx, next) => {
    console.log(3);
    next()
    console.log(4)
})
app.use((ctx, next) => {
    console.log(5);
})

app.listen(8000,() => {
    console.log("server is start at localhost:8000")
})