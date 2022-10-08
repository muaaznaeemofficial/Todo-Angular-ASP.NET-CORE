import { Observable, of } from 'rxjs';
import { TodoService } from './../../Services/TodoService/Todo.service';
import { Todo } from './../../Interfaces/Todo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  todoForm = new FormGroup({
    id: new FormControl(''),
    todoText: new FormControl(''),
  });
  todoList: Todo[] = [];
  todoText?: string;
  isEditMode: boolean = false;

  constructor(private todoService: TodoService) {}
  ngOnInit() {
    this.loadList();
  }
  loadList() {
    this.todoService.getTodoList().subscribe({
      next: (data: Todo[]) => {
        this.todoList = data;

        console.log(data.length);
      },
      error: (error) => console.log(error),
    });
  }
  playAudio() {
    let audio: HTMLAudioElement = new Audio(
      'https://nzt6ku-a.akamaihd.net/downloads/ringtones/files/mp3/facebook-messenger-tone-wapking-fm-mp3-17015-19072-43455.mp3'
    );
    audio.play();
  }
  OnSubmit() {
    let id = this.todoForm.controls['id'].value;
    if (id != '' && id != null) {
      //update
      this.onUpdate();
    } else {
      let text = this.todoForm.controls['todoText'].value;
      if (text != '' && text !== undefined) {
        this.todoService.addItem(text as string).subscribe({
          next: (data: Todo) => {
            this.todoList?.push(data);
            this.todoForm.reset();
          },
          error: (error) => console.log(error),
        });
      }
    }
  }

  onDelete(id: number) {
    this.todoService.deleteItem(id).subscribe({
      next: (data: Todo) => {
        this.todoList = this.todoList?.filter((x) => x.id !== data.id);
      },
      error: (error) => console.log(error),
    });

    this.loadList();
  }
  onCheckUncheckItem(id: number) {
    this.todoService.toggleItem(id).subscribe({
      next: (data: Todo) => {
        this.todoList?.forEach((element) => {
          if (element.id === id) {
            element.isCompleted = data.isCompleted;
            if (element.isCompleted) this.playAudio();
          }
        });
      },
      error: (error) => console.log(error),
    });
  }
  onPopulateForm(id: number) {
    this.isEditMode = true;
    this.todoService.getTodoItem(id).subscribe({
      next: (data: Todo) => {
        this.todoForm.controls['todoText'].setValue(data.title as string);
        this.todoForm.controls['id'].setValue(data.id.toString());
      },
      error: (error) => console.log(error),
    });
  }
  onUpdate() {
    let id = this.todoForm.controls['id'].value;
    let text = this.todoForm.controls['todoText'].value;
    console.log(id);
    if (text != null && id != null)
      this.todoService.updateTodo({ id: Number(id), title: text }).subscribe({
        next: (data: Todo) => {
          this.todoList?.forEach((element) => {
            if (element.id === data.id) {
              element.title = data.title;
            }
          });
          this.todoForm.reset();
          this.isEditMode = false;
        },
        error: (error) => console.log(error),
      });
  }
  onReset() {
    this.isEditMode = false;
    this.todoForm.reset();
  }
}
