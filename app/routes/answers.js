const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt");
const { 
    find, create, findById,
    update, deleteById,
    checkAnswerExists, checkAnswerer,
} = require("../controllers/answers");
const router = new Router({ prefix: "/questions/:questionId/answers" });

const auth = jwt({ secret });

router.get("/", find);

router.post("/", auth, create);

router.get("/:id", checkAnswerExists, findById);

router.patch("/:id", auth, checkAnswerExists, checkAnswerer, update);
router.delete("/:id", auth, checkAnswerExists, checkAnswerer, deleteById);


module.exports = router;
