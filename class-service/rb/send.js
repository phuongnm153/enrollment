const amqplib = require('amqplib');
const config = require("../config");

const produce = async (queueName, data) => {
    console.log("Publishing");
    try {
        const conn = await amqplib.connect(config.rabbitmq);
        const channel = await conn.createChannel();
        const msg = JSON.stringify(data);

        channel.assertQueue(queueName, {
            durable: true
        });
        channel.sendToQueue(queueName, Buffer.from(msg), {
            persistent: true
        });

        console.log(" [x] Sent %s", msg);
        setTimeout( function()  {
            channel.close();
            conn.close();},  500 );
    } catch (e) {
        console.log('send rb error' + e)
    }
}

module.exports = {
    produce
}