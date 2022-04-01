const amqplib = require('amqplib');
const config = require("../config");

const produce = async (queueName, data) => {
    console.log("Publishing");
    const conn = await amqplib.connect(config.rabbitmq, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            const msg = JSON.stringify(data);

            channel.assertQueue(queueName, {
                durable: false
            });
            channel.sendToQueue(queueName, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    })
    return conn
}

module.exports = {
    produce
}