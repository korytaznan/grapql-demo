"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = exports.userProfile = exports.users = void 0;
const users = [
    { id: 1, username: 'user1', password: '123' },
    { id: 2, username: 'user2', password: '123' },
    { id: 3, username: 'user3', password: '123' },
    { id: 4, username: 'user4', password: '123' },
    { id: 5, username: 'user5', password: '123' },
];
exports.users = users;
const userProfile = [
    { id: 1, userId: 1, firstName: "firstName1", lastName: "lastName1", email: 'name1@gmail.com' },
    { id: 2, userId: 2, firstName: 'firstName2', lastName: "lastName2", email: 'name2@gmail.com' },
    { id: 3, userId: 3, firstName: 'firstName3', lastName: "lastName3", email: 'name3@gmail.com' },
    { id: 4, userId: 4, firstName: 'firstName4', lastName: "lastName4", email: 'name4@gmail.com' },
    { id: 5, userId: 5, firstName: 'firstName5', lastName: 'lastName5', email: 'name5@gmail.com' },
];
exports.userProfile = userProfile;
const posts = [
    { id: 1, userId: 1, title: "Introduction to GraphQL", votes: 2 },
    { id: 2, userId: 2, title: "Welcome to Meteor", votes: 3 },
    { id: 3, userId: 2, title: "Advanced GraphQL", votes: 1 },
    { id: 4, userId: 3, title: "Launchpad is Cool", votes: 7 },
    { id: 5, userId: 1, title: "Launchpad is Cool", votes: 7 },
];
exports.posts = posts;
