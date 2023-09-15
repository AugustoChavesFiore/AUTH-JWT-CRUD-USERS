import path from 'path';

export const handleErrors = (err, req, res, next) => {
    const date = new Date();
    const timestamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    createLogs(`${timestamp}-${err.stack}\n`, path.dirname(__dirname), 'errors');
    const errorMessage = JSON.parse(err.message);
    res.status(errorMessage.status).send(errorMessage.Error);
};

