import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: any = [];
  @Input() dataSource: any = [];
  @Input() displayedColumns: any = [];
  @Output() handleClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
