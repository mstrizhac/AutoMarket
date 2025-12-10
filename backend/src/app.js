require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');
const dbManager = require("./storage/dbManager");

const app = express();
const PORT = process.env.PORT;

dbManager.initDB().catch((err) => {
    console.log("Cannot connect to the database");
    console.log(err);
    process.exit(1);
})


app.use(helmet());
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy OK');
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server run on: ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV}`);
});