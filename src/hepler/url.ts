import {isDate,isObject} from "./util"

function encode(val:string):string{
    return encodeURIComponent(val)
            .replace(/%40/g, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']')
}

export function buildURL(url:string,params?:any):string{
    if(!params){ // 没有传入参数直接返回
        return url
    }

    const parts:string[] = [] // 定义一个字符串数组 后面使用&拼接

    Object.keys(params).forEach(key=>{
        let val = params[key]
        if(val === null || typeof val === 'undefined'){  // 如果为null或者undefined 则直接退出
            return 
        }

        let values:string[]
        if(Array.isArray(val)){
            values = val // 将该数组赋值给values
            key += '[]'
        }else{
            values = [val] // 将val插入一个数组中赋值给values
        }

        values.forEach(val=>{
            if(isDate(val)){  // 判断拿到的val是否为DATE类型 转化
                val = val.toISOString()
            }else if(isObject(val)){ // 判断拿到的val是否为Obj类型 转化
                val = JSON.stringify(val)
            }

            parts.push(`${encode(key)}=${encode(val)}`) 
        })
    })
    
    let serializedParams = parts.join('&') // 使用&来拼接字符串数组
    
    if(serializedParams){
        const markIndex = url.indexOf('#')  // 判断是否有哈希值 如果有哈希值截取从零到哈希值出现的位置
        if(markIndex !== -1){
            url = url.slice(0,markIndex)
        }
    }

    url += (url.indexOf('?')?'?':'&') + serializedParams  // 判断是否有？ 
    return url
}


// import { isDate, isObject } from './util'

// function encode (val: string): string {
//   return encodeURIComponent(val)
//     .replace(/%40/g, '@')
//     .replace(/%3A/gi, ':')
//     .replace(/%24/g, '$')
//     .replace(/%2C/gi, ',')
//     .replace(/%20/g, '+')
//     .replace(/%5B/gi, '[')
//     .replace(/%5D/gi, ']')
// }

// export function bulidURL (url: string, params?: any) {
//   if (!params) {
//     return url
//   }

//   const parts: string[] = []

//   Object.keys(params).forEach((key) => {
//     let val = params[key]
//     if (val === null || typeof val === 'undefined') {
//       return
//     }
//     let values: string[]
//     if (Array.isArray(val)) {
//       values = val
//       key += '[]'
//     } else {
//       values = [val]
//     }
//     values.forEach((val) => {
//       if (isDate(val)) {
//         val = val.toISOString()
//       } else if (isObject(val)) {
//         val = JSON.stringify(val)
//       }
//       parts.push(`${encode(key)}=${encode(val)}`)
//     })
//   })

//   let serializedParams = parts.join('&')

//   if (serializedParams) {
//     const markIndex = url.indexOf('#')
//     if (markIndex !== -1) {
//       url = url.slice(0, markIndex)
//     }

//     url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
//   }

//   return url
// }
