const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const error = require("koa-json-error");
const parameter = require("koa-parameter")
const registerRouter = require("./app/routes");
const app = new Koa();


app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest},
}));
app.use(bodyParser());
app.use(parameter(app));
registerRouter(app);


app.listen(8000, () => {
  console.log("server is start at localhost:8000");
});
