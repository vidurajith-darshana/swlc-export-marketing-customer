import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

categoryName ='Angular ' + VERSION.major;
  

  category = [
    {categoryName:'Hot Spices',categoryId:'1'},
    {categoryName:'Mild Spices',categoryId:'2'},
    {categoryName: 'Aromatic spices',categoryId:'3'},
    {categoryName: 'Herbs',categoryId:'4'},
    {categoryName: 'Aromatic spices',categoryId:'5'},
    {categoryName: 'Herbs2',categoryId:'6'},
    {categoryName: 'Herbs3',categoryId:'7'},
    {categoryName: 'Herbs',categoryId:'8'},
    
   
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
