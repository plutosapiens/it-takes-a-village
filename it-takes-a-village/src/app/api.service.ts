import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCatalog() {
    const { apiUrl } = environment;

    return this.http.get<any>(`${apiUrl}/catalog`);
  }
}
