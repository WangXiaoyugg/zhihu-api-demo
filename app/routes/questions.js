const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt");
const { 
    find, create, findById,
    update, deleteById,
    checkQuestionExists, checkQuestioner
} = require("../controllers/questions");
const router = new Router({ prefix: "/questions" });

const auth = jwt({ secret });

router.get("/", find);

router.post("/", auth, create);

router.get("/:id", checkQuestionExists, findById);

router.patch("/:id", auth, checkQuestionExists, checkQuestioner, update);
router.delete("/:id", auth, checkQuestionExists, checkQuestioner, deleteById);


module.exports = router;
