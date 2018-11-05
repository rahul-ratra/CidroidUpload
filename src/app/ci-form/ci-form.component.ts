import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CSVRecord} from './CSVRecord';

@Component({
  selector: 'app-ci-form',
  templateUrl: './ci-form.component.html',
  styleUrls: ['./ci-form.component.css']
})
export class CiFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public jsonFile: CSVRecord[] = [];

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    var text = [];
    var files = $event.srcElement.files;

    if (this.isCSVFile(files[0])) {

      var input = $event.target;
      var reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = (data) => {
        let csvData = reader.result;
        this.jsonFile = this.csvJSON(csvData);
        this.dataSource = new MatTableDataSource<CSVRecord>(this.jsonFile);
        console.log(this.jsonFile);
      };

      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  public csvJSON(csv) {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }
    console.log(result);
    return result;
  }


  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }


  fileReset() {
    this.fileImportInput.nativeElement.value = '';
    this.jsonFile = [];
  }

  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'userName', 'password'];
  dataSource = new MatTableDataSource<CSVRecord>(this.jsonFile);
  selection = new SelectionModel<CSVRecord>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

