import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import { Task } from './task';
import { Invocation } from './invocation';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';


@Injectable()
export class SchedulerService {
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
  
  public getTasks(): Observable<Task[]> {
    return this.http.get(`${this.BASE_URL}/tasks`, this.getOptions('GET'))
                .map( (res: Response) => {
                const body = res.json();
        				return body;
            })
            //.catch(this.handleError);
  }
  
  public createTask(task: Task): Observable<Task> {
     return this.http.post(`${this.BASE_URL}/tasks`, task, this.getOptions('POST'))
                .map( (res: Response) => {
                const body = res.json();
        				return body;
            })
            //.catch(this.handleError);   
  }
  
  public deleteTask(taskID: Number): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/tasks/${taskID}`, this.getOptions('DELETE'))
                .map( (res: Response) => {
                return Observable.of(null)
            })
            //.catch(this.handleError);   
  }
  
  public getInvocations(taskId: Number): Observable<Invocation[]> {
    const t = new Date();
    const t1 = new Date(t.getTime() - 1000*30);
    const t2 = new Date(t.getTime() + 1000*30);
     return Observable.of([{
      id: 1,
      task_id: taskId,
      start: t1,
      finish: t2,
      success: true,  
    },{
      id: 2,
      task_id: taskId,
      start: t1,
      finish: t2,
      success: false,  
    }])
  }
}
