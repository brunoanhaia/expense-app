import createError from 'http-errors';
import express from 'express';
import {Request, Response, NextFunction, ErrorRequestHandler, Application} from 'express';
// import path from 'path';
// import session from 'express-session'
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import bodyParser from 'body-parser';
// import cors from 'cors';
import * as dot_env from 'dotenv'

//Loading .env file from root path
dot_env.config();
//
// const app = express();
// let global = {} as any;
// global.__basedir = __dirname;
//
// app.use(session({
//   secret: process.env.SECRET,
//   resave: true,
//   saveUninitialized: true
// }));
//
// //Body parser configuration
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
//
// app.use('/api', api);
//
// catch 404 and forward to error handler
// app.use();
//
// const forwardToErrorHandler = (req, res, next) =>{
//   next(createError(404));
// };
//
// const errorHandler = (err: ErrorRequestHandler | any, req: Request, res: Response, next: NextFunction) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.send({'Error':{'message':err.message,status:err.status}});
//   next();
// };

// app.set('json spaces', 4);

export class App {
  public app: Application;
  public port: number;

  constructor(appInit: {port: number; middleWares: any; controllers: any; settings?: any}){
    this.app = express();
    this.port = appInit.port;



    this.middlewareList(appInit.middleWares);
    this.routeList(appInit.controllers);
    this.settings(appInit.settings);
    this.assets();

    this.app.use(this.forwardToErrorHandler);
    this.app.use(this.errorHandler);
  }

  private middlewareList(middlewareList: {forEach: (arg0: (middleware: any) => void) => void; }){
    middlewareList.forEach(middleware => {
      this.app.use(middleware);
    })
  }

  public routeList(controllers: {forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach( controller => {
      this.app.use(controller);
    })
  }

  private settings(settings: {forEach: (arg0: (setting: {key: string, value: string}) => void) => void; }) {
    settings.forEach( setting => {
      this.app.set(setting.key, setting.value);
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on ${this.port} port`);
    })
  }
  private assets() {
    this.app.use(express.static('public'));
    this.app.use(express.static('views'));
  }

  private forwardToErrorHandler = (req, res, next) =>{
    next(createError(404));
  };

  private errorHandler = (err: ErrorRequestHandler | any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({'Error':{'message':err.message,status:err.status}});
    next();
  };
}
