import { isPlainObject } from "./util";


// 对header的content-type进行检测
function normalizeHeader(headers:any,normalizeName:string):void{
    if(!headers){  // 不存在返回
        return
    }
    Object.keys(headers).forEach(name=>{  // 遍历header找到name和normalizeName的对应值是否相同
        if(headers[name] !== headers[normalizeName] && name.toUpperCase() === normalizeName){
            headers[normalizeName] = headers[name]
        }
        delete headers[name]  // 如果只是大小写则将header[name]删除
    })
}

//使用post方法时对header的content-type设置为application/json 自动
export function processHeader(headers:any,data:any):any{ // data为requestData检测data是否为普通对象如果不是什么都不做
    normalizeHeader(headers,'Content-Type')

    if(isPlainObject(data)){
        if(headers && !headers['content-type']){
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }

    return headers // 为什么返回的是any类型  因为除了普通的对象 还会有很多不同的类型如 formdata 等
}


//将header转化为对象
export function parseHeader(header:string):any{ 
    let parsed = Object.create(null)
    if(!header){
        return
    }

    header.split('\r\n').forEach(line=>{
        let [key,val] = line.split(":")
        key = key.toLowerCase().trim()
        if(!key){
            return
        }
        if(val){
            val = val.trim()
        }

        parsed[key] = val
    })
    return parsed
}