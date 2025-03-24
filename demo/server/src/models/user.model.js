// 用户模型
// 本实现使用模拟数据，实际项目中应连接数据库
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$cwFzoKftnQcCLrHEP.e04ezSD8Djl9oehrxzXUs7OBb5euGGO3pYi', // 密码: 'admin123'
    name: '管理员',
    email: 'admin@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date('2024-03-01').toISOString()
  },
  {
    id: 2,
    username: 'user',
    password: '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAy2', // 密码: 'user123'
    name: '普通用户',
    email: 'user@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString()
  }
];

const findByUsername = (username) => {
  return users.find(user => user.username === username);
};

const findById = (id) => {
  return users.find(user => user.id === id);
};

module.exports = {
  users,
  findByUsername,
  findById
};