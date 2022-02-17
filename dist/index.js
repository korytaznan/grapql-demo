"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const userSchema_1 = require("./schema/userSchema");
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const userResolvers_1 = require("./resolvers/userResolvers");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const loggingMiddleware = (req, res, next) => {
    (0, userResolvers_1.pushIp)(req.ip);
    next();
};
app.use((0, helmet_1.default)({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(loggingMiddleware);
app.get('/', (req, res) => {
    res.json({
        message: "OK"
    });
});
const apolloServer = new apollo_server_express_1.ApolloServer({
    introspection: true,
    typeDefs: userSchema_1.userSchema,
    resolvers: userResolvers_1.userResolvers,
    formatError: error => {
        return error;
    },
    context: ({ req, res }) => {
        return {
            req,
            res,
        };
    },
    plugins: [
        (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
        (0, apollo_server_core_1.ApolloServerPluginLandingPageDisabled)(),
    ]
});
const callbackAppListen = () => {
    console.log(`Running on ${HOST}:${PORT} ⚡`);
};
const listeningServer = () => {
    console.log('Express server started on port %s at %s', server.address());
};
apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app, path: "/api/graphql" });
    server.listen(Number(PORT), HOST, 0, callbackAppListen);
    server.on('listening', listeningServer);
});
