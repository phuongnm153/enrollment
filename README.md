## List thư viện

Trước khi sử dụng bộ core này bạn cần biết project sử dụng những gì.

- Nodejs
- MongoDB
- RabbitMQ, gRPC

## Yêu cầu hệ thống

- Node >= 10.

## Hướng dẫn cài đặt

1. Project base-api: Đóng vai trò client API
```
cd .\base-api\
npm i
npm run dev
```
2. Project class-service: quản lý lớp học
```
cd .\class-service\
npm i
npm run dev
```
3. Project enrollment-service: quản lý nhập học
```
cd .\enrollment-service\
npm i
npm run dev
```
4. Danh sách API call ở trong file `base-api/routes/index.js`
5. Cần cài đặt MongoDB, RabbitMQ. 

