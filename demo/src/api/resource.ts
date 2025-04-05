import { get, post, del } from '@/utils/request';
import type { Resource, ResourceQueryParams, ResourcePagination, ResourceType } from '@/types/resource';

// 获取资源列表
export function getResourceList(params: ResourceQueryParams) {
  return get<ResourcePagination>('/resource/list', params);
}

// 获取资源详情
export function getResourceDetail(id: string) {
  return get<Resource>(`/resource/${id}`);
}

// 创建资源
export function createResource(data: Partial<Resource>) {
  return post<Resource>('/resource', data);
}

// 更新资源
export function updateResource(id: string, data: Partial<Resource>) {
  return post<Resource>(`/resource/${id}`, data);
}

// 删除资源
export function deleteResource(id: string) {
  return del<boolean>(`/resource/${id}`);
}

// 根据类型获取资源
export function getResourcesByType(type: ResourceType, params: Omit<ResourceQueryParams, 'type'>) {
  return get<ResourcePagination>(`/resource/type/${type}`, params);
}