import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { Item } from "../shared/item"

//tiltes layou
export interface Tile {
  cols: number;
  rows: number;
  text: string;
  border: string;
 }

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  Item: any = [];
  tiles: Tile[] = [
    {text: 'Tile 1', cols: 2, rows: 1 ,border: '3px double purple'},
    {text: 'Tile 2', cols: 2, rows: 1 ,border: '3px double red'},
    {text: 'Tile 3', cols: 2, rows: 1 ,border: '3px double skyblue'},
    {text: 'Tile 4', cols: 2, rows: 1 ,border: '3px double yellow'},
    {text: 'Tile 5', cols: 2, rows: 1 ,border: '3px double green'},
    ];

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  // Get employees list
  loadItems() {
    console.log(this.Item.length)
    return this.restApi.getItems().subscribe((data: {}) => {
      this.Item = data;
    })
  }

  // Delete Item 
  /*
  deleteItem(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteItem(id).subscribe(data => {
        this.loadItems()
      })
    }
  }  */

}
