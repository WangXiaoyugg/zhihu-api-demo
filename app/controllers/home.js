class HomeController {
    index(ctx) {
        ctx.body = "<h1>首页</h1>";
    }
}

module.exports = new HomeController();