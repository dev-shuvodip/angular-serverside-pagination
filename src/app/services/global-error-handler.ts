import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()

export class GlobalErrorHandler implements ErrorHandler {
    handleError(err: HttpErrorResponse): Observable<User> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }

        return throwError(() => new Error(err.error));
    }
}