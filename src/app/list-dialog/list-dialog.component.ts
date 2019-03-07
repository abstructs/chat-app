import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent implements OnInit {

  list: String[];

  get items() {
    return this.list;
  }

  constructor(public dialogRef:  MatDialogRef<ListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.list = data.list;
  }

  ngOnInit() {
    // this.list = [];
  }
}
