let db = [{ name: "李雷" }];

class UserController {
    find(ctx) {
        ctx.body = db;
    }
    findById(ctx) {
        let user = db[ctx.params.id * 1];
        ctx.body = user;
    }
    create(ctx) {
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    update(ctx) {
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    deleteById(ctx) {
        db.splice(ctx.params.id * 1, 1);
        ctx.status = 204;
    }
}

module.exports = new UserController()