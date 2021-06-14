import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

categoryName ='Angular ' + VERSION.major;
  

  category = [
    {categoryName:'Hot Spices'},
    {categoryName:'Mild Spices'},
    {categoryName: 'Aromatic spices'},
    {categoryName: 'Herbs'},
    {categoryName: 'Aromatic spices'},
    {categoryName: 'Herbs2'},
    {categoryName: 'Herbs3'},
    {categoryName: 'Herbs'},
    
   
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
