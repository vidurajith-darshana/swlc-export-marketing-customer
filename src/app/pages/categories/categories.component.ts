import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

categoryName ='Angular ' + VERSION.major;
  

  category = [
    {categoryName:'Vlrkjdhjhjebdkljv'},
    {categoryName:'Ajkjnvjfnv'},
    {categoryName: 'djdhjkdhhdjkd'},
    {categoryName: 'djnjdnjdn'},
    {categoryName:'Vlrkjdhjhjebdkljv'},
    {categoryName:'Ajkjnvjfnv'},
    {categoryName: 'djdhjkdhhdjkd'},
    {categoryName: 'djnjdnjdn'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
