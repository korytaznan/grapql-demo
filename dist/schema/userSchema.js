"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userSchema = (0, apollo_server_express_1.gql) `
    type Author {
        id: Int!
        firstName: String
        lastName: String
        posts: [Post]
    }
    type Post {
        id: Int!
        title: String
        authorId: ID!
        votes: Int
    }
    input PostData {
        id: Int!
        title: String
        authorId: ID!
        votes: Int
    }
    type Response {
        success: Boolean
    }
    type Query {
        posts: [Post]
        author(id: Int!): Author
        ip: String
    }
    type Mutation {
        createPost(post: PostData): Response
    }
`;
