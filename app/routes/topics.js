const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt");
const { find, create, findById, update } = require("../controllers/topics");
const router = new Router({ prefix: "/topics" });

const auth = jwt({ secret });

router.get("/", find);

router.post("/", auth, create);

router.get("/:id", findById);

router.patch("/:id", auth, update);

module.exports = router;
