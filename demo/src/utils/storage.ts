/**
 * 本地存储封装
 */

interface StorageData<T> {
  value: T;
  expires?: number;
}

class Storage {
  private prefix: string;

  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  /**
   * 设置存储项
   * @param key 键
   * @param value 值
   * @param expires 过期时间（小时）
   */
  set<T>(key: string, value: T, expires?: number): void {
    const data: StorageData<T> = {
      value,
      ...(expires ? { expires: new Date().getTime() + expires * 3600 * 1000 } : {})
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(data));
  }

  /**
   * 获取存储项
   * @param key 键
   * @returns 值
   */
  get<T>(key: string): T | null {
    const item = localStorage.getItem(this.prefix + key);
    if (!item) return null;

    try {
      const data: StorageData<T> = JSON.parse(item);
      
      // 检查是否过期
      if (data.expires && data.expires < new Date().getTime()) {
        this.remove(key);
        return null;
      }
      
      return data.value;
    } catch {
      return null;
    }
  }

  /**
   * 移除存储项
   * @param key 键
   */
  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  /**
   * 清空所有存储项
   */
  clear(): void {
    localStorage.clear();
  }
}

export default new Storage();