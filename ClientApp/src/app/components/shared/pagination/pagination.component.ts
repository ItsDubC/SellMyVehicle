import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input("total-items") totalItems: number;
  @Input("page-size") pageSize: number;
  @Output("page-changed") pageChanged = new EventEmitter();
  currentPage = 1;
  pages: any[];

  constructor() { }

  ngOnInit() {
  }

  previous() {
    if (this.currentPage == 1)
      return;
      
    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  next() {
    if (this.currentPage == this.pages.length)
      return;

    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }

  changePage(pageNumber) {
    this.currentPage = pageNumber;
    this.pageChanged.emit(pageNumber);
  }

  ngOnChanges() {
    this.currentPage = 1;
        
		var pagesCount = Math.ceil(this.totalItems / this.pageSize); 
    this.pages = [];
    
		for (var i = 1; i <= pagesCount; i++)
			this.pages.push(i);

    console.log(this);
  }
}
