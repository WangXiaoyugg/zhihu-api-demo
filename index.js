const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const mongoose = require("mongoose")

const {mongo} = require('./config/db')
const registerRouter = require("./app/routes");
const app = new Koa();

mongoose.connect(mongo.url, {useNewUrlParser: true}, () => {console.log("MongoDB connect success!")});
mongoose.connection.on("error", console.error.bind(console, 'connection error:'));

app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest},
}));
app.use(bodyParser());
app.use(parameter(app));
registerRouter(app);


app.listen(8000, () => {
  console.log("server is start at localhost:8000");
});

// 
