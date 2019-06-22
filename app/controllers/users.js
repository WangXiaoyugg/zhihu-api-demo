let db = [{ name: "李雷" }];

class UserController {
    find(ctx) {
        ctx.body = db;
    }
    findById(ctx) {
        if(ctx.params.id * 1 >= db.length) {
            ctx.throw(412)
        }
        ctx.body = db[ctx.params.id * 1];
    }
    create(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true}
        })
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    update(ctx) {
        if(ctx.params.id * 1 >= db.length) {
            ctx.throw(412)
        }
        ctx.verifyParams({
            name: {type: 'string', required: true}
        })
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    deleteById(ctx) {
        if(ctx.params.id * 1 >= db.length) {
            ctx.throw(412)
        }
        db.splice(ctx.params.id * 1, 1);
        ctx.status = 204;
    }
}

module.exports = new UserController()