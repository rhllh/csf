import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  param$!: Subscription
  book!: Book

  constructor(private ar: ActivatedRoute, private svc: BookService) {}

  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        const bookId = params['bookId']
        this.svc.getBookById(bookId).then(
          results => {
            this.book = results
            console.log(this.book)
          }
        ).catch(error => console.log(error))
      }
    )
  }

}
