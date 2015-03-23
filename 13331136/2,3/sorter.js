window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(makeAllTablesFilterable(tables));
}


// 获取所有表格
function getAllTables() {
	return document.getElementsByTagName("table");
}


// 将表格中的内容排序
function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var th = tables[i].getElementsByTagName("th");
		for (var j = 0; j < th.length; j++) {
			// 触发鼠标点击时间
			th[j].onclick = function() {
				var rows = getRows(this);                    // 存放所有当前显示出来的行
				var order = this.className;                  // 升序还是排序（用类名来做区分）
				var index = getIndex(this);                  // 存放被点击表头的下标
				var sortedTables = getSingleTable(this);     // 存放将要排序的表格内容
				var colsNum = rows[0].cells.length;          // 列数
				var rowsNum = rows.length;                   // 行数

				// 重置表头颜色
				resetColor(this);

				// 判断排序方法，并且执行排序
				if (order == "ascend") {
					this.className = "descend";
					sortedTables.sort(descendSort);
				} else {
					this.className = "ascend";
					sortedTables.sort(ascendSort);
				}

				// 更改表格的内容
				for (var p = 0; p < rowsNum; p++) {
					for (var q = 0; q < colsNum; q++) {
						if (rows[p] !== undefined) {
							rows[p].cells[q].innerHTML = sortedTables[p][q];
						}
					}
				}

				// 升序排序
				function ascendSort(a, b) {
					if (a[index] < b[index]) return -1;
					else return 1;
				}

				// 降序排序
				function descendSort(a, b) {
					if (a[index] > b[index]) return -1;
					else return 1;
				}
			}
		}
	}
}


function resetColor(obj) {
	var thead = obj.parentNode;
	var th = thead.getElementsByTagName("th");    // 获取当前表格的表头
	// 重置颜色（类名）
	for (var i = 0; i < th.length; i++) {
		th[i].className = "";
	}
}


// 返回点击表头的下标
function getIndex(obj) {
	var thead = obj.parentNode;
	for (var i = 0; i < thead.cells.length; i++) {
		// 判断哪一个表头与所点击表头相一致
		if (thead.cells[i].innerHTML == obj.innerHTML) {
			return i;
		}
	}
	
	return -1;
}


// 返回要排序的表格的innerHTML内容
function getSingleTable(obj) {
	var rows = getRows(obj);
	var colsNum = rows[0].cells.length;
	var rowsNum = rows.length;
	var tableWithoutTag = new Array;         // 存放要排序的表格的innerHTML的内容
	// 初始化二维数组
	for (var i = 0; i < rowsNum; i++) {
		tableWithoutTag[i] = new Array;
	}

	for (var i = 0; i < rowsNum; i++) {
		for (var j = 0; j < colsNum; j++) {
			if (rows[i] !== undefined) {
				tableWithoutTag[i][j] = rows[i].cells[j].innerHTML;
			}
		}
	}

	return tableWithoutTag;
}


// 返回当前显示的行
function getRows(obj) {
	var tbody = obj.parentNode.parentNode.parentNode.tBodies[0];
	var tr = tbody.getElementsByTagName("tr");
	var rows = [];

	for (var i = 0; i < tr.length; i++) {
		// 若改行的display不为none，则存入数组
		if (getComputedStyle(tr[i], null).display == "table-row") rows.push(tr[i]);
	}

	return rows;
}