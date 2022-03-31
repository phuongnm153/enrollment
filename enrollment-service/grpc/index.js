const grpc = require('grpc')
const forEach = require('lodash/forEach');
const isEmpty = require('lodash/isEmpty');
const protoLoader = require('@grpc/proto-loader')

let client = {};

const initClient = (config) => {
    if (isEmpty(client)) {
        forEach(config, (value, key) => {
            // get protofile name
            const fileName = key.replace("Service", "");
            const packageDefinition = protoLoader.loadSync(`./proto/${fileName}.proto`);
            const classProto = grpc.loadPackageDefinition(packageDefinition);
            const ServiceProto = classProto[value.name];
            client[key] = new ServiceProto(`${value.host}:${value.port}`,
                grpc.credentials.createInsecure());
        })
    }
    
    return client
}


module.exports = {
    initClient,
    client
}