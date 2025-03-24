const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const userModel = require('../models/user.model');

/**
 * 处理用户登录
 */
const login = (req, res) => {
  try {
    console.log('收到登录请求，请求体:', JSON.stringify(req.body, null, 2));
    const { username, password } = req.body;
    
    // 验证请求
    if (!username || !password) {
      console.log('用户名或密码为空');
      return res.status(400).json({
        success: false,
        message: '用户名和密码不能为空'
      });
    }
    
    // 查找用户
    const user = userModel.findByUsername(username);
    console.log('查找用户结果:', user ? {
      id: user.id,
      username: user.username,
      name: user.name,
      hasPassword: !!user.password
    } : '未找到用户');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }
    
    // 验证密码
    console.log('开始验证密码');
    console.log('输入的密码:', password);
    console.log('数据库中的密码哈希:', user.password);
    
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log('密码验证结果:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }
    
    // 生成JWT令牌
    const token = jwt.sign(
      { id: user.id },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    );
    
    // 返回用户信息和令牌
    const response = {
      success: true,
      message: '登录成功',
      data: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token
      }
    };
    
    console.log('登录成功，返回数据:', JSON.stringify(response, null, 2));
    return res.status(200).json(response);
  } catch (error) {
    console.error('登录出错:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
};

/**
 * 获取当前用户信息
 */
const getCurrentUser = (req, res) => {
  try {
    const userId = req.userId;
    
    // 查找用户
    const user = userModel.findById(parseInt(userId));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
    
    // 返回用户信息（不包含密码）
    return res.status(200).json({
      success: true,
      message: '获取用户信息成功',
      data: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('获取用户信息出错:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
};

module.exports = {
  login,
  getCurrentUser
};