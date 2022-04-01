const amqp = require('amqplib/callback_api');
const config = require("../config");
const Class = require("./models/Class");

amqp.connect(config.rabbitmq, function(error, connection) {
    connection.createChannel(function(error, channel) {
        const queue = 'createClassMsg';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, async function (msg) {
            let dataClass = JSON.parse(msg)
            dataClass.id = dataClass._id
            delete dataClass._id
            const newClass = await Class.create(dataClass)
            console.log(" [x] Received %s", newClass);
            setTimeout(function () {
                console.log(" [x] Done");
                channel.ack(msg);
            }, 1000);
        }, {
            noAck: false
        });
    });
});