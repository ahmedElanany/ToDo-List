// select the element

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
 //Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LineThrough = "lineThrough";

//variables

let LIST = [], id;

//get item from localStorage 
let data = localStorage.getItem("TODO");
//check if data isn't empty
if(data) { // if there is data
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the use interface
}else {      //which mean the data is empty
    LIST= [];
    id = 0;
}

// load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//add item to the localstorage
localStorage.setItem("TODO", JSON.stringify(LIST)); //(this code must be added where the LIST array is updated)

// show today's date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date ();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to-do function

function addToDo(toDo, id, done, trash) {

    if (trash){ return; } // if it's in the trash return which prevent the code below to run
    
    const DONE = done ? CHECK : UNCHECK; // if it's done(true) check otherwise uncheck
    const LINE = done ? LineThrough : "" ; 

    const item = `
                    <li class="item">
                        <i class = "fa ${DONE} co" job = "complete" id  ="${id}"></i>
                        <p class  = "text ${LINE}"> ${toDo}</p>
                        <i class  = "fa fa-trash-o de" job  = "delete" id  ="${id}"></i>
                    </li>
                `; 
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//add an item to the list when the use press enter key

document.addEventListener ("keyup", function (event) {
    if(event.keyCode == 13){
        const toDo = input.value;
        // if the input isn't empty 
        if(toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value ="";
    }
}); 

// add item to the list using the button

const ADD = document.getElementById("add")
ADD.addEventListener ("click", addTo);
function addTo() {
    
        const toDo = input.value;
        // if the input isn't empty 
        if(toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value ="";
    }


// COMPLETED TO-DO

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LineThrough);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do 
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});