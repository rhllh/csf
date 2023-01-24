import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Task } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  form!: FormGroup

  task!: Task

  currentDate: String = new Date().toISOString().substring(0,10)

  @Output() onAdd = new Subject<Task>()
  @Output() onUpdate = new Subject<Task[]>()
  @Input() tasks!: Task[]

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm()
    console.log(`today's date > ${this.currentDate}`)
  }

  processForm() {
    this.task = this.form.value as Task
    console.log(`task > ${this.task.description}, ${this.task.priority}, ${this.task.dueDate}`)
    this.onAdd.next(this.task)
  }
  
  delete(i: number) {
    this.tasks.splice(i,1)
    this.onUpdate.next(this.tasks)
  }

  completed(i: number) {
    this.tasks[i].completed = true
    this.onUpdate.next(this.tasks)
  }

  private createForm(): FormGroup {
    return this.fb.group({
      description: this.fb.control<string>('', [ Validators.required ]),
      priority: this.fb.control<string>('low'),
      dueDate: this.fb.control<Date>(new Date()),
      completed: this.fb.control<boolean>(false)
    })
  }

}
