onload = function () {
    createMatrix();
    setCell(1, 1, true);

}
//
// —оздание матрицы.
//
function createMatrix()
{
	var matrix = document.getElementById('matrix');
	var n = 20 * 20;	
	
	for (var i = 0; i < n; i++)
	{
		var div = document.createElement('div');
		div.className = 'cell';
		matrix.appendChild(div);
	}
}

//
// „тение €чейки матрицы.
//
function getCell(row, col){
	// ‘ункци€ принимает координаты €чейки
	// должна вернуть true, если она закрашена,
	// false, если не закрашена.
}

//
// ”становка €чейки матрицы.
//
function setCell(row, col, val){

	// ‘ункци€ принимает координаты €чейки
	// если val == true, закрашивает €чейку,
	// иначе убирает закраску.
}


				
