// 筛选表格
function makeAllTablesFilterable(tables) {
	var inputBar = document.getElementsByName("table");

	for (var i = 0; i < tables.length; i++) {

		// 输入完成后触发时间
		inputBar[i].onchange = function() {
			var table = this.nextElementSibling||this.nextSibling;               // 获取当前表格
			var td = table.getElementsByTagName("td");                           // 获取每个格子的对象
			var search = this.value;                                             // 获取要查询的字符串
			var hasRowIndex = [];                                                // 表示哪一行有要查询的内容，有存为“1”，没有为“0”

			// 重现所有行
			resetRows(table);
			// 取消强调效果
			resetHighlight(table);

			// 初始化数组
			for (var k = 0; k < table.getElementsByTagName("tr").length-1; k++) {
				hasRowIndex.push(0);
			}

			for (var j = 0; j < td.length; j++) {
				var highlight = td[j].innerHTML.indexOf(search);                 // 要查询的字符串在这个cell的字符串里面的位置（下标）
				var text = td[j].innerHTML;                                      // 这个cell里面的文字

				if (highlight > -1) {
					// 查找到相应的字符串，则将数组里相应的位置为“1”
					hasRowIndex[(td[j].parentNode.rowIndex)-1] = 1;
					// 突出要查询的字符串
					td[j].innerHTML = text.substring(0, highlight);
					td[j].innerHTML += "<strong>"+ text.substring(highlight, highlight+search.length) + "</strong>";
					td[j].innerHTML += text.substring(highlight+search.length);
				}

			}

			// 删除没有相关内容的行
			for (var k = hasRowIndex.length-1; k >= 0; k--) {
				if (hasRowIndex[k] == 0) {
					table.rows[k+1].style.display = "none";
				}
			}

			// 设置奇偶行的背景颜色
			setRowsColor(table);
		}
	}
	return document.getElementsByTagName("table")
}


function resetRows(obj) {
	for (var i = 0; i < obj.rows.length; i++) {
		obj.rows[i].style.display = "table-row";
	}
}


function resetHighlight(obj) {
	var td = obj.getElementsByTagName("td");
	for(var i = 0; i < td.length; i++) {
		td[i].innerHTML = td[i].innerHTML.replace("</strong>", "");
		td[i].innerHTML = td[i].innerHTML.replace("<strong>", "");
	}
}


function setRowsColor(obj) {
	var tbody = obj.getElementsByTagName("tbody")[0];
	var tr = tbody.getElementsByTagName("tr");
	var rows = [];                                                    // 存放当前显示的行

	// 将display不为none的行放入数组
	for (var i = 0; i < tr.length; i++) {
		if (tr[i].style.display == "table-row") rows.push(tr[i]);
	}

	// 改变背景颜色
	for (var i = 0; i < rows.length; i++) {
		if (i%2 == 0) rows[i].style.backgroundColor = "#FFFFFF";
		else rows[i].style.backgroundColor = "#DDDDDD";
	}
}