const whitelist = [
    'https://www.google.com',
    'http://127.0.0.1:3500',
    'http://localhost:3500']

const corsOptions = {
    origin: (origin,callback) => {
        //in other words, if origin is IN whitelist
        if (whitelist.indexOf(origin) !== -1 || !origin){ 
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    optionsSuccessStatus:200
}

module.exports = corsOptions;