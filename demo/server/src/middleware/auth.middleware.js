const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

// 验证用户token的中间件
const verifyToken = (req, res, next) => {
  try {
    // 从请求头中获取token
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (!token) {
      return res.status(403).json({
        success: false,
        message: '未提供访问令牌'
      });
    }

    // 去除Bearer前缀（如果有的话）
    token = token.replace(/^Bearer\s+/, '');
    
    // 验证token
    const decoded = jwt.verify(token, authConfig.secret);
    
    // 将用户信息添加到请求对象
    req.userId = decoded.id;
    
    next();
  } catch (error) {
    console.error('Token验证失败:', error);
    return res.status(401).json({
      success: false,
      message: '无效的访问令牌'
    });
  }
};

module.exports = {
  verifyToken
};