const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt")
const {
    find, findById, create, 
    update, deleteById, login,
    checkOwner,listFollowing, follow
} = require("../controllers/users")
const router = new Router({ prefix: "/users" });

const auth = jwt({secret});

router.get("/", find);

router.post("/", create);

router.get("/:id", findById);

router.patch("/:id", auth, checkOwner, update);

router.delete("/:id", auth, checkOwner, deleteById);

router.post("/login", login);

router.get("/:id/following", listFollowing);

router.put("/following/:id", auth, follow);

module.exports = router;
