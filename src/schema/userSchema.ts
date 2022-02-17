import { gql } from 'apollo-server-express';

export const userSchema = gql`
    type User {
        id: Int!
        userName: String
        userProfile: UserProfile
    }
    type UserProfile {
        id: Int!
        userId: ID!
        firstName: String
        lastName: String
        email: String
        posts: [Post]
    }
    type Post {
        id: Int!
        title: String
        userId: ID!
        votes: Int
    }
    input PostData {
        id: Int!
        title: String
        userId: ID!
        votes: Int
    }
    type Response {
        success: Boolean
        message: String
    }
    type Query {
        users: [User],
        userProfile(userId: Int!): UserProfile
        posts: [Post]
        postByUserId(userId: Int!): [Post]
        ip: String
        
    }
    type Mutation {
        createPost(post: PostData): Response
    }
`