const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouter = require("./app/routes");
const app = new Koa();

app.use(bodyParser());
registerRouter(app);

app.listen(8000, () => {
  console.log("server is start at localhost:8000");
});
