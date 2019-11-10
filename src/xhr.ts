import { AxiosConfig, AxiosPromise, AxiosResponse } from './type'
import { parseHeader } from './hepler/header'
import { transformResponse } from './hepler/data'
import { resolve } from 'path'
import { createError } from './hepler/error'


export default function xhr(config:AxiosConfig):AxiosPromise{
    return new Promise((resolve,reject)=>{

        const {data=null,url,method='get',headers,responseType,timeout} = config
    
        let request = new XMLHttpRequest()

        if (responseType) {
            request.responseType = responseType
          }
        if(timeout){
            request.timeout = timeout
        }
        request.open(method.toLocaleUpperCase(),url!,true)

        request.onreadystatechange = function handleLoad(){
            if(request.readyState !== 4){
                return 
            }

            if(request.status === 0){  // 当status为0时意味网络错误或连接错误
                return 
            }

            const responseHeaders  = request.getAllResponseHeaders()
            const responseData  =responseType && responseType !== 'text'? request.response : request.responseText
            const response:AxiosResponse = {
                data:responseData,
                headers:parseHeader(responseHeaders), //  调用parse方法将header转为对象
                status:request.status,
                statusText:request.statusText,
                config,
                request
            }
            handleResponse(response)
        }

        request.onerror = function handleError() {
            reject(createError(
              'Network Error',
              config,
              null,
              request
            ))
          }

          request.ontimeout = function handleTimeout() {
            reject(createError(
              `Timeout of ${config.timeout} ms exceeded`,
              config,
              'ECONNABORTED',
              request
            ))
          }

        Object.keys(headers).forEach(name=>{
            if(data === null && name.toLowerCase() === 'content-type'){
                delete headers[name]
            }else{
                request.setRequestHeader(name,headers[name])
            }
        })

        request.send(data)

        function handleResponse(response:AxiosResponse){
            if(response.status >= 200 && response.status <= 300){
                resolve(response)
            }else{
                reject(createError(
                    `Request failed with status code ${response.status}`,
                    config,
                    null,
                    request,
                    response
                  ))
            }
        }
    })
    
    

}