import { Component,OnInit } from '@angular/core';
import { TodoService } from '..//todo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'basic-crud-store',
  templateUrl: './crud-basic.component.html',
  styleUrls: ['./crud-basic.component.css']
})
export class CrudBasicComponent implements OnInit {

  todoList;
  constructor(public service: TodoService) { }

  ngOnInit() {
    this.service.getTodoList().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      this.todoList = customers;
    });
  }
  onSubmit() {
    if (this.service.form.valid) {
      this.service.insertTodo(this.service.form.value);
    }
  }

}