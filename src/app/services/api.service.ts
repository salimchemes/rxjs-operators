import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://jsonplaceholder.typicode.com';

  getPosts() {
    return this.httpClient.get(
      `${'https://jsonplaceholder.typicode.com'}/posts`
    );
  }

  getComments() {
    return this.httpClient.get(
      `${'https://jsonplaceholder.typicode.com'}/comments`
    );
  }
}
