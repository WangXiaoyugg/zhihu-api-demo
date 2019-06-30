const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt");
const { 
    find, create, findById,
    update, deleteById,
    checkCommentExists, checkCommentator
} = require("../controllers/comments");
const router = new Router({ prefix: "/questions/:questionId/answers/:answerId/comments" });

const auth = jwt({ secret });

router.get("/", find);

router.post("/", auth, create);

router.get("/:id", checkCommentExists, findById);

router.patch("/:id", auth, checkCommentExists, checkCommentator, update);
router.delete("/:id", auth, checkCommentExists, checkCommentator, deleteById);


module.exports = router;
