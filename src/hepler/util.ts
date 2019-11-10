const toString = Object.prototype.toString

export function isDate(val:any):val is Date{
    return toString.call(val) === "[object Date]"
}

export function isObject(val:any):val is Object{
    return val !== null && typeof val === 'object'
}

export function isPlainObject(val:any):val is Object{  // 判断是否为普通对象
    return toString.call(val) === '[object Object]'
}


export function extend<T,U>(to:T,from:U):T & U{   // 扩展接口 实现混合对象的辅助函数
    for(const key in from){
        ;(to as T & U )[key]  = from[key] as any
    }

    return to as T & U
}