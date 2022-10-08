import { HttpClient } from '@angular/common/http';
import { Todo } from './../../Interfaces/Todo';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  url = 'https://localhost:44319/api/todo/';
  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }
  addItem(todoText: string): Observable<Todo> {
    return this.http.post<Todo>(this.url, { title: todoText });
  }

  deleteItem(id: number): Observable<Todo> {
    return this.http.delete<Todo>(this.url + id);
  }
  toggleItem(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.url + 'ToggleTodo/' + id);
  }
  getTodoItem(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.url + id);
  }
  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.url + todo.id, todo);
  }
}
