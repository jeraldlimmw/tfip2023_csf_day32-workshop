import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { Todo } from './models';
import { Subject } from 'rxjs';
import { CreateComponent } from './components/create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  // @ViewChild(CreateComponent) - look for an instance of CreateComponent
  @ViewChild('todo') // using template reference
  createComp!: CreateComponent

  todo!: Todo | null
  todoArr: Todo[] = []

  ngOnInit(): void {
    console.info('>> onInit ', this.createComp);
  }

  ngAfterViewInit(): void {
    console.info('>> onAfterViewInit ', this.createComp)
    // perform manual attribute binding
    // this.createComp.value = this.todo
    // this.createComp.onSave.subscribe(
    //   (event: Todo) => {
    //     console.info('>> new todo: ', event)
    //     this.saveNewTodo(event)
    //   }
    // )
  }

  // save new Todo
  saveNewTodo(t: Todo) {
    this.todoArr.push(t)
  }

  // delete Todo from todoArr
  deleteTodo(td: Todo) {
    let index = this.todoArr.findIndex(t => t.title == td.title)
    this.todoArr.splice(index,1)
  }

  // retrieve Todo from todoArr to edit
  getTodoFromList(td: Todo) {
    this.todo = td
    console.info('>> selectedTodo: ', this.todo)
    this.deleteTodo(td)
  }
}
