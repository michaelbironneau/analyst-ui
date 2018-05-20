import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import { Task } from './task';
import { Invocation } from './invocation';

@Injectable()
export class SchedulerService {
  public getTasks(): Observable<Task[]> {
    return Observable.of([{
      id: 1,
      name: "Task 1",
      enabled: true,
      next_run: new Date(),
  
    },{
      id: 2,
      name: "Task 2",
      enabled: false,
      next_run: null,
    }])
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
