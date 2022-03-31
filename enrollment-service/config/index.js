module.exports = {
    port: process.env.PORT || 3002,
    host: process.env.HOST || "localhost",
    DATABASE_URI: "mongodb://localhost:27017/enrollment-service",
    grpc: {
        classService: {
            host: "localhost",
            port: 3001,
            name: "ClassService"
        }
    },
}