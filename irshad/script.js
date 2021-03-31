// Unit value
var unit = 100;
var tempUnit = 0;

// Method to get minimal value of given size
function mValue(size) { return size/unit; }

// Get Container
var blockContainer = document.getElementById('block-container');

// Get list of item in Container
var itemList = document.getElementsByClassName('block-item');

// Max available width
var widthAvailable = blockContainer.offsetWidth - blockContainer.offsetWidth % unit;


/* Set container width */
blockContainer.style.width = widthAvailable + "px";


// Max value
var maxWidth = Math.floor(mValue(widthAvailable));


// Space matrix to store the details of item
var spaceMatrix = [new Array(maxWidth).fill(0)];

// Set values in Space Matrix
for (let i = 0; i < itemList.length; i++) {
	// intial index
	var TOP = 0;
	var LEFT = 0;
	const item = itemList[i];

	// If item is larger then window size, then make it square 1 in row
	if (mValue(item.offsetWidth) > maxWidth) {
		item.style.width = widthAvailable + "px";
		item.style.height = widthAvailable + "px";
	}

	var next = false;
	while (!next) {
		// Increase the height of spaceMatrix to store new item
		while ( TOP+mValue(item.offsetHeight) > spaceMatrix.length )
			spaceMatrix.push(new Array(maxWidth).fill(0));

		// Check if is at end of row
		if (LEFT+mValue(item.offsetWidth)<=maxWidth) {
			var valid = true;

			// Check if empty space is available
			for (let x=LEFT; valid && x<LEFT+mValue(item.offsetWidth); x++)
				for (let y=TOP; valid && y<TOP+mValue(item.offsetHeight); y++)
					if (spaceMatrix[y][x] != 0)
						valid = false;

			if (valid) {
				// Add image index to available space
				for (let x = LEFT; x < LEFT+mValue(item.offsetWidth); x++)
					for (let y = TOP; y < TOP+mValue(item.offsetHeight); y++)
						spaceMatrix[y][x] = i+1;
				next = true;
				continue;
			}

		}

		// Move to next col & row
		LEFT++;
		if (LEFT == maxWidth) { LEFT = 0; TOP++; }
	}
}



/* Display item at ist place */
var placeitem = new Set();
for (let i = 0; i < spaceMatrix.length; i++) {
	for (let j = 0; j < spaceMatrix[i].length; j++) {
		// Search for unplaced item
		if (spaceMatrix[i][j]>0 && !placeitem.has(spaceMatrix[i][j])) {
			const item = itemList[ spaceMatrix[i][j]-1 ];
			
			item.style.left = j * unit + "px";
			item.style.top = i * unit + "px";
			
			placeitem.add(spaceMatrix[i][j]);

			// Exit when all item is found
			if (placeitem.size == itemList.length) break;
		}
	}
}


// Add vanilla tilt effect to all block items
VanillaTilt.init(document.querySelectorAll(".item-card"),{ reverse: true });



// Const to store list of play-btns
const playBtns = document.getElementsByClassName("play-btn");

// Set top & left value of playbtn positions
for (let i = 0; i < playBtns.length; i++) {
	const playBtn = playBtns[i];
	playBtn.style.top = Math.floor(playBtn.parentElement.offsetHeight / 2) + "px";
	playBtn.style.left = Math.floor(playBtn.parentElement.offsetWidth / 2) + "px";
}


// Variable to store current playing video index
var currVideo = -1

// play or pause of video on btn click
function playPause(index) {
	// If video is played previously, then paussed it
	if (currVideo != -1) {
		playBtns[currVideo].style.opacity = 1;
		playBtns[currVideo].innerHTML = '<i class="bi bi-play-fill"></i>';
		document.getElementsByClassName("video-item")[currVideo].pause();
	}

	// If video to play is not current
	if (currVideo != index) {
		playBtns[index].style.opacity = 0.1;
		playBtns[index].innerHTML = '<i class="bi bi-pause-fill"></i>';
		document.getElementsByClassName("video-item")[index].play();
		currVideo = index;
	}
	// If it is current video, then reset counter
	else {
		currVideo = -1;
	}
}