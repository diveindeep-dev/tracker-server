if (process.env.NODE_ENV === 'development') {
  console.log('DEV MODE!');
}

import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { PORT, CLIENT_URL } from './config/index.js';

const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  Credential: true,
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World: TRACKER-SERVER');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
