const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt")
const {
    find, findById, create, 
    update, deleteById, login,
    checkOwner,listFollowing, follow,
    unfollow, listFollowers
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
router.get("/:id/followers", listFollowers);

router.put("/following/:id", auth, follow);
router.delete("/following/:id", auth, unfollow);


module.exports = router;
