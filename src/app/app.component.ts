import{Component}from'@angular/core';
import {MatTableDataSource}from '@angular/material';
import {SelectionModel}from '@angular/cdk/collections';
import {ViewChild}from '@angular/core';



const ELEMENT_DATA: CSVRecord[] = [
{firstName: "Frank", lastName: "Riley", userName: "friley", "password": "changeme"},
{firstName: "Steve", lastName: "Brannigan", userName: "sbrannigan", "password": "changeme"},
{firstName: "Marie", lastName: "Ambrose", userName: "mambrose", "password": "changeme"},

];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public jsonFile : CSVRecord[] = [];

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
          console.log(this.jsonFile)
        }

        reader.onerror = function() {
          alert('Unable to read ' + input.files[0]);
        };

      } else {
        alert("Please import valid .csv file.");
        this.fileReset();
      }
  }

  public csvJSON(csv) {
      var lines = csv.split("\n");

      var result = [];

      var headers = lines[0].split(",");

      for (var i = 1; i < lines.length; i++) {

          var obj = {};
          var currentline = lines[i].split(',');

          for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
          }

          result.push(obj);

      }
      console.log(result)
      return result; //JavaScript object
      //return JSON.stringify(result); //JSON
  }


  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }



  fileReset() {
    this.fileImportInput.nativeElement.value = "";
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

export class CSVRecord{

  public firstName: any;
  public lastName: any;
  public userName: any;
  public password: any;


  constructor()
  {

  }
}
