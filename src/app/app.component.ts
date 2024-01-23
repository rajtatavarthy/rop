import { Component } from '@angular/core';
import Handsontable from 'handsontable/base';
import { registerRenderer, textRenderer } from 'handsontable/renderers';
import { HotTableRegisterer } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TEST';

  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  
  tableSettings: any = {
    // rowHeaders: true,
    colHeaders: true,
    viewportColumnRenderingOffset: 27,
    viewportRowRenderingOffset: "auto",
    //colWidths: 150,
    height: 450,
    // allowInsertColumn: false,
    allowInsertRow: true,
    // allowRemoveColumn: false,
    // allowRemoveRow: false,
    // autoWrapRow: false,
    // autoWrapCol: false,
   // stretchH: "all",
    //width: 924,
    // autoWrapRow: true,
    //height: 487,
    // maxRows: 22,
    manualRowResize: true,
    manualColumnResize: true,
    rowHeaders: true,
     columns: [
        // { data: 'id', type: 'numeric' },
        { data: 'visitdate', type: 'date', dateFormat: 'MM/DD/YYYY', title: 'Visit date' },
        { data: 'name', type: 'text', title: 'NOM' },
        { data: 'dossier', title: 'Dossier'},
        { data: 'nicu', title: 'NICU#'},
        { data: 'joursnans', title: 'Jours Nans'},
        { data: 'tel', type: 'numeric', title: 'TEL'},
        { data: 'marasa', title: 'Marasa'},
        { data: 'sex', type: 'dropdown', source: ['', 'M', 'F'], title: 'Sex' },
        
        
      ],
    manualRowMove: true,
    manualColumnMove: true,
    contextMenu: true,
    filters: false,
    dropdownMenu: false
  }

  customRenderer() {
    console.log("Inside customRenderer: "+this.id);
    try {
      if (this.hotRegisterer.getInstance(this.id)) {
      
        let hot = this.hotRegisterer.getInstance(this.id);
        console.log("Second statement: "+hot);
        
        hot.updateSettings({
          renderer: function(instance, td, row, col, prop, value, cellProperties) {
              // textRenderer.apply(this, argumentsTyped);
              textRenderer.call(instance, instance, td, row, col, prop, value, cellProperties)
  
  
              const valueParser = parseInt(value);
              
  
              for (let i = 0; i < hot.countCols(); i++) {
                if (row === 1 && value === 'DESIREE') {  
                  hot.setCellMeta(1, i, 'className', 'green');
                  td.style.fontWeight = 'bold';
                } 
             }
           }
        })    
      }
      
    } catch (error) {
      console.log(error);
    }

  }
  
  ngAfterViewInit() {
  	this.customRenderer();
  }

  public saveData(event:any){
    console.log('SIVA: Button click captured');

    fetch('https://handsontable.com/docs/13.1/scripts/json/save.json', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: "" })
    })
      .then(response => {
        // exampleConsole.innerText = 'Data saved';
        console.log('The POST request is only used here for the demo purposes');
      });

  }

  
  dataset: any[] = [
    {id: 1, visitdate: '01/11/2024', name: 'BB OHTISE LOUIS LUCINE', dossier: '', nicu: '14', joursnans: '', tel:'', marasa: ''},
    {id: 2, visitdate: '01/15/2024', name: 'DESIREE', dossier: '', nicu: '15', joursnans: '', tel:'', marasa: ''},
    {id: 3, visitdate: '01/15/2024', name: 'DESIREE', dossier: '', nicu: '15', joursnans: '', tel:'', marasa: ''},
  ];


}



