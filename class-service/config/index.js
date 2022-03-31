module.exports = {
    port: process.env.PORT || 3001,
    host: process.env.HOST || "localhost",
    grpc: {
        enrollService: {
            host: "localhost",
            port: 3002,
            name: "EnrollService"
        }
    },
    DATABASE_URI: "mongodb://localhost:27017/class-service"
}