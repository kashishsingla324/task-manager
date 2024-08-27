
// On app load, get all tasks from localStorage
  window.onload = loadTasks;
  function loadTasks() {
    // Get the tasks from localStorage and convert it to an array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  
    // Loop through the tasks and add them to the list
    tasks.forEach(task => {
      const list = document.querySelector("#ul-list");
      const li = document.createElement("li");
      const d = new Date(task.dueDate);
      const newd = new Date();
      if(d<newd){
        task.dueDate='Task is expired';
      }
      li.innerHTML = `
      <input type="checkbox" class="check" onclick="taskComplete(this)"  ${task.completed ? 'checked' : ''}>
      <span class="delete-button" onclick="removeTask(this)">Delete</span>
            <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
            <input type="text" value="${task.desc}" class="desc ${task.completed ? 'completed' : ''}" onfocus="getCurrentdesc(this)" onblur="editdesc(this)">
            <input type="text" value="Due-Date : ${task.dueDate ? task.dueDate : "No date provided"} "  class="due ${task.completed ? 'completed' : ''}" onfocus="getCurrentdue(this)" onblur="editdue(this)">
            <span class="category1 ${task.completed ? 'completed' : ''}">Category : ${task.Category}</span> `
            
      // list.insertBefore(li, list.children[0]);
      list.appendChild(li);
    });
  }

var selected;
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addTask();
     
  });

  
