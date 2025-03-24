const historyModel = require('../models/history.model');

/**
 * 获取历史会话列表（分页）
 */
const getHistories = (req, res) => {
  try {
    const userId = parseInt(req.userId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    
    const result = historyModel.getHistories(userId, page, limit);
    
    return res.status(200).json({
      success: true,
      message: '获取历史会话列表成功',
      data: result
    });
  } catch (error) {
    console.error('获取历史会话列表出错:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
};

/**
 * 搜索历史会话
 */
const searchHistories = (req, res) => {
  try {
    const userId = parseInt(req.userId);
    const keyword = req.query.keyword || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    
    const result = historyModel.searchHistories(userId, keyword, page, limit);
    
    return res.status(200).json({
      success: true,
      message: '搜索历史会话成功',
      data: result
    });
  } catch (error) {
    console.error('搜索历史会话出错:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
};

/**
 * 获取单条历史会话详情
 */
const getHistoryById = (req, res) => {
  try {
    const userId = parseInt(req.userId);
    const historyId = req.params.id;
    
    const history = historyModel.getHistoryById(userId, historyId);
    
    if (!history) {
      return res.status(404).json({
        success: false,
        message: '历史会话不存在或无权访问'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: '获取历史会话详情成功',
      data: history
    });
  } catch (error) {
    console.error('获取历史会话详情出错:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
};

/**
 * 删除历史会话
 */
const deleteHistory = (req, res) => {
  try {
    const userId = parseInt(req.userId);
    const historyId = req.params.id;
    
    const success = historyModel.deleteHistory(userId, historyId);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: '历史会话不存在或无权删除'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: '删除历史会话成功'
    });
  } catch (error) {
    console.error('删除历史会话出错:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
};

module.exports = {
  getHistories,
  searchHistories,
  getHistoryById,
  deleteHistory
};