// 服务器入口文件
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// 导入路由
const authRoutes = require('./routes/auth.routes');
const historyRoutes = require('./routes/history.routes');

// 加载环境变量
dotenv.config();

// 创建express应用
const app = express();

// CORS配置
const corsOptions = {
  origin: ['http://localhost:3100', 'http://127.0.0.1:3100'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 预检请求缓存24小时
};

// 中间件
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 调试中间件
app.use((req, res, next) => {
  console.log('请求路径:', req.path);
  console.log('请求方法:', req.method);
  console.log('请求头:', req.headers);
  if (req.method !== 'GET') {
    console.log('请求体:', req.body);
  }
  next();
});

// API路由
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);

// 健康检查路由
app.get('/health', (req, res) => {
  res.status(200).json({ message: '服务器正常运行' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

// 定义端口号
const PORT = process.env.PORT || 3000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;