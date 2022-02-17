"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = exports.pushIp = void 0;
const lodash_1 = require("lodash");
const data_1 = require("../data/data");
let ip = '';
const pushIp = (_ip) => {
    ip = _ip;
};
exports.pushIp = pushIp;
const listUser = () => {
    return data_1.users.map((element) => {
        const { id, username } = element;
        const _userProfile = (0, lodash_1.find)(data_1.userProfile, { userId: id });
        const post = (0, lodash_1.filter)(data_1.posts, { userId: id });
        return {
            id,
            username,
            userProfile: Object.assign(Object.assign({}, _userProfile), { posts: post })
        };
    });
};
const findUserProfile = (_, { userId }) => {
    const _userProfile = (0, lodash_1.find)(data_1.userProfile, { userId });
    const post = (0, lodash_1.filter)(data_1.posts, { userId });
    return Object.assign(Object.assign({}, _userProfile), { posts: post });
};
const getPostByUserId = (_, { userId }) => {
    return (0, lodash_1.filter)(data_1.posts, { userId });
};
exports.userResolvers = {
    Query: {
        users: listUser,
        userProfile: findUserProfile,
        posts: () => data_1.posts,
        postByUserId: getPostByUserId,
        ip: () => ip,
    },
    Mutation: {
        createPost: (_, newPost) => {
            data_1.posts.push(newPost.post);
            let result = {
                success: true,
                message: 'Ok',
            };
            return result;
        },
    },
};
