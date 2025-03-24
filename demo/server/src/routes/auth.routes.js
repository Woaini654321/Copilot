const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// 登录接口
router.post('/login', authController.login);

// 获取当前用户信息（需要认证）
router.get('/me', authMiddleware.verifyToken, authController.getCurrentUser);

module.exports = router;