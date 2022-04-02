const amqp = require('amqplib/callback_api');
const config = require("../config");
const Class = require("../models/Class");

const workerRB = () => {
    amqp.connect(config.rabbitmq, function (error, connection) {
        connection.createChannel(function (error, channel) {
            const queue = 'createClassMsg';

            channel.assertQueue(queue, {
                durable: true
            });
            channel.prefetch(1);
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            channel.consume(queue, async function (msg) {
                try {
                    let dataClass = JSON.parse(msg.content.toString())
                    dataClass.id = dataClass._id
                    delete dataClass._id
                    console.log(dataClass)
                    const newClass = await Class.create(dataClass)
                    console.log(" [x] Received %s", newClass);
                    setTimeout(function () {
                        console.log(" [x] Done");
                        channel.ack(msg);
                    }, 1000);
                } catch (e) {
                    console.log(" [x] Error %s", e)
                }
            }, {
                noAck: false
            });
        });
    })
}

module.exports = {
    workerRB,
}