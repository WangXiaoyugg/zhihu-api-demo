const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt")
const {
    find, findById, create, 
    update, deleteById, login,
    checkOwner,listFollowing, follow,
    unfollow, listFollowers, checkUserExist,
    unfollowTopic, followTopic,
    listFollowingTopics,
} = require("../controllers/users")
const router = new Router({ prefix: "/users" });

const { checkTopicExists } = require("../controllers/topics")

const auth = jwt({secret});

router.get("/", find);

router.post("/", create);

router.get("/:id", findById);

router.patch("/:id", auth, checkOwner, update);

router.delete("/:id", auth, checkOwner, deleteById);

router.post("/login", login);

router.get("/:id/following", listFollowing);
router.get("/:id/followers", listFollowers);

router.get("/:id/followingTopics", listFollowingTopics);

router.put("/following/:id", auth, checkUserExist, follow);
router.delete("/following/:id", auth, checkUserExist, unfollow);

router.put("/followingTopics/:id", auth, checkTopicExists, followTopic);
router.delete("/followingTopics/:id", auth, checkTopicExists, unfollowTopic);

module.exports = router;
