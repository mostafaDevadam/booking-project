import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const HotelDecorator = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {

        const request = ctx.switchToHttp().getRequest()
        console.log("@: ", data, request.body)
        return request
    }
)
