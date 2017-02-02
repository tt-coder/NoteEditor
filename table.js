function insertRow(id) {
    // テーブル取得
    var table = document.getElementById(id);
    // 行を行末に追加
    var row = table.insertRow(-1);
    // セルの挿入
    /*
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    */
    var cell = new Array(9);

    for(var i=0;i<9;i++){
        cell[i] = row.insertCell(-1);
    }
    for(var i=0;i<9;i++){
        cell[i].innerHTML = "";
    }
    
    // ボタン用 HTML
    var button = '<input type="button" value="行削除" onclick="deleteRow(this)" />';
 
    // 行数取得
    var row_len = table.rows.length;
 
    // セルの内容入力
    /*
    cell1.innerHTML = button;
    cell2.innerHTML = row_len + "-" + 1;
    cell3.innerHTML = row_len + "-" + 2;
    */
}

function deleteRow(obj) {
    // 削除ボタンを押下された行を取得
    tr = obj.parentNode.parentNode;
    // trのインデックスを取得して行を削除する
    tr.parentNode.deleteRow(tr.sectionRowIndex);
}

