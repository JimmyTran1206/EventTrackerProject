// Take all divs
const welcomeHeader = document.getElementById("welcomeHeader");
const emptySnakeList = document.getElementById("emptySnakeList");
const snakeListDiv = document.getElementById("snakeList");
const snakeDetailDiv = document.getElementById("snakeDetailDiv");
const controlButtons = document.getElementById("controlButtons");
const addEditSnakeDiv = document.getElementById("addEditSnakeDiv");
const deleteConfirmation = document.getElementById("deleteConfirmation");

// Take add New Snake Button
const btnAddNewSnake = document.getElementById("addNewSnake");
btnAddNewSnake.addEventListener("click", (e) => addNewSnake(e));
// Take next-previous buttons
const btnPrevious = document.getElementById("btnPrevious");

const btnNext = document.getElementById("btnNext");

// Take back to main, edit informaiton, and delete buttons
const btnBackToMain = document.getElementById("btnBackToMain");
btnBackToMain.addEventListener("click", () => loadAllSnakes());
const btnEditThis = document.getElementById("btnEditThis");
btnEditThis.addEventListener("click", (e) => editSnake(e));
const btnDeleteThis = document.getElementById("btnDeleteThis");

// Take form buttons and inputs
const addEditForm = document.addEditForm;
const btnConfirm = addEditForm.btnConfirm;
const btnCancel = addEditForm.btnCancel;
btnCancel.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.snakeId !== undefined) {
		hideDiv(addEditSnakeDiv);
		showDiv(controlButtons);
	} else {
		loadAllSnakes(); // case adding new snake
	}

})
btnConfirm.addEventListener("click", (e) => confirmEdit(e));
//link the form controls and the display snake details
addEditForm.inputSnakeType.addEventListener("input", (e) => {
	const snakeType = document.getElementById("snakeType");
	snakeType.textContent = e.target.value;
})
addEditForm.inputSnakeDescription.addEventListener("input", (e) => {
	const snakeDescription = document.getElementById("snakeDesription");
	snakeDescription.textContent = e.target.value;
})
addEditForm.inputSnakeImageURL.addEventListener("input", (e) => {
	const snakeImg = document.getElementById("snakeImg");
	e.target.value === "" ?
		snakeImg.src = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
		: snakeImg.src = e.target.value;
})


// Set view functions
function hideAllDivs() {
	welcomeHeader.classList.add("hidden");
	emptySnakeList.classList.add("hidden");
	snakeListDiv.classList.add("hidden");
	snakeDetailDiv.classList.add("hidden");
	controlButtons.classList.add("hidden");
	addEditSnakeDiv.classList.add("hidden");
	deleteConfirmation.classList.add("hidden");
}

function showDiv(div) {
	div.classList.remove("hidden");
}

function hideDiv(div) {
	div.classList.add("hidden");
}

// Landing page
window.addEventListener("load", function() {
	hideAllDivs();
	loadAllSnakes();
})

// http request-resposne 
function loadAllSnakes() {
	const relativeURL = "/api/snakes";
	const xhr = new XMLHttpRequest;
	xhr.open("GET", relativeURL);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				const snakeList = JSON.parse(xhr.responseText);
				displaySnakeList(snakeList);
			}
		}

	}
	xhr.send();
}

// display functions
function displaySnakeList(snakeList) {
	hideAllDivs();
	showDiv(welcomeHeader);
	if (snakeList && Array.isArray(snakeList) && snakeList.length > 0) {
		showDiv(snakeListDiv);
		const tbody = document.getElementById("snakeTable");
		tbody.textContent = "";
		for (let snake of snakeList) {
			let tr = document.createElement("tr");
			tbody.appendChild(tr)
			let tdImg = document.createElement("td");
			tr.appendChild(tdImg);
			let snakeImg = document.createElement("img");
			snakeImg.src = snake.pictureUrl;
			snakeImg.setAttribute("height", "50px");
			snakeImg.setAttribute("width", "80px");
			snakeImg.style = "border-radius: 5px";
			tdImg.appendChild(snakeImg)
			let tdType = document.createElement("td");
			tdType.textContent = snake.snakeType;
			tdType.width = "50%";
			tr.appendChild(tdType);
			let tdBtnDetails = document.createElement("td");
			tr.appendChild(tdBtnDetails);

			let btnDetails = document.createElement("button");
			btnDetails.classList.add("btn");
			btnDetails.classList.add("btn-primary");
			btnDetails.textContent = "Details";
			btnDetails.snakeId = snake.id; // stash the snakeId
			btnDetails.addEventListener("click", (e) => showSnakeDetails(e));
			tdBtnDetails.appendChild(btnDetails);

			let tdBtnEdit = document.createElement("td");
			tr.appendChild(tdBtnEdit);
			let btnEdit = document.createElement("button");
			btnEdit.classList.add("btn");
			btnEdit.classList.add("btn-warning");
			btnEdit.textContent = "Edit";
			btnEdit.snakeId = snake.id; // stash the snakeId
			btnEdit.addEventListener("click", (e) => editSnake(e));
			tdBtnEdit.appendChild(btnEdit);

			let tdBtnDelete = document.createElement("td");
			tr.appendChild(tdBtnDelete);
			let btnDelete = document.createElement("button");
			btnDelete.classList.add("btn");
			btnDelete.classList.add("btn-danger");
			btnDelete.textContent = "Delete";
			btnDelete.snakeId = snake.id; // stash the snakeId
			btnDelete.addEventListener("click", (e) => deleteSnakeWithoutConfirmation(e))
			tdBtnDelete.appendChild(btnDelete);
		}
	}
	else {
		showDiv(emptySnakeList);
	}
}