// function to add all the items 
  function addTask() {
    const task = document.querySelector("#task-input");
    const desc = document.querySelector("#task-input2");
    const due = document.querySelector("#task-input3");
    const select=document.getElementsByName('category');
  //  console.log(selected);
   for (var cat of select){
    if (cat.selected) {    
           var category=cat.value;    
                        }
     }
    const list = document.querySelector("#ul-list");
    // return if task is empty
    if (task.value === "") {
      Swal.fire({
        icon: 'error',
        title:'Please add some task!'
      })
      return false;
    }
    if(desc.value===""){
      desc.value="No Description provided";
    }
  
    // add task to local storage
    const d = new Date(due.value);
    
    const newd = new Date();
    if(due.value===""){
      due.value="No Due-Date";
    }
    else if(d<newd){
      // due.value='Task is expired';
      task.value = "";
      desc.value= "";
      due.value="";
      Swal.fire({
        icon: 'error',
        title:'This task is already due hence can\'t add task please provide valid due date!'
      })
      return;
    }
   
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value,desc:desc.value,dueDate:due.value,Category:category, completed: false }]));
  
    // create list item, add innerHTML and append to ul
    const li = document.createElement("li");
    
    li.innerHTML = `<input type="checkbox" class="check" onclick="taskComplete(this)" >
    <span class="delete-button" onclick="removeTask(this)">Delete</span>
        <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <input type="text" value="${desc.value}" class="desc" onfocus="getCurrentdesc(this)" onblur="editdesc(this)">
         <input type="text" value="Due-Date : ${due.value}" class="due" onfocus="getCurrentdue(this)" onblur="editdue(this)">
         <span class="cat category1">Category : ${category}</span> 
        `;
    
    // list.insertBefore(li, list.children[0]);
    list.appendChild(li);
    // clear input
    task.value = "";
    desc.value= "";
    due.value="";
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task has been added successfully!',
      showConfirmButton: false,
      timer: 1500
    })
   }

  function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
      if (task.task === event.nextElementSibling.value) {
        task.completed = !task.completed;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentNode.children[2].classList.toggle("completed");
    event.parentNode.children[3].classList.toggle("completed");
    event.parentNode.children[4].classList.toggle("completed");
    event.parentNode.children[5].classList.toggle("completed");
    event.parentNode.classList.toggle("completed");
  }


  function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
      if (task.task === event.parentNode.children[2].value) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.remove();

    //  alert("Task has been Deleted successfully !");
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task has been Deleted successfully!',
      showConfirmButton: false,
      timer: 1500
    })
      
  }

  
    // store current task to track changes
    var currentTask = null;

    // get current task
    function getCurrentTask(event) {
      currentTask = event.value;
    }

    // edit the task and update local storage
    function editTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      // check if task is empty
      if (event.value === "") {
        event.value = currentTask;
        return;
      }
      // task already exist
      tasks.forEach(task => {
        if (task.task === event.value) {
          event.value = currentTask;
          return;
        }
      });
      // update task
      tasks.forEach(task => {
        if (task.task === currentTask) {
          task.task = event.value;
        }
      });
    //  alert("Task-Title has been updated successfully !");
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task-Title has been updated successfully!',
      showConfirmButton: false,
      timer: 1500
    })
      // update local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }




    var currentdesc = null;

    function getCurrentdesc(event) {
      currentdesc = event.value;
    }

    function editdesc(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      // check if task is empty
      if (event.value === "") {
        event.value = currentdesc;
        return;
      }
      // update task
      tasks.forEach(task => {
        if (task.desc === currentdesc) {
          task.desc = event.value;
        }
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task-Description has been updated successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      // update local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    var currentdue = null;

    function getCurrentdue(event) {
      currentdue = event.value;
    }

    function editdue(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      if (event.value === "") {
        event.value = currentdue;
        return;
      }
      // task already exist
      // update task
      tasks.forEach(task => {
        if (task.dueDate === currentdue) {
          task.dueDate = event.value;
        }
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task-Due-Date has been updated successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      // update local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

//******************************Search Task******************************************/
    function searchTask(){
           let filter=document.getElementById('search').value.toUpperCase();
          //  console.log(filter);

        let ul=document.getElementById("ul-list");
        let li=ul.getElementsByTagName('li');

        for(var i=0;i<li.length;i++){
            // let a=li[i].getElementsByClassName('task');

             let textValue=li[i].getElementsByClassName('task')[0].value;
            // console.log(textValue);
            if(textValue.toUpperCase().indexOf(filter) > -1){
                li[i].style.display="";
            }
            else{
                li[i].style.display="none";
            }
        }
    }
    // *******************************************************************************

//***************************Fliters Based on Completion Status*********************/

const dropdowns=document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown =>{
  const select=dropdown.querySelector('.select');
  const caret=dropdown.querySelector('.caret');
  const menu=dropdown.querySelector('.menu');
  const options=dropdown.querySelectorAll('.menu li');
  console.log(options);
  const selected=dropdown.querySelector('.selected');

  select.addEventListener('click',() =>{
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });
  options.forEach(option =>{
    option.addEventListener('click',() =>{
      selected.innerHTML=option.innerHTML;
      // selected.style.backgroundColor = "#766f6f";
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');
      options.forEach(option =>{
        option.classList.remove('active');
      });
      option.classList.add('active');
      selected.classList.add('active2');
    });
  });
});

    function showall(){
      let ul=document.getElementById("ul-list");
      let li=ul.getElementsByTagName('li');
      for(var i=0;i<li.length;i++){
        li[i].style.display="";
      }
  }
    
    
    function searchComplete(){
      let ul=document.getElementById("ul-list");
    let li=ul.getElementsByTagName('li');
    console.log(li);
      for(var i=0;i<li.length;i++){
          let textValue=li[i].getElementsByClassName('completed')[0];
         if(textValue){
           li[i].style.display="";
      }
        else{
           li[i].style.display="none";
      }
   }

}

function searchPending(){
  let ul=document.getElementById("ul-list");
  let li=ul.getElementsByTagName('li');
  console.log(li);
    for(var i=0;i<li.length;i++){
        let textValue=li[i].getElementsByClassName('completed')[0];

       if(!textValue){
        // document.getElementById("filtereddata").innerHTML+=JSON.stringify(li[i]);
         li[i].style.display="";
    }
      else{
         li[i].style.display="none";
    }
 }

}


//************************************************************************** 

 




//*********************************Sorting********************************************

function sortTask(){
  var i;
  let ul=document.getElementById("ul-list");
  // let li=ul.getElementsByTagName('li');
  // console.log(li);

var switching=true;
var shouldswitch;
while(switching){
  switching=false;
  let li=ul.getElementsByTagName('li');
  for(i=0;i<li.length-1;i++){
          shouldswitch=false;
          if((li[i].getElementsByClassName('task')[0].value.toLowerCase()) > (li[i+1].getElementsByClassName('task')[0].value.toLowerCase())){
              shouldswitch=true;
              break;
          }
  }
  if(shouldswitch){
    li[i].parentNode.insertBefore(li[i+1],li[i]);
    switching=true;
  }
}
}


function sortTask2(){
  var i;
  let ul=document.getElementById("ul-list");
  // let li=ul.getElementsByTagName('li');
  // console.log(li);

var switching=true;
var shouldswitch;
while(switching){
  switching=false;
  let li=ul.getElementsByTagName('li');
  for(i=0;i<li.length-1;i++){
          shouldswitch=false;
          if((li[i].getElementsByClassName('task')[0].value.toLowerCase()) < (li[i+1].getElementsByClassName('task')[0].value.toLowerCase())){
              shouldswitch=true;
              break;
          }
  }
  if(shouldswitch){
    li[i].parentNode.insertBefore(li[i+1],li[i]);
    switching=true;
  }
}
}

function sortTask3(){
  var i;
  let ul=document.getElementById("ul-list");
  // let li=ul.getElementsByTagName('li');
  // console.log(li);

var switching=true;
var shouldswitch;
while(switching){
  switching=false;
  let li=ul.getElementsByTagName('li');
  for(i=0;i<li.length-1;i++){
          shouldswitch=false;
          if((li[i].getElementsByClassName('due')[0].value.toLowerCase()) > (li[i+1].getElementsByClassName('due')[0].value.toLowerCase())){
              shouldswitch=true;
              break;
          }
  }
  if(shouldswitch){
    li[i].parentNode.insertBefore(li[i+1],li[i]);
    switching=true;
  }
}
}

function sortTask4(){
  var i;
  let ul=document.getElementById("ul-list");
  // let li=ul.getElementsByTagName('li');
  // console.log(li);

var switching=true;
var shouldswitch;
while(switching){
  switching=false;
  let li=ul.getElementsByTagName('li');
  for(i=0;i<li.length-1;i++){
          shouldswitch=false;
          if((li[i].getElementsByClassName('due')[0].value.toLowerCase()) < (li[i+1].getElementsByClassName('due')[0].value.toLowerCase())){
              shouldswitch=true;
              break;
          }
  }
  if(shouldswitch){
    li[i].parentNode.insertBefore(li[i+1],li[i]);
    switching=true;
  }
}
}

