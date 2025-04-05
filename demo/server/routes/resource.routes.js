const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resource.controller');

// 获取资源列表
router.get('/list', resourceController.getResourceList);

// 获取资源详情
router.get('/:id', resourceController.getResourceDetail);

// 按类型获取资源
router.get('/type/:type', resourceController.getResourcesByType);

module.exports = router;