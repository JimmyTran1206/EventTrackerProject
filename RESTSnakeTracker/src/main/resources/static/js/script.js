console.log("script.js is loaded");
window.addEventListener("load", function(e){
	console.log("page loaded");
	loadAllSnakes();
})

function loadAllSnakes(){
	const relativeURL= "/api/snakes";
	const xhr= new XMLHttpRequest;
	xhr.open("GET", relativeURL);
	xhr.onreadystatechange=function(){
		if(xhr.readyState===xhr.DONE){
			if(xhr.status===200){
				const snakeList=JSON.parse(xhr.responseText);
				displaySnakeList(snakeList);
			}else{
				// TODO: error handling
			}
		}
		
	}
	xhr.send();
}

function displaySnakeList(snakeList){
	if(snakeList&& Array.isArray(snakeList)&&snakeList.length>0){
		const tbody= document.getElementById("snakeTable");
		tbody.textContent="";
		for (let snake of snakeList){
			let tr=document.createElement("tr");
			tbody.appendChild(tr)
			let tdId=document.createElement("td");
			tdId.textContent=snake.id;
			tr.appendChild(tdId);
			let tdType=document.createElement("td");
			tdType.textContent=snake.snakeType;
			tr.appendChild(tdType);
			tr.snakeId=snake.id // stash snakeId in the tr in the DOM
			
			tr.addEventListener("click", function(e){
				let snakeId=e.target.parentElement.snakeId;
				console.log(snakeId);
			})
		}
	}
}

