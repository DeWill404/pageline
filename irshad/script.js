// Unit value
var _unit = 100;
var _tempUnit = 0;

// Method to get minimal value of given size
function mValue(size) { return size/_unit; }

// Get Container
var _blockContainer = document.getElementById('block-container');

// Get list of item in Container
var _itemList = document.getElementsByClassName('block-item');

// Max available width
var _widthAvailable = _blockContainer.offsetWidth - _blockContainer.offsetWidth % _unit;


/* Set container width */
_blockContainer.style.width = (_widthAvailable).toString()+"px";


// Max value
var _maxWidth = Math.floor(mValue(_widthAvailable));


// Space matrix to store the details of item
var _spaceMatrix = [new Array(_maxWidth).fill(0)];

// Set values in Space Matrix
for (let i = 0; i < _itemList.length; i++) {
	console.log(i);
	// intial index
	var _top = 0;
	var _left = 0;
	const item = _itemList[i];

	// If item is larger then window size, then make it square 1 in row
	if (mValue(item.offsetWidth) > _maxWidth) {
		item.style.width = (_widthAvailable).toString()+"px";
		item.style.height = (_widthAvailable).toString()+"px";
	}

	var next = false;
	while (!next) {
		// Increase the height of spaceMatrix to store new item
		while ( _top+mValue(item.offsetHeight) > _spaceMatrix.length )
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
		if (_left == _maxWidth) { _left = 0; _top++; }
	}
}


/* Display item at ist place */
var placeitem = new Set();
for (let i = 0; i < _spaceMatrix.length; i++) {
	for (let j = 0; j < _spaceMatrix[i].length; j++) {
		// Search for unplaced item
		if (_spaceMatrix[i][j]>0 && !placeitem.has(_spaceMatrix[i][j])) {
			const item = _itemList[ _spaceMatrix[i][j]-1 ];

			item.style.left = (j * _unit).toString()+"px";
			item.style.top = (i * _unit).toString()+"px";

			placeitem.add(_spaceMatrix[i][j]);

			// Exit when all item is found
			if (placeitem.size == _itemList.length) break;
		}
	}
}

// Add vanilla tilt effect to all block items
VanillaTilt.init(document.querySelectorAll(".block-item"),{
	glare: true,
	reverse: true,
	"max-glare": 0.5
});