const logger = require('./utils/logger');
const express = require('express')
const config  = require('./config')
const app = new express();
const {initClient} = require('./client')
const bodyParser = require('body-parser');
const routes = require('./routes');

/**
 * init grpc grpc
 */
initClient(config.grpc)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(config.port, () => {
    logger.info("App listen on port " + config.port)
})