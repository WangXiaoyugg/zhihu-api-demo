const jwt = require("jsonwebtoken");
const User = require("../models/users");
const {secret, options} = require('../../config/jwt')

class UserController {
    async checkOwner(ctx, next) {
        if(ctx.params.id !== ctx.state.user._id) {
            ctx.throw(403, 'user doesn"t have access right')
        }
        await next()
    }
    async find(ctx) {
        ctx.body = await User.find();
    }
    async findById(ctx) {
        const { fields } = ctx.query;
        const selectFields = fields.split(";").filter(f => f).map(f => " +" + f).join("");
        console.log("selectFields: ", selectFields);
        const user = await User.findById(ctx.params.id).select(selectFields);
        if(!user) {ctx.throw(404, "user not exist")}
        ctx.body = user;
    }
    async create(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            password: {type: "string", required: true},
        })
        const {name} = ctx.request.body;
        const repeatedUser = await User.findOne({name});
        if(repeatedUser) {ctx.throw(409, 'user has exsit')} 
        const user = await new User(ctx.request.body).save()
        ctx.body = user;
    }
    async update(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: false},
            password: {type: 'string', required: false},
            avatar_url: {type: 'string', required: false},
            gender: {type: "string", required: false},
            headline: {type: "string", required: false},
            locations: {type: "array", itemType: 'string', required: false},
            business:{type: "string", required: false},
            employments: {type: "array", itemType: 'object', required: false},
            educations: {type: "array", itemType: 'object', required: false},
        })
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        console.log("user: ", user);
        if(!user) {ctx.throw(404, 'user not exist')};
        ctx.body = user;
    }
    async deleteById(ctx) {
        const user  = await User.findByIdAndRemove(ctx.params.id);
        if(!user) {ctx.throw(404, 'user not exsit')}
        ctx.status = 204;
    }
    async login(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            password: {type: 'string', required: true},
        })
        const user = await User.findOne(ctx.request.body);
        if(!user) {ctx.throw(401, 'username or password is error')}
        let {name, _id} = user;
        const token = jwt.sign({name, _id}, secret, options);
        ctx.body = {token};
    } 
}

module.exports = new UserController()