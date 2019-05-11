import { Observable, throwError } from 'rxjs';

export abstract class BaseService {

  constructor() { }

  protected handleError(error: any) {
    console.log(error);
    const applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      // return Observable.throw(applicationError);
      return throwError(applicationError);
    }

    let modelStateErrors = '';
    const serverError = error.json();

    if (!serverError.type) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    modelStateErrors = '' ? null : modelStateErrors;
    // return Observable.throw(modelStateErrors || 'Server error');
    return throwError(modelStateErrors || 'Server error');
  }
}
