import { AxiosConfig, AxiosResponse } from "../type"

export class AxiosError extends Error{
    isAxiosError:boolean
    config:AxiosConfig
    code?:string|null
    request?:any
    response?:AxiosResponse


    constructor(
        message: string,
        config: AxiosConfig,
        code?: string | null,
        request?: any,
        response?: AxiosResponse
      ) {
        super(message)
    
        this.config = config
        this.code = code
        this.request = request
        this.response = response
        this.isAxiosError = true

        Object.setPrototypeOf(this,Error.prototype) // Es6继承内置对象时 需要使用setPrototypeof方法 否则会出现自定方法无法调用
      }

}


export function createError(
    message: string,
    config: AxiosConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ): AxiosError {
    const error = new AxiosError(message, config, code, request, response)
  
    return error
  }