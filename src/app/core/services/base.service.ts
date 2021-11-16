import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private _headers!: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.setHeaders();
  }

  protected get<T>(uri: string, params: any = null): Observable<T> {
    return this._http.get<T>(`${API_URL}/${uri}`, {
      headers: this._headers,
      params: params
    });
  }

  protected post<T>(uri: string, params: any = null): Observable<T> {
    return this._http.post<T>(`${API_URL}/${uri}`, params, {
      headers: this._headers
    });
  }

  protected put<T>(uri: string, params: any = null): Observable<T> {
    return this._http.put<T>(`${API_URL}/${uri}`, params, {
      headers: this._headers
    });
  }

  protected delete<T>(uri: string): Observable<T> {
    return this._http.delete<T>(`${API_URL}/${uri}`, {
      headers: this._headers
    });
  }

  private setHeaders() {
    this._headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest');
  }
}
