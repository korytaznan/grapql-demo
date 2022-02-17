import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import http from 'http'
import { userSchema } from './schema/userSchema'
import cors from 'cors';
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import { userResolvers, pushIp } from './resolvers/userResolvers';


dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'
const app: Express = express();
const server = http.createServer(app);
const loggingMiddleware = (req: { ip: any; }, res: any, next: () => void) => {
    pushIp(req.ip)
    next();
}

// app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(helmet({contentSecurityPolicy: false}))
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggingMiddleware);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "OK"
    })
});

const apolloServer = new ApolloServer({
    introspection: true,
    typeDefs: userSchema,
    resolvers: userResolvers,
    formatError: error => {
        return error
    },
    context: ({ req, res }) => {
        return {
            req,
            res,
        }
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginLandingPageDisabled(),
    ]
});

const callbackAppListen = () => {
    console.log(`Running on ${HOST}:${PORT} ⚡`)
}

const listeningServer = () => {
    console.log('Express server started on port %s at %s', server.address())
}

apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app, path: "/api/graphql" })
    server.listen(Number(PORT), HOST, 0, callbackAppListen);
    server.on('listening', listeningServer)
})