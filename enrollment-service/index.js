const grpc = require('grpc')
const config = require('./config')
const logger = require('./utils/logger')
const protoLoader = require('@grpc/proto-loader')
const {initClient} = require("./grpc")
const Enrollment = require("./models/Enrollment")
const packageDefinition = protoLoader.loadSync('./proto/enroll.proto')
const enrollProto = grpc.loadPackageDefinition(packageDefinition)
const mongoose = require('mongoose')
initClient(config.grpc)

async function connectDB() {
    try {
        await mongoose.connect(config.DATABASE_URI);
        console.log("Connected successfully to enrollment-service mongoDB");
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    await connectDB().catch(console.dir);
    let server = new grpc.Server();
    server.addService(enrollProto.EnrollService.service, {
        list: async (_, callback) => {
            let enrollList = await Enrollment.find({})
            callback(null, {
                enrolls: enrollList
            })
        },
        insert: async (call, callback) => {
            let params = {
                studentId: call.request.studentId,
                classId: call.request.classId
            }
            const newEnrollment = await Enrollment.create(params)
            callback(null, newEnrollment)
        },
        confirm: async (call, callback) => {
            console.log(call.request)
            let params = {
                _id: call.request.id,
            }
            const enroll = await Enrollment.updateOne(params, { status: 1 })
            callback(null, enroll)
        }
    })
    let address = `${config.host}:${config.port}`;
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Enrollment service running at " + address);
    });
}

main();