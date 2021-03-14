const config = {
    dev: {
        // server: 'https://sleepy-bayou-41000.herokuapp.com/',
        server: 'http://0.0.0.0:5000/',
    },
    prod: {
        server:
            process.env.SERVER_URL || 'http://0.0.0.0:5000/',
    },
};
export default process.env.NODE_ENV === 'production' ? config.prod : config.dev;