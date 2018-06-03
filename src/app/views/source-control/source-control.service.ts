import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Repository } from './repository';

@Injectable()
export class SourceControlService {
  private BASE_URL;
  
  constructor(private http:Http){
    this.BASE_URL = "http://localhost:4040";
  }
  
  private getOptions(method: string): RequestOptions {
    const headers = new Headers();
    if (method == 'GET' || method == 'DELETE') {
      headers.append('Accept', 'application/json');
    } else if (method == 'POST' || method == 'PUT') {
      headers.append('Content-type', 'application/json');
    }
    
    return new RequestOptions({
      headers: headers
    });
  }
  
  getRepositories(): Observable<Repository[]> {
        return this.http.get(`${this.BASE_URL}/repositories`, this.getOptions('GET'))
                .map( (res: Response) => {
                const body = res.json();
        				return body;
            })
            //.catch(this.handleError);
  }
  
  getFiles(repoID: Number): Observable<String[]>{
         return this.http.get(`${this.BASE_URL}/repositories/${repoID}/files`, this.getOptions('GET'))
                .map( (res: Response) => {
                const body = res.json();
        				return body;
            })
            //.catch(this.handleError); 
  }
  
  updateRepo(repoID: Number): Observable<any>{
            return this.http.post(`${this.BASE_URL}/repositories/${repoID}/update`, null, this.getOptions('POST'))
                .map( (res: Response) => {
                const body = res.json();
        				return body;
            })
            //.catch(this.handleError);  
  }
  
  createRepo(repository: Repository): Observable<any>{
            return this.http.post(`${this.BASE_URL}/repositories`, repository, this.getOptions('POST'))
                .map( (res: Response) => {
                const body = res.json();
        				return body;
            })
            //.catch(this.handleError);  
  }
  
  deleteRepo(repoID: Number): Observable<any>{
            return this.http.delete(`${this.BASE_URL}/repositories`, this.getOptions('DELETE'))
                .map( (res: Response) => {
                const body = res.json();
        				return body;
            })
            //.catch(this.handleError);  
  }
  
  
  
}