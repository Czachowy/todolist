import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Task} from "../task";
import {environment} from "../../../../environments/environment";
import {map, Observable, switchMap, tap} from "rxjs";
import {CreateTaskDto} from "../create-task/create-task.dto";
import {EditTaskDto} from "../edit-task/edit-task.dto";

@Injectable()
export class TaskListService {
  constructor(private http: HttpClient) {
  }

  createTask(createTask: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/todos`, createTask)
     .pipe(
        map((task: Task) => ({
          ...task,
          date: new Date(),
        })),
      );
  }

  updateTask(id: number, task: EditTaskDto): Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/todos/${id}`, task)
     .pipe(
        map((task: Task) => ({
         ...task,
          date: new Date(),
        })),
      );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/todos/${id}`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + '/todos')
      .pipe(
        //Mock na przypisanie daty, której nie ma w API
        map(tasks => tasks.map(task => ({
          ...task,
            date: task.date ? task.date : new Date()
        }))),
      );
  }
}
