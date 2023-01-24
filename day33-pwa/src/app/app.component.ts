import { Component } from '@angular/core';
import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day33-pwa';

  task!: Task
  tasks: Task[] = []

  ngOnInit(): void {
    const jsonString = localStorage.getItem('tasks')
    if (!!jsonString) {
      this.tasks = JSON.parse(jsonString)
    }

    console.log(`app ngOnInit > ${this.tasks}`)
  }

  add(task: Task) {
    this.tasks.push(task)
    const jsonString = JSON.stringify(this.tasks)
    console.log(`json to save > ${jsonString}`)
    localStorage.setItem('tasks', jsonString)
  }

  update(tasks: Task[]) {
    const jsonString = JSON.stringify(this.tasks)
    console.log(`json after deleting > ${jsonString}`)
    localStorage.setItem('tasks', jsonString)
  }
}
