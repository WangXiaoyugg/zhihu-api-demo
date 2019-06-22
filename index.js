const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const userRouter = new Router({ prefix: "/users" });

const auth = async(ctx, next) => {
  if(ctx.url.indexOf('users') < 0) {
    ctx.throw()
  }  
  await next();
};

router.get("/", ctx => {
  ctx.body = "首页";
});

userRouter.get("/", auth, ctx => {
  ctx.body = [{name: '李雷'}]
});

userRouter.post("/", auth, ctx => {
  ctx.body = {name: '韩梅梅'}
});

userRouter.get("/:id", auth, ctx => {
  ctx.body = {name: '李雷'}
});

userRouter.put("/:id", auth, ctx => {
    ctx.body = {name: '李雷2'}
});

userRouter.delete("/:id", auth, ctx => {
    ctx.status = 204;
});


app.use(router.routes());
app.use(userRouter.routes());
app.use(router.allowedMethods());

app.listen(8000, () => {
  console.log("server is start at localhost:8000");
});
