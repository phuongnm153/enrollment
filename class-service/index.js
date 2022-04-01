const grpc = require('grpc')
const config = require('./config')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync('./proto/class.proto');
const classProto = grpc.loadPackageDefinition(packageDefinition);
const mongoose = require('mongoose');
const Class = require("./models/Class");
const {initClient} = require("./grpc");
const StudentInClass = require("./models/StudentInClass");
const {produce} = require("./rb/send");

async function connectDB() {
    try {
        await mongoose.connect(config.DATABASE_URI);
        console.log("Connected successfully to class-service mongoDB");
    } catch (e) {
        console.error(e);
    }
}
initClient(config.grpc)

async function main() {
    await connectDB().catch(console.dir);
    let server = new grpc.Server();
    server.addService(classProto.ClassService.service, {
        list: async (_, callback) => {
            let classList = await Class.find({})
            callback(null, {
                classes: classList
            })
        },
        insert: async (call, callback) => {
            const newClass = await Class.create(call.request)
            //send to queue
            if (newClass) {
                let queueProcess = await produce('createClassMsg', newClass)
                console.log(queueProcess)
            }
            callback(null, newClass)
        },
        enroll: async (call, callback) => {
            const newStudentClass = await StudentInClass.create(call.request)
            callback(null, newStudentClass)
        },
    })
    let address = `${config.host}:${config.port}`;
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Class Service running at " + address);
    });
}

main();