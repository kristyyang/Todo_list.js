var removeSVG = '<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></svg>';
var completeSVG ='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="nofill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

//check whether in the local storage whether there are elements need to be completed, else clear the array for both lists
var data=(localStorage.getItem('todoList'))?JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};

renderTodoList();

// console.log(JSON.parse(localStorage.getItem('todoList')));
// For checking whether the button click or not

// function buttonClick(){
//     console.log('Button clicked!');
// }
//document.getElementById('add').addEventListener('click',buttonClick());


//User clicked on the add button
// If there is any text inside the  field, add that goal to the list
document.getElementById('add').addEventListener('click',function(){
    var value = document.getElementById('item').value;
     // console.log(value);
    if(value) {

        addItemtodo(value);
        document.getElementById('item').value= '';

        data.todo.push(value);
        sendItemToAPI(value);
        dataObjectUpdated();
    }
});

document.getElementById('item').addEventListener('keydown',function(e){
    var value = this.value;
   if(e.code ==='Enter' && value){
       addItemtodo(value);
       document.getElementById('item').value= '';

       data.todo.push(value);
       sendItemToAPI(value);
       dataObjectUpdated();
   }
});


function renderTodoList() {
    if(!data.todo.length && !data.completed.length) return ;

    for(var i = 0; i < data.todo.length; ++i){
        var value = data.todo[i];
        addItemtodo(value);
    }

    for(var j= 0; j < data.completed.length; ++j){
        var value = data.completed[j];
        addItemtodo(value,true);
    }

}


function dataObjectUpdated(){
    // console.log(JSON.stringify(data));
    localStorage.setItem('todoList',JSON.stringify(data));
}

// ADD NEW ITEM TO THE todo_list
function addItemtodo(text,completed){
    var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText =text;


    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    remove.addEventListener('click',removeItem);

    //Add click event for removing item



    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    complete.addEventListener('click',completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.appendChild(item);

}




function removeItem(){
    // console.log(this.parentNode.parentNode);
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;

    var id = parent.id;
    var value = item.innerText;

    // Delete element from to_do or completed array lists if the element wants to be deleted
    if(id === 'completed'){
        data.completed.splice(data.completed.indexOf(value),1);
    }else{
        data.todo.splice(data.todo.indexOf(value),1);
    }

    dataObjectUpdated();

    parent.removeChild(item);

}

function completeItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if(id === 'todo'){
        //Add data value into to_do array list
        data.todo.splice(data.todo.indexOf(value),1);
        //if data complete push the value into completed array list
        data.completed.push(value);
    }else{
        data.completed.splice(data.completed.indexOf(value),1);
        data.todo.push(value);
    }

    dataObjectUpdated();


    // console.log(data);  //check whether we have added the value into list?

    // console.log(item.innerText); checking the inner text from the complete list
    //Checked if the item should be added to completed to re-added to the todo list;
    var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');


    parent.removeChild(item);
    target.insertBefore(item,target.childNodes[0]);

}

// Method for sending to-do item to API
function sendItemToAPI(item){
   var req = new XMLHttpRequest();
   // When you add request/plan to list, it will add to
   req.open('POST','/add');

   // send request when run req open to make it possitble to add headers  and sent request to whether it is
   req.send(JSON.stringify({item: item}));

   req.addEventListener('load',()=>{
    //    console.log(req.responseText);
    console.log('Request done!')
   });

   req.addEventListener('error', ()=>{
       console.log('Error, something bad happend.');
       console.log(e);
   });
}
