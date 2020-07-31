import bodyParser from 'koa-bodyparser'
// import session from 'koa-session'
import cors from "@koa/cors";
import Router from "@koa/router"
import Logger from "koa-logger";
import { RegisterRoutes } from './routes/routes';
import { postgresDB } from './database/postgres-db';
// import passport from 'koa-passport';
// import session from 'koa-session'

// Needed for tsoa route & swagger generation
import { MarmitonController } from "./controller/marmitonController"
import { UserController } from "./controller/userController"
import { AuthController } from "./controller/authController"
import { oas } from 'koa-oas3'
import logger from "koa-logger"


let listenPort = process.env.PORT || 1234;

const app = require('./app');

// const SESSION_CONFIG = {
//   key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//   /** (number || 'session') maxAge in ms (default is 1 days) */
//   /** 'session' will result in a cookie that expires when session/browser is closed */
//   /** Warning: If a session cookie is stolen, this cookie will never expire */
//   maxAge: 86400000,
//   autoCommit: true, /** (boolean) automatically commit headers (default true) */
//   overwrite: true, /** (boolean) can overwrite or not (default true) */
//   httpOnly: true, /** (boolean) httpOnly or not (default true) */
//   signed: true, /** (boolean) signed or not (default true) */
//   rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//   renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// };

async function bootstrap() {

  await postgresDB();

  // Sessions
  /*
  Key for prodution example :
  $ python3
  >> import os
  >> os.urandom(24)
  b'3\xa5\xfa\xc6\xfb\x0e\x1dA\x19-U\x15Y\x9e2]\x92/\x97\x8d\xecsJ\xb7'
  */
  // app.keys = ['super-secret-key'];
  // app.use(session(SESSION_CONFIG, app));


  // require('./auth/auth');
  // app.use(passport.initialize());
  // app.use(passport.session());

  // Body Parser
  app.use(bodyParser());
  app.use(cors({
    credentials: true
  }));

  // app.use(oas({
  //   file: `${__dirname}/../swagger.json`,
  //   endpoint: '/swagger.json',
  //   uiEndpoint: '/',
    
  // }))

  app.use(Logger())

  const koaRouter = new Router();
  RegisterRoutes(koaRouter);
  app.use(koaRouter.allowedMethods());
  app.use(koaRouter.routes());

  app.listen({ port: listenPort }, () =>
    console.log(`🚀 Server readyy at http://localhost:${listenPort}`),
  );
}



bootstrap();