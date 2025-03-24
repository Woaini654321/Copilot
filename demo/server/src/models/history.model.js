// 历史会话模型
// 本实现使用模拟数据，实际项目中应连接数据库
const { v4: uuidv4 } = require('uuid');

// 生成今天、昨天和更早的日期
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const createRandomDate = (daysAgo) => {
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date;
};

// 模拟会话数据
let chatHistories = [
  // 今天的会话记录
  {
    id: uuidv4(),
    userId: 1,
    title: '关于人工智能的讨论',
    preview: '人工智能技术的应用场景和发展前景',
    content: '用户: 你能告诉我人工智能技术的主要应用场景有哪些？\nAI: 人工智能技术的主要应用场景包括：\n1. 医疗健康：疾病诊断、药物研发\n2. 金融科技：风险评估、智能投顾\n3. 制造业：智能工厂、预测性维护\n4. 零售业：个性化推荐、需求预测\n5. 教育领域：自适应学习系统\n6. 自动驾驶：环境感知、决策控制\n7. 智能家居：语音助手、环境控制\n8. 安防系统：人脸识别、异常检测',
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30).toISOString(),
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30).toISOString(),
    updatedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 45).toISOString()
  },
  {
    id: uuidv4(),
    userId: 1,
    title: 'JavaScript编程问题',
    preview: '如何优化React组件性能的讨论',
    content: '用户: 你能给我一些优化React组件性能的建议吗？\nAI: 以下是优化React组件性能的几种方法：\n1. 使用React.memo()对函数组件进行记忆化\n2. 使用useCallback确保函数引用的稳定性\n3. 使用useMemo缓存计算结果\n4. 实现虚拟滚动来处理长列表\n5. 使用Code Splitting和React.lazy进行代码分割\n6. 避免不必要的重新渲染\n7. 使用合适的key属性优化列表更新\n8. 避免过多的内联函数\n9. 优化Context的使用范围\n10. 使用Chrome Performance工具进行性能分析',
    timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 15).toISOString(),
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 15).toISOString(),
    updatedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30).toISOString()
  },
  // 昨天的会话记录
  {
    id: uuidv4(),
    userId: 1,
    title: '产品需求分析',
    preview: '如何编写高质量的PRD文档',
    content: '用户: 如何编写一份高质量的产品需求文档(PRD)？\nAI: 编写高质量PRD的要点：\n1. 清晰定义产品愿景和目标\n2. 详细描述用户角色和用例\n3. 明确功能需求和非功能需求\n4. 使用用户故事和场景说明\n5. 包含交互设计和用户流程\n6. 定义验收标准\n7. 添加适当的图表和原型\n8. 保持文档结构清晰，使用统一格式\n9. 注明优先级和开发计划\n10. 记录相关假设和约束',
    timestamp: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 18, 45).toISOString(),
    createdAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 18, 45).toISOString(),
    updatedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 19, 0).toISOString()
  },
  // 更早的会话记录
  {
    id: uuidv4(),
    userId: 1,
    title: '数据分析与可视化',
    preview: '数据可视化的最佳实践和工具推荐',
    content: '用户: 有哪些常用的数据可视化工具和最佳实践？\nAI: 数据可视化常用工具和最佳实践：\n\n常用工具：\n1. Tableau - 商业智能和分析的领导者\n2. Power BI - 微软的商业分析工具\n3. D3.js - 强大的JavaScript库\n4. Python库：Matplotlib, Seaborn, Plotly\n5. R语言：ggplot2\n6. Google Data Studio - 免费的在线工具\n\n最佳实践：\n1. 了解你的受众和目标\n2. 选择合适的图表类型\n3. 简化设计，减少视觉干扰\n4. 使用一致的配色方案\n5. 标注重要数据点\n6. 提供上下文信息\n7. 确保数据准确性\n8. 使图表具有交互性\n9. 考虑无障碍设计\n10. 讲述数据背后的故事',
    timestamp: new Date('2024-03-20T10:00:00').toISOString(),
    createdAt: new Date('2024-03-20T10:00:00').toISOString(),
    updatedAt: new Date('2024-03-20T10:15:00').toISOString()
  },
];

