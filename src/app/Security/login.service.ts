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

// console.log("Este es el response")
// console.log(response)
// console.log("Este es el response")

// console.log("1")
//           const body = response.body;
//           console.log("2")
//           const headers = response.headers;
//           console.log("3")
//           console.log("estos son los headers")
//           console.log(headers)

//           const bearerToken = headers.get('Authorization')!;
//           console.log("4")
//           console.log("ESte es el bearer token")
//           console.log(bearerToken)
//           const token = bearerToken.replace('Bearer ', '');
//           console.log("5")

//           localStorage.setItem('token', token);
//           console.log("6")
//           return token;

//         }))
//   }

// login(creds:any){
//   console.log(" ############################################################# ")
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

login(creds:any): Observable<any> {
  const credentials = { creds };
  return this.http.post("http://localhost:8080/api/v1/auth/authenticate", creds).pipe(
    tap((response: any) => {
      const token = response.token;
      localStorage.setItem("token", token);
    })
  );
}


  getToken() {
    return localStorage.getItem('token');
  }



}