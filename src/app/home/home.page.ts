import { TaskI } from './../models/Itask.interface';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: TaskI[];

  constructor(private todoSvc:TodoService) {}

  ngOnInit(){
    this.todoSvc.getTodos().subscribe(respuesta=> this.todos = respuesta);
  }
  
}
