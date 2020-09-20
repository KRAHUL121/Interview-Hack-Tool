import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TodoService {

  constructor(private firebase: AngularFireDatabase) { }

  todoList: AngularFireList<any>;
  addButton: string = 'ADD';

  form: FormGroup = new FormGroup({
    key: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });


  getTodoList() {
    this.todoList = this.firebase.list('todolist');
    return this.todoList.snapshotChanges();
  }
  insertTodo(todo) {
    if (todo.key == '') {
      this.todoList.push(todo);
    } else {
      this.todoList.update(todo.key, {
        title: todo.title,
        description: todo.description
      });
    }
    this.resetForm();

  }
  editTodoList(todo: any) {
    todo
    this.form.patchValue(todo);
    this.addButton = 'UPDATE';
  }
  deleteTodoList($key: string) {
    this.todoList.remove($key);
  }
  resetForm() {
    this.addButton = 'ADD';
    this.form.reset();
  }

}