const bcrypt = require('bcryptjs');

const password = 'admin123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Password:', password);
console.log('Salt:', salt);
console.log('Hash:', hash);

// 验证密码
const isValid = bcrypt.compareSync(password, hash);
console.log('Password verification:', isValid);

// 验证数据库中的密码哈希
const dbHash = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi';
const isDbValid = bcrypt.compareSync(password, dbHash);
console.log('DB hash verification:', isDbValid);