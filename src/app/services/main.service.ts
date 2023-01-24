import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMintCount() {
    let url = 'mintInfo/63c8f8bca36c314c39abf38f';
    return this.http.get(this.apiUrl + url, {});
  }
}
