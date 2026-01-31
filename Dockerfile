# 1. Build stage
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Production stage
FROM nginx:stable-alpine AS production-stage
# 빌드된 결과물을 nginx의 기본 서빙 디렉토리로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 만약 SPA 라우팅을 사용한다면 nginx 설정 파일 교체가 필요할 수 있습니다.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
