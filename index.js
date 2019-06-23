const Koa = require("koa");
const koaBody = require("koa-body");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const koaStatic = require("koa-static");
const mongoose = require("mongoose");

const path = require("path");
const { mongo } = require("./config/db");
const registerRouter = require("./app/routes");
const app = new Koa();

mongoose.connect(
  mongo.url,
  { useNewUrlParser: true, useFindAndModify: false },
  () => {
    console.log("MongoDB connect success!");
  }
);
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

app.use(koaStatic(path.join(__dirname, "app/public")));

app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
  })
);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "app/public/uploads"),
      keepExtensions: true
    }
  })
);
app.use(parameter(app));
registerRouter(app);

app.listen(8000, () => {
  console.log("server is start at localhost:8000");
});

//
