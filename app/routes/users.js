const Router = require("koa-router");
const jwt = require("jsonwebtoken");

const { secret } = require("../../config/jwt")
const {
    find, findById, create, 
    update, deleteById, login,
    checkOwner,
} = require("../controllers/users")
const router = new Router({ prefix: "/users" });

const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header;
    const token = authorization.replace("Bearer ", '');
    
    try {
        const user = jwt.verify(token, secret);
        ctx.state.user = user;
    } catch (err) {
        ctx.throw(401, err.message);
    }

    await next();
}

router.get("/", find);

router.post("/", create);

router.get("/:id", findById);

router.patch("/:id", auth, checkOwner, update);

router.delete("/:id", auth, checkOwner, deleteById);

router.post("/login", login)

module.exports = router;
