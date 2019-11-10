import { isPlainObject } from "./util";


// 将data转化为字符串
export function  transformRequest (data:any):any{
    if(isPlainObject(data)){
        return JSON.stringify(data)
    }
    return data
}

 // 将data转化为对象
export function  transformResponse(data:any):any{
    if(typeof data === 'string'){
        try {
            data = JSON.parse(data)
        } catch (error) {
            //do nothing
        }
    }
    return data
}