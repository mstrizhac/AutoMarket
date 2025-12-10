const errorHandler = (err, req, res) => {
    const statusCode = err.status || 500;
    console.error(`[Error]: ${err.message}`);

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error',
        stack: process.env.NODE_ENV === 'dev' ? err.stack : {}
    });
};

module.exports = errorHandler;