const { v4: uuidv4 } = require('uuid');

// 模拟资源数据
const mockResources = [
  // 视频资源
  {
    id: uuidv4(),
    name: '2025年前端技术趋势分析',
    keywords: ['前端', '技术趋势', '2025'],
    createdAt: '2025-03-15T10:30:00Z',
    summary: '本视频详细分析了2025年前端技术的发展趋势，包括WebAssembly的普及、AI辅助开发工具的革新以及新一代响应式框架的兴起等内容。',
    type: 'video',
    coverUrl: 'https://picsum.photos/id/237/300/200',
    duration: 1800 // 30分钟
  },
  {
    id: uuidv4(),
    name: 'Vue 4.0核心特性解析',
    keywords: ['Vue', '前端框架', '教程'],
    createdAt: '2025-02-20T14:15:00Z',
    summary: '深入讲解Vue 4.0的核心特性，包括新的响应式系统、编译优化、服务端渲染改进等，适合有Vue使用经验的开发者学习。',
    type: 'video',
    coverUrl: 'https://picsum.photos/id/238/300/200',
    duration: 2700 // 45分钟
  },
  
  // 音频资源
  {
    id: uuidv4(),
    name: '技术leader晋升经验分享',
    keywords: ['职业发展', '技术管理', '晋升'],
    createdAt: '2025-03-10T09:00:00Z',
    summary: '资深技术leader分享从普通开发到技术管理的晋升经验，包括技术深度与广度的平衡、团队管理技巧以及项目规划等方面的见解。',
    type: 'audio',
    duration: 3600 // 60分钟
  },
  {
    id: uuidv4(),
    name: '高效开发习惯养成指南',
    keywords: ['效率', '开发习惯', '时间管理'],
    createdAt: '2025-01-25T16:40:00Z',
    summary: '本音频总结了提高开发效率的关键习惯，从代码编写、工具使用到时间管理，帮助开发者在日常工作中提升生产力。',
    type: 'audio',
    duration: 1500 // 25分钟
  },
  
  // PPT资源
  {
    id: uuidv4(),
    name: '微服务架构设计原则',
    keywords: ['微服务', '架构设计', '分布式系统'],
    createdAt: '2025-03-05T11:20:00Z',
    summary: '详细讲解微服务架构的设计原则和最佳实践，包括服务边界划分、通信方式选择、数据一致性保证以及常见陷阱的避免方法。',
    type: 'ppt',
    coverUrl: 'https://picsum.photos/id/239/300/200',
    size: 2621440 // 2.5MB
  },
  {
    id: uuidv4(),
    name: '大型前端项目组织结构',
    keywords: ['前端', '项目管理', '代码组织'],
    createdAt: '2025-02-10T13:50:00Z',
    summary: '分享大型前端项目的组织方法，包括多模块管理、组件设计策略、状态管理方案以及构建优化策略等内容。',
    type: 'ppt',
    coverUrl: 'https://picsum.photos/id/240/300/200',
    size: 3145728 // 3MB
  },
  
  // 文档资源
  {
    id: uuidv4(),
    name: 'TypeScript高级类型编程指南',
    keywords: ['TypeScript', '类型系统', '编程技巧'],
    createdAt: '2025-03-20T15:10:00Z',
    summary: '深入解析TypeScript类型系统的高级用法，包括条件类型、映射类型、类型推断以及实用的类型编程技巧，附有丰富的实例代码。',
    type: 'document',
    thumbnailUrl: 'https://picsum.photos/id/241/300/200',
    size: 1048576 // 1MB
  },
  {
    id: uuidv4(),
    name: '前端性能优化白皮书',
    keywords: ['性能优化', '前端', '最佳实践'],
    createdAt: '2025-01-15T08:25:00Z',
    summary: '全面总结前端性能优化的方法和策略，涵盖网络请求、渲染性能、资源加载、代码执行效率等多个维度，适合各级别前端开发者参考。',
    type: 'document',
    thumbnailUrl: 'https://picsum.photos/id/242/300/200',
    size: 5242880 // 5MB
  }
];

// 获取资源列表
exports.getResourceList = (req, res) => {
  const { page = 1, pageSize = 10, keyword, type } = req.query;
  
  // 过滤资源
  let filteredResources = [...mockResources];
  
  // 按类型过滤
  if (type) {
    filteredResources = filteredResources.filter(resource => resource.type === type);
  }
  
  // 按关键词搜索
  if (keyword) {
    const searchKeyword = keyword.toLowerCase();
    filteredResources = filteredResources.filter(resource => {
      return (
        resource.name.toLowerCase().includes(searchKeyword) ||
        resource.summary.toLowerCase().includes(searchKeyword) ||
        resource.keywords.some(k => k.toLowerCase().includes(searchKeyword))
      );
    });
  }
  
  // 分页处理
  const start = (parseInt(page) - 1) * parseInt(pageSize);
  const end = start + parseInt(pageSize);
  const paginatedResources = filteredResources.slice(start, end);
  
  // 返回结果
  res.json({
    success: true,
    data: {
      total: filteredResources.length,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      list: paginatedResources
    },
    message: '获取资源列表成功'
  });
};

// 获取资源详情
exports.getResourceDetail = (req, res) => {
  const { id } = req.params;
  const resource = mockResources.find(item => item.id === id);
  
  if (!resource) {
    return res.status(404).json({
      success: false,
      message: '资源不存在',
      data: null
    });
  }
  
  res.json({
    success: true,
    data: resource,
    message: '获取资源详情成功'
  });
};

// 按类型获取资源
exports.getResourcesByType = (req, res) => {
  const { type } = req.params;
  const { page = 1, pageSize = 10, keyword } = req.query;
  
  // 按类型过滤
  let filteredResources = mockResources.filter(resource => resource.type === type);
  
  // 按关键词搜索
  if (keyword) {
    const searchKeyword = keyword.toLowerCase();
    filteredResources = filteredResources.filter(resource => {
      return (
        resource.name.toLowerCase().includes(searchKeyword) ||
        resource.summary.toLowerCase().includes(searchKeyword) ||
        resource.keywords.some(k => k.toLowerCase().includes(searchKeyword))
      );
    });
  }
  
  // 分页处理
  const start = (parseInt(page) - 1) * parseInt(pageSize);
  const end = start + parseInt(pageSize);
  const paginatedResources = filteredResources.slice(start, end);
  
  // 返回结果
  res.json({
    success: true,
    data: {
      total: filteredResources.length,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      list: paginatedResources
    },
    message: `获取${type}类型资源列表成功`
  });
};