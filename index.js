const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const userRouter = new Router({ prefix: "/users" });

const auth = async ctx => {
  if (ctx.url !== "/users") {
    ctx.throw();
  }
  await next();
};

router.get("/", ctx => {
  ctx.body = "首页";
});

userRouter.get("/", auth, ctx => {
  ctx.body = "用户列表页";
});

userRouter.post("/", auth, ctx => {
  ctx.body = "创建用户";
});

userRouter.get("/:id", auth, ctx => {
  ctx.body = `用户的id是 ${ctx.params.id}`;
});

app.use(router.routes());
app.use(userRouter.routes());
app.use(router.allowedMethods());

app.listen(8000, () => {
  console.log("server is start at localhost:8000");
});
