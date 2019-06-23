const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const {find, findById, create, update, deleteById, login} = require("../controllers/users")

let db = [{ name: "李雷" }];
router.get("/", find);

router.post("/", create);

router.get("/:id", findById);

router.patch("/:id", update);

router.delete("/:id", deleteById);

router.post("/login", login)

module.exports = router;
