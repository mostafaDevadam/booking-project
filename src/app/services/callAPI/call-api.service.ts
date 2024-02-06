import { HttpClient, HttpContextToken, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { METHODS_REQUEST_ENUM } from '../../common/enums';

const apiURL = environment.API_URL


@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  private headers = new Headers()

  constructor(private http: HttpClient) { }


  buildHeaders = (): any => {
    const token = localStorage.getItem('ION_TOKEN')//?.toString()
    if (token) {
      this.headers.append('auth-token', token)
      return this.headers
    }
  }

  sendRequest = (method: METHODS_REQUEST_ENUM, url: string, data?: any) => {

  }

  get = async (url: string) => {
    return this.http.get(apiURL + url, {
     // headers: this.buildHeaders()

    })
  }

  post = async (url: string, data: any) => {
    return this.http.post(apiURL + url, data, {
      //headers: this.buildHeaders()
    })
  }

  patch = async (url: string, data: any) => {
    return this.http.patch(apiURL + url, data, {
      //headers: this.buildHeaders()
    })
  }

  remove = async (url: string) => {
    return this.http.delete(apiURL + url, {
      //headers: this.buildHeaders()
    })
  }

}
