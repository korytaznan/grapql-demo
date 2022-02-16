import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import http from 'http'

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'
const app: Express = express();
const server = http.createServer(app);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "OK"
    })
});


const callbackAppListen = () => {
    console.log(`Running on ${HOST}:${PORT} ⚡`)
}

const listeningServer = () => {
    console.log('Express server started on port %s at %s', server.address())
}

// app.listen(Number(PORT), HOST, 0, callbackAppListen)
server.listen(Number(PORT), HOST, 0, callbackAppListen);
server.on('listening',listeningServer)