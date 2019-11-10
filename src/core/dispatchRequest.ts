import { AxiosConfig, AxiosPromise, AxiosResponse } from "../type";
import xhr from "../xhr";
import { buildURL } from "../hepler/url";
import {  transformRequest, transformResponse  } from "../hepler/data";
import { processHeader } from "../hepler/header";

export default function dispatchRequest(config:AxiosConfig):AxiosPromise{  // 使用axios方法来进行http请求
    //TODO    
    processConfig(config) // 对url的参数进行处理
    return xhr(config).then(res=>{
        return transformResponseData(res)  // 处理返回的data信息
    }) // 调用xhr方法进行网络请求
}

function processConfig(config:AxiosConfig):void{  // 对url进行处理的主函数 调用各个副函数
    config.url = formatUrl(config) // 将config的url进行赋值
    config.headers = transformHeaders(config) // 必须在data前 如果在后面data解码后就会发生错误
    config.data = formatRequestData(config)
}

function formatUrl(config:AxiosConfig):string{ // 用来格式化拼接url 当使用get方法时
    const {url,params} = config  // 拿到url和参数进行url的格式化
    return buildURL(url!,params) // 类型断言（url!） 断言url不为空
}

function formatRequestData(config:AxiosConfig):any{  // 用来格式化data 
    return  transformRequest (config.data)
}

function transformHeaders(config:AxiosConfig):any{ // 用来处理header的函数 如果使用post方法需要指定header为content-type 
    const { headers = {},data} = config
    return processHeader(headers,data)
}

function transformResponseData(res:AxiosResponse):any{
     res.data = transformResponse(res.data)
     return res
}


