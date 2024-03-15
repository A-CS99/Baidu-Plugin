FROM node:20

# 设置工作目录为/app  
WORKDIR /app  
  
# 复制package.json和package-lock.json到工作目录  
COPY package.json ./  
COPY yarn.lock ./
  
# 安装项目依赖  
RUN yarn install --production

# 复制所有文件到工作目录
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["yarn", "start"]
