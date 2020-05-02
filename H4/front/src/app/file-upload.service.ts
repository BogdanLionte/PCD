import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) {
  }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'http://localhost:8080';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.httpClient
      .post(endpoint, formData, {headers});
  }

}
