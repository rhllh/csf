import { Component, OnInit } from '@angular/core';
import { Book } from '../models';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  books: Book[] = []

  constructor(private svc: BookService) {}

  ngOnInit(): void {
    this.svc.getBooks()
      .then(books => {
        this.books = books
        console.log(books)
      })
      .catch(error => console.log(error))
  }


}
