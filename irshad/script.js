// Unit value
var _unit = 150;
// Method to get minimal value of given size
function mValue(size) { return size/_unit; }

// Get Container
var _blockContainer = document.getElementById('block-container');
// Max available width
var _widthAvailable = _blockContainer.offsetWidth - _blockContainer.offsetWidth % _unit;

// Get list of item in Container
var _itemList = document.getElementsByClassName('block-item');

// Max value
var _maxWidth = mValue(_widthAvailable);
var _maxHeight = 0;
for (let i = 0; i < _itemList.length; i++) { _maxHeight += mValue(_itemList[i].offsetHeight); }


// Space matrix to store the details of item
var _spaceMatrix = [new Array(_maxWidth).fill(0)];

/* Set container width */
_blockContainer.style.width = (_widthAvailable).toString()+"px";

/* Set values in Space Matrix */
for (let i = 0; i < _itemList.length; i++) {
	// intial index
	var _top = 0;
	var _left = 0;
	const item = _itemList[i];
	

	var next = false;
	while (!next) {
		// Increase the height of spaceMatrix to store new Image
		for (let d = 0; d < _top+mValue(item.offsetHeight)-_spaceMatrix.length; d++)
			_spaceMatrix.push(new Array(_maxWidth).fill(0));

		// Check if is at end of row
		if (_left+mValue(item.offsetWidth)<=_maxWidth) {
			var valid = true;

			// Check if empty space is available
			for (let x=_left; valid && x<_left+mValue(item.offsetWidth); x++)
				for (let y=_top; valid && y<_top+mValue(item.offsetHeight); y++)
					if (_spaceMatrix[y][x] != 0)
						valid = false;

			if (valid) {
				// Add image index to available space
				for (let x = _left; x < _left+mValue(item.offsetWidth); x++)
					for (let y = _top; y < _top+mValue(item.offsetHeight); y++)
						_spaceMatrix[y][x] = i+1;
				next = true;
				continue;
			}

		}

		// Move to next col & row
		_left++;
		if (_left == _maxWidth) {
				_left = 0;
				_top++;
		}
	}
}

// Array to store initial x,y index of each image
var _indexList = new Array(_itemList.length);
for (let i = 0; i < _spaceMatrix.length; i++) {
	const row = _spaceMatrix[i];
	for (let j = 0; j < row.length; j++) {
		if (row[j]>0) {
			if (_indexList[row[j]-1] == null) {
				_indexList[row[j]-1] = [j, i];
			}
		}
	}
}

// Display item at ist place
for (let i = 0; i < _itemList.length; i++) {
	const item = _itemList[i];
	item.style.left = (_indexList[i][0]*_unit).toString()+"px";
	item.style.top = (_indexList[i][1]*_unit).toString()+"px";
}

console.log(_spaceMatrix);
console.log(_indexList);