// JWT配置
module.exports = {
  // JWT密钥
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  
  // Token过期时间
  expiresIn: process.env.JWT_EXPIRES_IN || '7d'
};