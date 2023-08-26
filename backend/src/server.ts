// src/server.ts
import Express from 'express';
import dotenv from 'dotenv';
import { ConnectDatabase } from './utils/config/connect-db';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';

// import routes
import UserRoute from './routes/users';
import ArticleRoute from './routes/articles';
import PackageRoute from './routes/packages';
import BroadcastRoute from './routes/broadcast';
// import WebSocketService from './utils/services/web-socket';
// import configureWebSocketRoutes from './routes/web-socket';
import { ErrorHandler } from './middleware/error';
import { WebSocketServerConnection } from './web/sockets';

// Set port
const PORT = process.env.PORT || 6556;
const baseURL = `http://localhost:${PORT}`;

// Enable us to use environment variable throughout our application
dotenv.config({ path: '.env' });

// Create an express instance
const app: Express.Application = Express();

// Websocket Server
// Create an instance of the HTTP server and store it in the 'server' variable
const server = http.createServer(app);
WebSocketServerConnection(server);

// Create the Redis client and connect to the Redis server

// Connection to our MongoDB.
ConnectDatabase();

// Middleware
app.use(morgan('tiny'));
app.use(Express.json());
app.use(cookieParser());
app.use(ErrorHandler);
app.use(Express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Application API Endpoints
app.use('/v1/api/users', UserRoute);
app.use('/v1/api/articles', ArticleRoute);
app.use('/v1/api/packages', PackageRoute);
app.use('/v1/api/broadcast', BroadcastRoute);

// Port listening on 8000
server.listen(PORT, () => console.log(`Server is running on ${baseURL}`));
