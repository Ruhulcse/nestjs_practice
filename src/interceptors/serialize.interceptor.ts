import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass } from "class-transformer";

interface ClasssConstructor{
    new (...args:any[]):{}
}
export function Serialize(dto:ClasssConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}
export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
       
        return next.handle().pipe(
            map((data:any)=>{
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues:true
                })
            })
        )
    }
}