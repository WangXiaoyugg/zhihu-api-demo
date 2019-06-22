const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser")
const app = new Koa();
const router = new Router();
const userRouter = new Router({ prefix: "/users" });

let db = [{name: "李雷"}]

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
  ctx.body = db;
});

userRouter.post("/", auth, ctx => {
  db.push(ctx.request.body);
  console.log(db);
  ctx.body = ctx.request.body;
});

userRouter.get("/:id", auth, ctx => {
  let user = db[ctx.params.id * 1] 
  ctx.body = user;
});

userRouter.put("/:id", auth, ctx => {
    db[ctx.params.id * 1] = ctx.request.body;
    ctx.body = ctx.request.body;
});

userRouter.delete("/:id", auth, ctx => {
    db.splice(ctx.params.id * 1, 1);
    ctx.status = 204;
});

app.use(bodyParser());
app.use(router.routes());
app.use(userRouter.routes());
app.use(router.allowedMethods());

app.listen(8000, () => {
  console.log("server is start at localhost:8000");
});
