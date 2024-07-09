import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import {message} from "antd";

// 与后端约定的响应数据格式
interface ResponseStructure {
  data: any;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  timeout: 1000000,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理
      const url = config?.url;
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      console.log(data);
      if (data.code === 0) {
        return data;
      }
      if (data.code === 40100) {
        message.error('Please log in first');
      } else {
        message.error(data.description);
      }
      return data;
    },
  ],
};
