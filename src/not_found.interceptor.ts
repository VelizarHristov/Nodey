import { Injectable, NestInterceptor, ExecutionContext, NotFoundException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// If the output is null, return a 404 error instead
@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(private errorMessage: string = "No object found with this ID") { }

  intercept(context: ExecutionContext, stream$: CallHandler): Observable<any> {
    return stream$.handle().pipe(tap(data => {
        if (data === null)
            throw new NotFoundException(this.errorMessage);
      }));
  }
}
