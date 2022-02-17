import { filter, find } from "lodash";

const findAuthor = (_: unknown, { id }: { id: number }) => {
    const author = find(authors, { id });
    const post = filter(posts, { authorId: id })
    return {
        ...author,
        posts: post,
    }
}

let ip = '';

export const pushIp = (_ip: string) => {
    ip = _ip;
}

export const userResolvers = {
    Query: {
        posts: () => posts,
        author: findAuthor,
        ip: () => ip
    },
    Mutation: {
        createPost: (_: any, newPost: { post: { id: number; authorId: number; title: string; votes: number; }; }) => {
            posts.push(newPost.post)
            let result = {
                success: true,
            }
            return result
        },
    },
}

const authors = [
    { id: 1, firstName: "Tom", lastName: "Coleman" },
    { id: 2, firstName: "Sashko", lastName: "Stubailo" },
    { id: 3, firstName: "Mikhail", lastName: "Novikov" },
]
const posts = [
    { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
    { id: 2, authorId: 2, title: "Welcome to Meteor", votes: 3 },
    { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
    { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 },
    { id: 5, authorId: 1, title: "Launchpad is Cool", votes: 7 },
]