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

var mergeArray = []; // 結合のデータ用配列
var barCount = 1;

// 小節追加
document.getElementById("add").addEventListener("click",function(){
  var rows = table.countRows();
  var divide = parseInt(document.getElementById("divide").value);
  var newMerge = {row: rows, col: 0, rowspan: divide, colspan: 1};
  table.alter("insert_row", rows, divide); // 行追加
  // 結合
  mergeArray.push(newMerge); // 配列に新しい結合を追加
  table.mergeCells = new Handsontable.MergeCells(mergeArray);
  var newRows = table.countRows();
  table.render();
  // 小節番号
  table.setDataAtCell(rows, 0, barCount.toString());
  barCount++;
  // BPMと拍子
  var BPM = document.getElementById("bpm").value;
  var time = document.getElementById("time").value;
  table.setDataAtCell(rows, 1, BPM + " , " + time);
});

// 1行目削除
document.getElementById("remove").addEventListener("click",function(){
  table.alter("remove_row",0);
  table.render();
});

// セル選択時の処理
Handsontable.hooks.add("afterSelection", function(){
  var selected = table.getSelected();
  var inst = table.getInstance();
  var cellProperties = table.getCellMeta(selected[2],selected[3]);
  // laneのエリア内なら
  if(1 < selected[3] && selected[3] < 11){
    // ショートカットキーで色付け
    Mousetrap.bind('1', function(e) {
      cellProperties.renderer = yellowRenderer;
      table.render();
    });
  }
  console.log("(" + selected[2] + " , " + selected[3] + ")");
});