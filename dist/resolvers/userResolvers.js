"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = exports.pushIp = void 0;
const lodash_1 = require("lodash");
const findAuthor = (_, { id }) => {
    const author = (0, lodash_1.find)(authors, { id });
    const post = (0, lodash_1.filter)(posts, { authorId: id });
    return Object.assign(Object.assign({}, author), { posts: post });
};
let ip = '';
const pushIp = (_ip) => {
    ip = _ip;
};
exports.pushIp = pushIp;
exports.userResolvers = {
    Query: {
        posts: () => posts,
        author: findAuthor,
        ip: () => ip
    },
    Mutation: {
        createPost: (_, newPost) => {
            posts.push(newPost.post);
            let result = {
                success: true,
            };
            return result;
        },
    },
};
const authors = [
    { id: 1, firstName: "Tom", lastName: "Coleman" },
    { id: 2, firstName: "Sashko", lastName: "Stubailo" },
    { id: 3, firstName: "Mikhail", lastName: "Novikov" },
];
const posts = [
    { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
    { id: 2, authorId: 2, title: "Welcome to Meteor", votes: 3 },
    { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
    { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 },
    { id: 5, authorId: 1, title: "Launchpad is Cool", votes: 7 },
];
