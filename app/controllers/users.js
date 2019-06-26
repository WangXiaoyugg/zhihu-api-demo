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
        const {per_page = 10} = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1
        const perPage = Math.max(per_page * 1, 1)
        ctx.body = await User
            .find({name: new RegExp(ctx.query.q)})
            .limit(perPage).skip(page * perPage)
    }
    async findById(ctx) {
        const { fields = ''} = ctx.query;
        const selectFields = fields.split(";").filter(f => f).map(f => " +" + f).join("");
        const populateStr = fields.split(";").filter(f => f).map(f => {
            if(f === 'employments') {
                return 'employments.company employments.job'
            }
            if (f === 'education') {
                return 'education.school education.major'
            }
            return f
        }).join(" ")
        const user = await User
            .findById(ctx.params.id).select(selectFields)
            .populate(populateStr);
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
    async listFollowing(ctx) {
        const user = await User.findById(ctx.params.id).select("+following").populate("following");
        if(!user) {ctx.throw(404, 'user not exsits')};
        ctx.body = user.following;
    }
    async listFollowingTopics(ctx) {
        const user = await User.findById(ctx.params.id).select("+followingTopics").populate("followingTopics");
        if(!user) {ctx.throw(404, 'user not exsits')};
        ctx.body = user.followingTopics;
    }
    async listFollowers(ctx) {
        const users = await User.find({following: ctx.params.id});
        ctx.body = users;
    }
    async checkUserExist(ctx, next) {
        const user = await User.findById(ctx.params.id);
        if(!user) {ctx.throw(404, 'user not exsits')}
        await next()
    }
    async follow(ctx) {
        const me = await User.findById(ctx.state.user._id).select("+following");
        if(!me.following.map(id => id.toString()).includes(ctx.params.id)) {
            me.following.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
    }   
    async unfollow(ctx) {
        const me = await User.findById(ctx.state.user._id).select("+following");
        const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
        if(index > - 1) {
            me.following.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }
    async followTopic(ctx) {
        const me = await User.findById(ctx.state.user._id).select("+followingTopics");
        if(!me.followingTopics.map(id => id.toString()).includes(ctx.params.id)) {
            me.followingTopics.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
    }   
    async unfollowTopic(ctx) {
        const me = await User.findById(ctx.state.user._id).select("+followingTopics");
        const index = me.followingTopics.map(id => id.toString()).indexOf(ctx.params.id);
        if(index > - 1) {
            me.followingTopics.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }    
}

module.exports = new UserController()