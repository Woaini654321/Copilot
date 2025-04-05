// 资源类型枚举
export enum ResourceType {
  VIDEO = 'video',
  AUDIO = 'audio',
  PPT = 'ppt',
  DOCUMENT = 'document',
}

// 基础资源接口
export interface BaseResource {
  id: string;
  name: string;
  keywords: string[];
  createdAt: string;
  summary: string;
  type: ResourceType;
}

// 视频资源
export interface VideoResource extends BaseResource {
  type: ResourceType.VIDEO;
  coverUrl: string;
  duration: number; // 秒
}

// 音频资源
export interface AudioResource extends BaseResource {
  type: ResourceType.AUDIO;
  duration: number; // 秒
}

// PPT资源
export interface PPTResource extends BaseResource {
  type: ResourceType.PPT;
  coverUrl: string;
  size: number; // 字节
}

// 文档资源
export interface DocumentResource extends BaseResource {
  type: ResourceType.DOCUMENT;
  thumbnailUrl: string;
  size: number; // 字节
}

// 资源联合类型
export type Resource = VideoResource | AudioResource | PPTResource | DocumentResource;

// 分页请求参数
export interface ResourceQueryParams {
  page: number;
  pageSize: number;
  keyword?: string;
  type?: ResourceType;
}

// 分页响应数据
export interface ResourcePagination {
  total: number;
  page: number;
  pageSize: number;
  list: Resource[];
}