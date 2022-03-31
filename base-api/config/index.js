module.exports = {
    port: process.env.PORT || 3000,
    timeout: process.env.TIMEOUT || 5000,
    grpc: {
        classService: {
            host: "localhost",
            port: 3001,
            name: "ClassService"
        },
        enrollService: {
            host: "localhost",
            port: 3002,
            name: "EnrollService"
        }
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_HOST || 6379
    }
}