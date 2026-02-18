const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// require routers
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const UserRouter = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// use routers
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', UserRouter);


module.exports = app;