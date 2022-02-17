import { gql } from 'apollo-server-express';

export const userSchema = gql`
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
`