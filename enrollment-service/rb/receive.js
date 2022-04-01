const amqplib = require('amqplib');

const consume = async (config) => {
    var conn = await amqplib.connect(amqp_url, "heartbeat=60");
    var ch = await conn.createChannel()
    var q = 'test_queue';
    await conn.createChannel();
    await ch.assertQueue(q, {durable: true});
    await ch.consume(q, function (msg) {
        console.log('amqplib: consumed message: ' + msg.content.toString());
        ch.ack(msg);
        ch.cancel('myconsumer');
    }, {consumerTag: 'myconsumer'});
    setTimeout(function () {
        ch.close();
        conn.close();
    }, 500);
}

module.exports = {
    consume
}