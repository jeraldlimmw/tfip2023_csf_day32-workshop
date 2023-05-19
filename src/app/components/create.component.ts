import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, Todo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnChanges {

  @Input()
  savedTodo: Todo | null = null

  @Output()
  onSave = new Subject<Todo>()

  fb: FormBuilder = inject(FormBuilder)  

  todoForm!: FormGroup
  tasksArray!: FormArray

  // get Todo from form
  get value(): Todo {
    return this.todoForm.value as Todo
  }
  set value(t:Todo | null) {
    this.savedTodo = t
    this.todoForm = this.createForm(t)
  }

  ngOnInit(): void {
    console.info(">>>> form component initialising")
    this.todoForm = this.createForm(this.savedTodo)
  }

  // detects change from parent AppComponent to the input 'savedTodo'
  // when there is a change, return the form with the values of 'savedTodo'
  ngOnChanges(changes: SimpleChanges): void {
      console.info(changes)
      const c = changes['savedTodo']
      if(c.firstChange)
        return 
      this.todoForm = this.createForm(c.currentValue as Todo)
  }

  // create FormGroup with Task t or null
  private createForm(t: Todo | null): FormGroup {
    this.tasksArray = this.createTaskArr(!!t? t.tasks : [])
    return this.fb.group({
      title: this.fb.control<string>(!!t? t.title : '', 
          [ Validators.required, Validators.minLength(3) ]),
      name: this.fb.control<string>(!!t? t.name : '',
          [ Validators.required, Validators.minLength(3) ]),
      tasks: this.tasksArray
    })
  }

  // create FormArray of tasks
  // from array of tasks, create individual task FormGroups
  private createTaskArr(tasks: Task[]): FormArray {
    return this.fb.array(
      tasks.map(t => this.createTask(t))
    )
  }

  // create FormGroup with Task t or null
  private createTask(t: Task | null): FormGroup {
    return this.fb.group({
      task: this.fb.control<string>(!!t? t.task : ''),
      priority: this.fb.control<number>(!!t? t.priority : 0),
      dueDate: this.fb.control<string>(!!t? t.dueDate : '')
    })
  }

  // methods
  processForm() {
    const todo = this.todoForm.value as Todo
    console.info(">>>> processing form", todo)
    this.onSave.next(todo)
    this.todoForm = this.createForm(null)
  }

  addTask() {
    this.tasksArray.push(
      this.createTask(null)
    )
  }

  removeTask(i: number) {
    this.tasksArray.removeAt(i)
  }
}
