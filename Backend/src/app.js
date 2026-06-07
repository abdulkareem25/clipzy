const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// require routers
const authRouter = require('./routes/auth.routes');
const projectRouter = require('./routes/project.routes');
const postRouter = require('./routes/post.routes');
const UserRouter = require('./routes/user.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.static('./public'));

// use routers
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', UserRouter);

app.use(/.*/, (req, res) => {
    res.sendFile('index.html', { root: './public' });
})


// error handler
app.use(errorHandler);


module.exports = app;