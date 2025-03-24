import { post } from '@/utils/request';

/**
 * 认证相关API
 */
export default {
  /**
   * 用户登录
   * @param {Object} data - 登录参数
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @returns {Promise} - 请求Promise
   */
  login(data) {
    return post('/auth/login', data);
  },

  /**
   * 获取当前用户信息
   * @returns {Promise} - 请求Promise
   */
  getCurrentUser() {
    return post('/auth/me');
  }
};