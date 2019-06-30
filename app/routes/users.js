const Router = require("koa-router");
const jwt = require("koa-jwt");

const { secret } = require("../../config/jwt");
const {
  find,
  findById,
  create,
  update,
  deleteById,
  login,
  checkOwner,
  listFollowing,
  follow,
  unfollow,
  listFollowers,
  checkUserExist,
  unfollowTopic,
  followTopic,
  listFollowingTopics,
  listQuestions,
  listLikingAnswers,
  likeAnswer,
  unlikeAnswer,
  listDislikingAnswers,
  dislikeAnswer,
  unDislikeAnswer,
  listCollectingAnswers,
  collectAnswer,
  unCollectAnswer,
} = require("../controllers/users");
const router = new Router({ prefix: "/users" });

const { checkTopicExists } = require("../controllers/topics");
const { checkAnswerExists } = require("../controllers/answers");

const auth = jwt({ secret });

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

router.get("/:id/questions", listQuestions);

// 赞答案
router.get("/:id/likingAnswers", listLikingAnswers);
router.put("/:id/likingAnswers/:id", auth, checkAnswerExists, likeAnswer, unDislikeAnswer);
router.delete("/:id/likingAnswers/:id", auth, checkAnswerExists, unlikeAnswer);

// 踩答案
router.get("/:id/dislikingAnswers", listDislikingAnswers);
router.put("/:id/dislikingAnswers/:id", auth, checkAnswerExists, dislikeAnswer, unlikeAnswer);
router.delete("/:id/dislikingAnswers/:id", auth, checkAnswerExists, unDislikeAnswer);

// 答案收藏
router.get("/:id/collectingAnswers", listCollectingAnswers);
router.put("/:id/collectingAnswers/:id", auth, checkAnswerExists, collectAnswer);
router.delete("/:id/collectingAnswers/:id", auth, checkAnswerExists, unCollectAnswer);

module.exports = router;
