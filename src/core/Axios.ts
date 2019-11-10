import { AxiosConfig, AxiosPromise, Method } from "../type"
import dispatchRequest from "./dispatchRequest"

export default class Axios{
    request(url:any,config:any):AxiosPromise{
        if(typeof url === 'string'){
           if(!config){
               config = {}
           }
           config.url = url
        }else{
            config = url  //7节函数的重载
        }
        return dispatchRequest(config)
    }

    get(url:string,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithoutData(url,'get',config)
    }

    delete(url:string,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithoutData(url,'delete',config)
    }

    options(url:string,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithoutData(url,'options',config)
    }

    head(url:string,method:Method,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithoutData(url,'head',config)
    }


    post(url:string,data?:any,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithData(url,'post',data,config)
    }
    put(url:string,data?:any,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithData(url,'put',data,config)
    }
    patch(url:string,data?:any,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithData(url,'patch',data,config)
    }


    _requestMethodWithoutData(url:string,method:Method,config?:AxiosConfig){
        return this.request(Object.assign(config || {},{
            url,
            method
        }))
    }

    _requestMethodWithData(url:string,method:Method,data?:any,config?:AxiosConfig){
        return this.request(Object.assign(config || {},{
            url,
            method,
            data
        }))
    }
}