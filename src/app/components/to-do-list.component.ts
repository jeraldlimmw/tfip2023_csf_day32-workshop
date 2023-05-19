import { Component, Input, Output } from '@angular/core';
import { Todo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {

  @Input()
  todoList: Todo[] = []

  // pass selected Todo from list to AppComponent to display in CreateComponent
  @Output()
  onEditSelected = new Subject<Todo>()

  @Output()
  onDeleteSelected = new Subject<Todo>()

  // select the Todo from the array using index i
  editSelected(i: number) {
    this.onEditSelected.next(this.todoList[i])
  }

  deleteSelected(i: number) {
    this.onDeleteSelected.next(this.todoList[i])
  }

}
