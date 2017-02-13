var grid = document.getElementById('grid');

var data = [];
var isFinal = true;
yellowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'yellow';
};

blueRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'blue';
};

greenRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'green';
};

lightGreenRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'lightgreen';
};

whiteRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'white';
};

finalRowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.background = '#CEC';
};

var table = new Handsontable(grid, {
  data: data,
  dataSchema: {
    ID: null,
    BPM: null,
    Time: null,
    lane0: null,
    lane1: null,
    lane2: null,
    lane3: null,
    lane4: null,
    lane5: null,
    lane6: null,
    lane7: null,
    lane8: null,
    Count: null,
    Same: null
  },
  columns: [
    {data: 'ID', readOnly: true},
    {data: 'BPM', readOnly: true},
    {data: 'Time', readOnly: true},
    {data: 'lane0', readOnly: true},
    {data: 'lane1', readOnly: true},
    {data: 'lane2', readOnly: true},
    {data: 'lane3', readOnly: true},
    {data: 'lane4', readOnly: true},
    {data: 'lane5', readOnly: true},
    {data: 'lane6', readOnly: true},
    {data: 'lane7', readOnly: true},
    {data: 'lane8', readOnly: true},
    {data: 'Count', readOnly: true},
    {data: 'IsSame', readOnly: true}
  ],
  cells: function(row, col, prop){
    var cellProperties = {};
    if(row == 0 && isFinal){
      cellProperties.renderer = finalRowRenderer;
      cellProperties.height = 5;
    }
    return cellProperties;
  },
  viewportColumnRenderingOffset: 100,
  colWidths: [50,50,50,50,50,50,50,50,50,50,50,50,60,80],
  colHeaders:["小節","BPM","拍子","lane0","lane1","lane2","lane3","lane4","lane5","lane6","lane7","lane8","Count","同時押し"],
  minSpareRows: 1,
  contextMenu: true,
  enterBeginsEditing: false,
  mergeCells: true,
  customBorders: true
});

var mergeArray = []; // 結合のデータ用配列
var borderArray = [];
var barCount = 1;
var rowNoteCount = [];
// 小節追加
document.getElementById("add").addEventListener("click",function(){
  isFinal = false;
  var maxRow = table.countRows();
  var divide = parseInt(document.getElementById("divide").value);
  var newMerge = {row: maxRow-1, col: 0, rowspan: divide, colspan: 1};
  table.alter("insert_row",maxRow-1, divide);
  // 結合
  mergeArray.push(newMerge);
  /*
  table.mergeCells = new Handsontable.MergeCells(mergeArray);
  table.render();
  */
  // 小節番号
  table.setDataAtCell(maxRow-1, 0, barCount.toString());
  barCount++;
  // BPMと拍子
  var BPM = document.getElementById("bpm").value;
  var time = document.getElementById("time").value;
  table.setDataAtCell(maxRow-1, 1, BPM);
  table.setDataAtCell(maxRow-1, 2, time)
  // 小節線
  var newMaxRow = table.countRows();
  var newBorderTop = {range: {from: {row: maxRow-1, col: 3}, to: {row: maxRow-1, col: 11}}, top: {width: 3, color: "red"}};
  var newBorderBottom = {range: {from: {row: newMaxRow-1, col: 3}, to: {row: newMaxRow-1, col: 11}}, top: {width: 3, color: "red"}};
  borderArray.push(newBorderTop);
  borderArray.push(newBorderBottom);
  var updateArray = {
    customBorders: borderArray,
    mergeCells: mergeArray
  };
  table.updateSettings(updateArray);
  table.runHooks('afterInit');
});

// 1行目削除
document.getElementById("remove").addEventListener("click",function(){
  table.alter("remove_row",0);
  table.render();
});

