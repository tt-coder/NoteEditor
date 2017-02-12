var grid = document.getElementById('grid');

var data = [];

var table = new Handsontable(grid, {
  data: data,
  dataSchema: {
    ID: null,
    BPM: null,
    lane0: null,
    lane1: null,
    lane2: null,
    lane3: null,
    lane4: null,
    lane5: null,
    lane6: null,
    lane7: null,
    lane8: null,
    Count: null
  },
  columns: [
    {data: 'ID'},
    {data: 'BPM'},
    {data: 'lane0'},
    {data: 'lane1'},
    {data: 'lane2'},
    {data: 'lane3'},
    {data: 'lane4'},
    {data: 'lane5'},
    {data: 'lane6'},
    {data: 'lane7'},
    {data: 'lane8'},
    {data: 'Count'}
  ],
  colWidths: [50,90,50,50,50,50,50,50,50,50,50,60],
  colHeaders:["小節","BPM/拍子","lane0","lane1","lane2","lane3","lane4","lane5","lane6","lane7","lane8","Count"],
  minSpareRows: 1,
  contextMenu: true,
  enterBeginsEditing: false,
  mergeCells:[
     //{row: 0, col: 0, rowspan: 1, colspan: 2}
  ]
});

document.getElementById("add").addEventListener("click",function(){
  var rows;
  for(var i=0;i<8;i++){
    rows = table.countRows();
    table.alter("insert_row",rows);
  }
  table.render();
});

Handsontable.hooks.add("afterSelection", function(){
  var selected = table.getSelected();
  console.log(selected.getValue());
});