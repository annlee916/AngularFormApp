import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GamaData} from './gama-data';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class RestApiService {
  // Define API
  apiURL = 'https://localhost:7270/GamaData';

  constructor( private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
  };
  
  // Post to service
  public postData(gamadata:GamaData):string {

    let repos;

      this.http
       .post<any>(
         this.apiURL,
         JSON.stringify(gamadata),
         this.httpOptions
         ).pipe(                  //Handle response
          catchError(this.handleError)  )
          .subscribe(
          (response) => {                     
            console.log(response)
            window.alert('Data Saved');
            repos = response;}
          );
        ;
         return 'OK';
  }
  
  // Error handling
  handleError(error: Response | any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Server side error \nCode: ${error.status}\n`;     
    }

    //show error to client
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}