import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  timeout: 10000 // aumentar el tiempo de espera a 10 segundos
};

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  URL = "http://localhost:8080/login";

  //   login(creds: any) {
  //     return this.http.post("http://localhost:8080/api/v1/auth/authenticate", creds, {
  //       observe: 'response'
  //     })
  //       .pipe(
  //         map((response: HttpResponse<any>) => {

  //           const body = response.body;
  //           const headers = response.headers;

  //           const bearerToken = headers.get('Authorization')!;
  //           const token = bearerToken.replace('Bearer ', '');

  //           localStorage.setItem('token', token);
  //           return token;

  //         }))
  //   }

  // login(creds:any){
  //   return this.http.post<any>("http://localhost:8080/api/v1/auth/authenticate", creds)
  //       .pipe(
  //         map(response => {
  //           // login successful if there's a jwt token in the response
  //           const token = response && response.token;
  //           if (token) {
  //             // store user details and jwt token in local storage to keep user logged in between page refreshes
  //             localStorage.setItem('currentUser', JSON.stringify({ creds, token }));
  //           }
  //           console.log(" ############################################################# ")
  //           return response;
  //         })
  //       );
  //   }

  login(creds: any): Observable<any> {
    const credentials = { creds };
    return this.http.post("http://localhost:8080/api/v1/auth/authenticate", creds).pipe(
      tap((response: any) => {

        console.log("Respuesta")
        console.log(response)
        console.log("Respuesta")

        const token = response.token;
        const currentUser = response.userId;

        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", currentUser);
      })
    );
  }

  logout() {
    console.log("localStorage eliminado")
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    return this.http.get("/api/v1/auth/logout") // ruta para hacer logout en el backend
  }


  getToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    return localStorage.getItem("currentUser");
  }



}