// 生成30条模拟记录
for (let i = 0; i < 30; i++) {
  const daysAgo = Math.floor(Math.random() * 60) + 1; // 1-60天前
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const timestamp = createRandomDate(daysAgo);
  timestamp.setHours(hours, minutes);
  
  const titles = [
    '数据结构与算法讨论', 'Python编程技巧', 'Web前端开发最佳实践', 
    '数据库优化策略', '云计算服务比较', '机器学习模型评估', 
    '软件架构设计原则', 'DevOps实践与工具', '网络安全防护措施',
    '移动应用开发技术', '区块链技术应用', '用户体验设计原则'
  ];
  
  const previews = [
    '探讨常见算法的实现与优化', '高级Python特性与性能优化技巧', 
    '现代前端框架对比与性能优化', '关系型与非关系型数据库的选择',
    '主流云服务提供商功能对比', '模型训练与评估的方法论',
    '微服务与单体架构的取舍', 'CI/CD流程的搭建与优化',
    '常见网络攻击防范策略', 'React Native与Flutter对比',
    '区块链在供应链中的应用', '提升用户留存的设计策略'
  ];
  
  chatHistories.push({
    id: uuidv4(),
    userId: Math.random() > 0.3 ? 1 : 2, // 70%属于用户1，30%属于用户2
    title: titles[Math.floor(Math.random() * titles.length)],
    preview: previews[Math.floor(Math.random() * previews.length)],
    content: `这是一段模拟的对话内容，包含了关于${titles[Math.floor(Math.random() * titles.length)]}的讨论。`,
    timestamp: timestamp.toISOString(),
    createdAt: timestamp.toISOString(),
    updatedAt: new Date(timestamp.getTime() + 15 * 60000).toISOString() // 15分钟后更新
  });
}

// 按时间戳降序排序
chatHistories.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

// 获取分页的会话记录
const getHistories = (userId, page = 1, limit = 30) => {
  const userHistories = chatHistories.filter(history => history.userId === userId);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    total: userHistories.length,
    page,
    limit,
    hasMore: endIndex < userHistories.length,
    data: userHistories.slice(startIndex, endIndex)
  };
};

// 搜索会话记录
const searchHistories = (userId, keyword, page = 1, limit = 30) => {
  if (!keyword) {
    return getHistories(userId, page, limit);
  }
  
  const userHistories = chatHistories.filter(history => {
    return history.userId === userId && 
           (history.title.toLowerCase().includes(keyword.toLowerCase()) || 
            history.content.toLowerCase().includes(keyword.toLowerCase()));
  });
  
  // 处理搜索结果，添加内容匹配
  const results = userHistories.map(history => {
    const result = { ...history };
    
    // 查找内容中第一次出现关键词的句子
    if (result.content.toLowerCase().includes(keyword.toLowerCase())) {
      const sentences = result.content.split('\n');
      const matchedSentence = sentences.find(sentence => 
        sentence.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (matchedSentence) {
        result.matchedContent = matchedSentence;
      }
    }
    
    return result;
  });
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    total: results.length,
    page,
    limit,
    hasMore: endIndex < results.length,
    data: results.slice(startIndex, endIndex)
  };
};

// 获取单个会话记录
const getHistoryById = (userId, historyId) => {
  return chatHistories.find(history => 
    history.userId === userId && history.id === historyId
  );
};

// 删除会话记录
const deleteHistory = (userId, historyId) => {
  const index = chatHistories.findIndex(history => 
    history.userId === userId && history.id === historyId
  );
  
  if (index !== -1) {
    chatHistories.splice(index, 1);
    return true;
  }
  
  return false;
};

module.exports = {
  getHistories,
  searchHistories,
  getHistoryById,
  deleteHistory
};