// BUTTON FUNCTIONALITY
// btn Details
function showSnakeDetails(e) {
	hideAllDivs();
	// querying for snake with specific id=e.target.snakeId
	const relativeURL = `/api/snakes/${e.target.snakeId}`;
	const xhr = new XMLHttpRequest;
	xhr.open("GET", relativeURL);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				const snake = JSON.parse(xhr.responseText);
				renderSnakeDetails(snake);
				// stash snakeid into edit and delete btn
				btnEditThis.snakeId = snake.id;
				btnDeleteThis.snakeId = snake.id;
				showDiv(controlButtons);

			}
		}

	}
	xhr.send();
}
//helper: renderSnakeDetail
function renderSnakeDetails(snake) {
	showDiv(snakeDetailDiv);
	const snakeType = document.getElementById("snakeType");
	const snakeImg = document.getElementById("snakeImg");
	const snakeDescription = document.getElementById("snakeDesription");
	snakeType.textContent = snake.snakeType
	snakeImg.src = snake.pictureUrl;
	snakeDescription.textContent = snake.description;
}

// btn Edit (landing page) btn Edit (detail page)
function editSnake(e) {
	hideAllDivs();
	// querying for snake with specific id=e.target.snakeId
	const relativeURL = `/api/snakes/${e.target.snakeId}`;
	const xhr = new XMLHttpRequest;
	xhr.open("GET", relativeURL);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				const snake = JSON.parse(xhr.responseText);
				renderSnakeDetails(snake);
				// stash snakeid into edit and delete btn
				btnEditThis.snakeId = snake.id;
				btnDeleteThis.snakeId = snake.id;
				loadFormData(snake);
			}
		}

	}
	xhr.send();
}
// helper: load form data
function loadFormData(snake) {
	showDiv(addEditSnakeDiv);
	const addEditForm = document.addEditForm;
	addEditForm.inputSnakeType.value = snake.snakeType;
	addEditForm.inputSnakeImageURL.value = snake.pictureUrl;
	addEditForm.inputSnakeDescription.value = snake.description;
	addEditForm.btnConfirm.snakeId = snake.id;
	addEditForm.btnCancel.snakeId = snake.id;
}

// btn Edit Confirm
function confirmEdit(e) {
	e.preventDefault();
	const addEditForm = document.addEditForm;
	const snake = {
		snakeType: addEditForm.inputSnakeType.value,
		description: addEditForm.inputSnakeDescription.value,
		pictureUrl: addEditForm.inputSnakeImageURL.value,
	}
	e.target.snakeId !== undefined ? putSnake(snake, e) : postSnake(snake, e);
}
// helper: put snake
function putSnake(snake, e) {
	const relativeURL = `/api/snakes/${e.target.snakeId}`;
	const xhr = new XMLHttpRequest();
	xhr.open("PUT", relativeURL);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status == 201 || xhr.status == 200) {
				showSnakeDetails(e);
			}
		}
	}
	xhr.send(JSON.stringify(snake))
}

// btn Add new Snake
function addNewSnake(e) {
	hideAllDivs();
	const emptySnake = {
		snakeType: "",
		description: "",
		pictureUrl: "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
	}
	renderSnakeDetails(emptySnake);
	emptySnake.pictureUrl = "";
	loadFormData(emptySnake);
}
// helper: post snake
function postSnake(snake, e) {
	const relativeURL = `/api/snakes`;
	const xhr = new XMLHttpRequest();
	xhr.open("POST", relativeURL);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status == 201 || xhr.status == 200) {
				loadAllSnakes();
			}
		}
	}
	xhr.send(JSON.stringify(snake))
}

// btn Delete (landing page)
function deleteSnakeWithoutConfirmation(e) {
	console.log(e.target.snakeId);
	deleteSnake(e);
}
//helper: deletesnake
function deleteSnake(e) {
	const relativeURL = `/api/snakes/${e.target.snakeId}`;
	const xhr = new XMLHttpRequest();
	xhr.open("DELETE", relativeURL);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			console.log(xhr.status);
			if (xhr.status === 204) {
				console.log("snake Deleted");
				loadAllSnakes();
			}
		}
	}
	xhr.send();
}
