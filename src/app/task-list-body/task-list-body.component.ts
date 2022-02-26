import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-task-list-body',
  templateUrl: './task-list-body.component.html',
  styleUrls: ['./task-list-body.component.scss'],
})
export class TaskListBodyComponent implements OnInit {
  taskList: string[] = [];
  db;

  constructor(private dbService: NgxIndexedDBService) {}

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.dbService.getAll('people').subscribe(async (x) => {
      this.db = x;
    });
  }

  todoList(event): any {
    this.dbService
      .add('people', { name: event.target.value, key: null })
      .subscribe((x) => {
        console.log(x);
      });

    this.dbService.getAll('people').subscribe(async (x) => {
      this.db = x;
    });
  }

  // tslint:disable-next-line:typedef
  async deleteItem(index) {
    this.dbService.delete('people', index).subscribe((status) => {
      console.log(status);
      this.db = status;
    });
  }
}
