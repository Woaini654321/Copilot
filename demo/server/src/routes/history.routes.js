const express = require('express');
const historyController = require('../controllers/history.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// 所有路由都需要认证
router.use(authMiddleware.verifyToken);

// 获取历史会话列表
router.get('/', historyController.getHistories);

// 搜索历史会话
router.get('/search', historyController.searchHistories);

// 获取单条历史会话详情
router.get('/:id', historyController.getHistoryById);

// 删除历史会话
router.delete('/:id', historyController.deleteHistory);

module.exports = router;