// セル選択時の処理
Handsontable.hooks.add("afterSelection", function(){
  var selected = table.getSelected();
  //var inst = table.getInstance();
  var maxRow = table.countRows();
  var startRow = selected[0];
  var startCol = selected[1];
  var endRow = selected[2];
  var endCol = selected[3];
  decideColor = function(color){ // 色を設定
    switch(color){
      case 1: // 単ノーツ
        return blueRenderer;
      case 2: // ロング始点
        return lightGreenRenderer;
      case 3: // ロング終点
        return greenRenderer;
      case 4: // ロング中間
        return yellowRenderer;
      case 5: // 削除
        return whiteRenderer;
      default:
        return yellowRenderer;
    }
  };
  colorCell = function(color) { // 8方向対応色塗り
    if(startRow <= endRow){ // 下方向
      if(startCol >= endCol){ // 左・左下方向
        for(var i=startRow;i<=endRow;i++){
          for(var j=startCol;j>=endCol;j--){
            var cellProperties = table.getCellMeta(i,j);
            cellProperties.renderer = decideColor(color);
            table.render();
          }
        }
      }else if(startCol <= endCol){ // 右・右下方向
        for(var i=startRow;i<=endRow;i++){
          for(var j=startCol;j<=endCol;j++){
            var cellProperties = table.getCellMeta(i,j);
            cellProperties.renderer = decideColor(color);
            table.render();
          }
        }
      }
    }else if(startRow >= endRow){ // 上方向
      if(startCol >= endCol){ // 左・左上方向
        for(var i=startRow;i>=endRow;i--){
          for(var j=startCol;j>=endCol;j--){
            var cellProperties = table.getCellMeta(i,j);
            cellProperties.renderer = decideColor(color);
            table.render();
          }
        }
      }else if(startCol <= endCol){ // 右・右上方向
        for(var i=startRow;i>=endRow;i--){
          for(var j=startCol;j<=endCol;j++){
            var cellProperties = table.getCellMeta(i,j);
            cellProperties.renderer = decideColor(color);
            table.render();
          }
        }
      }
    }
  };
  colorCellVertical = function(color) { // 垂直方向のみ色塗り
    if(startRow <= endRow && startCol == endCol){ // 下方向
      for(var i=startRow;i<=endRow;i++){
        var cellProperties = table.getCellMeta(i,startCol);
        if(i == startRow){
          cellProperties.renderer = decideColor(2);
        }else if(i == endRow){
          cellProperties.renderer = decideColor(3);
        }else{
          cellProperties.renderer = decideColor(4);
        }
        table.render();
      }
    }else if(startRow >= endRow && startCol == endCol){ // 上方向
      for(var i=startRow;i>=endRow;i--){
        var cellProperties = table.getCellMeta(i,startCol);
        if(i == startRow){
          cellProperties.renderer = decideColor(3);
        }else if(i == endRow){
          cellProperties.renderer = decideColor(2);
        }else{
          cellProperties.renderer = decideColor(4);
        }
        table.render();
      }
    }
  };
  countColorCell = function(){
    var nowCount = 0;
    var sum = 0;
    for(var i=0;i<maxRow-1;i++){ // 縦
      for(var j=3;j<=11;j++){ // 横
        var cellProperties = table.getCellMeta(i,j);
        // 色付けされていたら
        if(cellProperties.renderer == blueRenderer || cellProperties.renderer == greenRenderer || cellProperties.renderer == lightGreenRenderer){
          nowCount++;
        }
      }
      if(nowCount >= 2) table.setDataAtCell(i, 13, "同時押し");
      rowNoteCount[i] = nowCount;
      nowCount = 0;
      if(i != 0){
        for(var k=0;k<=i;k++){
          sum += rowNoteCount[k];
        }
      }else if(i == 0){
          sum = rowNoteCount[i];
      }
      table.setDataAtCell(i, 12, sum.toString());
      sum = 0;
    }
  };
  if(2 < startCol && endCol < 12 && startRow != maxRow-1 && endRow != maxRow-1){
    Mousetrap.bind('1', function(e) { // 単ノーツ
      var cellProperties = table.getCellMeta(startRow,startCol);
      cellProperties.renderer = decideColor(1);
      table.render();
      countColorCell();
    });
    Mousetrap.bind('2', function(e) { // ロング
      colorCellVertical(4);
      countColorCell();
    });
    Mousetrap.bind('backspace', function(e) { // 削除
      var cellProperties = table.getCellMeta(startRow,startCol);
      cellProperties.renderer = decideColor(5);
      table.render();
      countColorCell();
    });
  }
});

document.getElementById("save").addEventListener("click",function(){

});