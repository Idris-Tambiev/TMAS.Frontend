import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FileService {
  configUrl: string = environment.Url;
  constructor(private http: HttpClient) {}

  uploadFile(file, cardId: number): Observable<any> {
    const params = new HttpParams().set('id', cardId.toString());
    return this.http.post(this.configUrl + '/api/files/upload', file, {
      params,
    });
  }

  getFiles(cardId: number): Observable<any> {
    const params = new HttpParams().set('id', cardId.toString());
    return this.http.get(this.configUrl + '/api/files/get', {
      params,
    });
  }
}
