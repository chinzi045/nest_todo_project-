import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Constants } from "src/utils/constant";
// import { PassportModule } from "@nestjs/passport";

@Injectable()

export class AutheeGuard extends AuthGuard('jwt'){
    canActivate(context:ExecutionContext){

        const ctx=context.switchToHttp();
        const request=ctx.getRequest<Request>();

        for( let x=0;x < Constants.BY_PASS_URLS.length;x++){
            if(request.url==Constants.BY_PASS_URLS[x]) return true;
        }

        return super.canActivate(context)

    }
    
}