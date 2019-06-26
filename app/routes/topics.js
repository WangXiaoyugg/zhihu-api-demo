const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt");
const { find, create, findById, update, checkTopicExists, listTopicFollowers } = require("../controllers/topics");
const router = new Router({ prefix: "/topics" });

const auth = jwt({ secret });

router.get("/", find);

router.post("/", auth, create);

router.get("/:id", checkTopicExists, findById);

router.patch("/:id", auth, checkTopicExists, update);

router.get("/:id/followers", auth, checkTopicExists, listTopicFollowers);

module.exports = router;
