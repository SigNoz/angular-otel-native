import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
 
@Component({
  selector: 'app-root',
  template: `
    <button
      (click)="btnClick()"
      id="my-awesome-button"
      class="some-classy-button"
    >
      Click me
    </button>
  `,
  styles: [],
  standalone: true,
})
export class AppComponent {
  constructor(private http: HttpClient) {}
 
  btnClick() {
    this.http
      .get<{id:number, title:string}[]>('http://localhost:5555/')
      .subscribe((todos) => {
        for (const i of (todos).filter((todo) => todo.id <= 10)) {
          this.http
            .get('https://jsonplaceholder.typicode.com/todos/' + i.id)
            .subscribe();
        }
      });
  }
}