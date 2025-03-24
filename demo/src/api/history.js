import request from '@/utils/request';

/**
 * 历史会话相关API
 */
export default {
  /**
   * 获取历史会话列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页记录数
   * @returns {Promise} - 请求Promise
   */
  getHistories(params) {
    return request({
      url: '/api/history',
      method: 'get',
      params
    });
  },

  /**
   * 搜索历史会话
   * @param {Object} params - 查询参数
   * @param {string} params.keyword - 搜索关键词
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页记录数
   * @returns {Promise} - 请求Promise
   */
  searchHistories(params) {
    return request({
      url: '/api/history/search',
      method: 'get',
      params
    });
  },

  /**
   * 获取单条历史会话详情
   * @param {string} id - 会话ID
   * @returns {Promise} - 请求Promise
   */
  getHistoryById(id) {
    return request({
      url: `/api/history/${id}`,
      method: 'get'
    });
  },

  /**
   * 删除历史会话
   * @param {string} id - 会话ID
   * @returns {Promise} - 请求Promise
   */
  deleteHistory(id) {
    return request({
      url: `/api/history/${id}`,
      method: 'delete'
    });
  }
};