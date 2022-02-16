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
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        message: "OK"
    });
});
const callbackAppListen = () => {
    console.log(`Running on ${HOST}:${PORT} ⚡`);
};
const listeningServer = () => {
    console.log('Express server started on port %s at %s', server.address());
};
// app.listen(Number(PORT), HOST, 0, callbackAppListen)
server.listen(Number(PORT), HOST, 0, callbackAppListen);
server.on('listening', listeningServer);
