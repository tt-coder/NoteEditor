var grid = document.getElementById('grid');

var data = [];

yellowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'yellow';

};

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
    {data: 'ID', readOnly: true},
    {data: 'BPM', readOnly: true},
    {data: 'lane0', readOnly: true},
    {data: 'lane1', readOnly: true},
    {data: 'lane2', readOnly: true},
    {data: 'lane3', readOnly: true},
    {data: 'lane4', readOnly: true},
    {data: 'lane5', readOnly: true},
    {data: 'lane6', readOnly: true},
    {data: 'lane7', readOnly: true},
    {data: 'lane8', readOnly: true},
    {data: 'Count', readOnly: true}
  ],
  colWidths: [50,90,50,50,50,50,50,50,50,50,50,60],
  colHeaders:["小節","BPM/拍子","lane0","lane1","lane2","lane3","lane4","lane5","lane6","lane7","lane8","Count"],
  minSpareRows: 1,
  contextMenu: true,
  enterBeginsEditing: false,
  mergeCells: [],
  yellowRenderer
});

table.alter("remove_row",0,1);

document.getElementById("add").addEventListener("click",function(){
  var rows = table.countRows();
  var inst = table.getInstance();
  var merge = {row: rows, col: 0, rowspan: 8, colspan: 1};
  table.alter("insert_row",rows,8);
  table.mergeCells = new Handsontable.MergeCells([merge]);
  table.render();
});

Handsontable.hooks.add("afterSelection", function(){
  var selected = table.getSelected();
  var inst = table.getInstance();
  var cellProperties = table.getCellMeta(selected[2],selected[3]);
  Mousetrap.bind('1', function(e) {
    cellProperties.renderer = yellowRenderer;
    table.render();
  });
  //cellProperties.renderer = yellowRenderer;
  console.log("(" + selected[2] + " , " + selected[3] + ")");
});