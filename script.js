onload = function () {
    createMatrix();
    setCell(1, 1, true);

}
//
// �������� �������.
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
// ������ ������ �������.
//
function getCell(row, col){
	// ������� ��������� ���������� ������
	// ������ ������� true, ���� ��� ���������,
	// false, ���� �� ���������.
}

//
// ��������� ������ �������.
//
function setCell(row, col, val){

	// ������� ��������� ���������� ������
	// ���� val == true, ����������� ������,
	// ����� ������� ��������.
}


				
