import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { keys } from 'src/app/common/keys';

export const addHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};


export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(keys.ION_TOKEN)

    const clonedRequest = req.clone({ headers: token ? req.headers.append(keys.auth_token, token) : req.headers})

    return next.handle(clonedRequest)
  }

}
