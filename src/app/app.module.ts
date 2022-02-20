import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListBodyComponent } from './task-list-body/task-list-body.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { FormsModule } from '@angular/forms';

// tslint:disable-next-line:typedef
export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db, transaction) => {
      const store = transaction.objectStore('people');
      store.createIndex('country', 'country', { unique: false });
    },
    3: (db, transaction) => {
      const store = transaction.objectStore('people');
      store.createIndex('age', 'age', { unique: false });
    }
  };
}

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 3,
  objectStoresMeta: [{
    store: 'people',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } }
    ]
  }],
  // provide the migration factory to the DBConfig
  migrationFactory
};

@NgModule({
  declarations: [AppComponent, TaskListBodyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
