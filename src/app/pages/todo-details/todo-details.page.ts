import { TaskI } from './../../models/Itask.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  item: TaskI = {
    task:'',
    priority : 0
  };
  itemId = null;
  constructor(private route:ActivatedRoute, private nav:NavController, private todoSvc:TodoService, private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.params['id'];
    if(this.itemId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();
    this.todoSvc.getTodo(this.itemId).subscribe(respuesta=>{
      loading.dismiss();
      this.item = respuesta;
    });
  }

  async onClickSave() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.itemId) {
      this.todoSvc.updateTodo(this.item, this.itemId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      this.todoSvc.addTodo(this.item).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  onRemove(idItem:string){
    this.todoSvc.removeTodo(idItem);
  }
}
