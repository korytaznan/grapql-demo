import { filter, find } from "lodash";
import { users, userProfile, posts } from "../data/data";

let ip = '';

export const pushIp = (_ip: string) => {
    ip = _ip;
}

const listUser = () => {
    return users.map((element) => {
        const { id, username } = element;
        const _userProfile = find(userProfile, { userId: id })
        const post = filter(posts, { userId: id });
        return {
            id,
            username,
            userProfile: {
                ..._userProfile,
                posts: post,
            }
        }
    })
}

const findUserProfile = (_: unknown, { userId }: { userId: number }) => {
    const _userProfile = find(userProfile, { userId });
    const post = filter(posts, { userId });
    return {
        ..._userProfile,
        posts: post,
    }
}

const getPostByUserId = (_: unknown, { userId }: { userId: number }) => {
    return filter(posts, { userId });
}

export const userResolvers = {
    Query: {
        users: listUser,
        userProfile: findUserProfile,
        posts: () => posts,
        postByUserId: getPostByUserId,
        ip: () => ip,
    },
    Mutation: {
        createPost: (_: any, newPost: { post: { id: number; userId: number; title: string; votes: number; }; }) => {
            posts.push(newPost.post)
            let result = {
                success: true,
                message: 'Ok',
            }
            return result
        },
    },
}
