//定义字面量对象类型 被AxiosConfig接口中的method使用
export type Method = 'get'|'GET'|'post'|'POST'|'delete'|'DELETE'|'put'|'PUT'|'head'|'HEAD'|'options'|'OPTIONS'|'patch'|'PATCH'

export interface AxiosConfig{
    url?:string,
    method?:Method, // 可选使用Method接口
    headers?:any, // 可选
    data?:any, // 可选
    params?:any //可选
    responseType?:XMLHttpRequestResponseType, // 可选 返回对服务端返回的数据类型 
    timeout?:number // 时间
}

export interface AxiosResponse<T = any>{
    data:T,
    status:number,
    statusText:string,
    headers:any,
    config:AxiosConfig,
    request:any,
    
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>>{

}


export interface AxiosError extends Error{  // 定义AxiosError接口供外层使用
    config:AxiosConfig,
    code?:string,
    request?:any,
    response?:AxiosResponse,
    isAxiosError:boolean
}

export interface Axios{
    request<T = any>(config: AxiosConfig): AxiosPromise<T>

    get<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  
    delete<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  
    head<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  
    options<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  
    post<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>
  
    put<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>
  
    patch<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>

}

export interface AxiosInstance extends Axios{
    <T=any>(config:AxiosConfig):AxiosPromise<T> // 两种传参方式 函数的重载

    <T=any>(url:string,config:AxiosConfig):AxiosPromise<T> // 两种传参方式 函数的重载
}