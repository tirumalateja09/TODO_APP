const writeTask=document.querySelector(".write-task");
const btn=document.querySelector(".sub-task");
const content=document.querySelector(".content");
const myCheckbox=document.querySelector(".myCheckbox");

let contentArray=JSON.parse(localStorage.getItem('tasks'))||[];

function store(){
    localStorage.setItem('tasks',JSON.stringify(contentArray));
}

function deleteTodo(todo){
    contentArray=contentArray.filter((value)=> value.task!=todo);
    store();
    render();
}

function editTodo(todo,index){
    contentArray[index].task=todo;
        store();
        render();
}
function render(){
    content.innerHTML='';
    contentArray.forEach((ele,index)=>{
     
      const t1=document.createElement('div');
      t1.classList.add("t1");

      const check=document.createElement('input');
      check.type='checkbox';
      check.checked=ele.iscompleted;
      check.classList.add("myCheckbox");
      t1.appendChild(check);

      const textValue=document.createElement('p');
      textValue.type='text';
      textValue.classList.add('text');
     
   // uses after refreashing the page
      if(check.checked){
        textValue.classList.add('line');
      }

      textValue.textContent=ele.task;
      textValue.setAttribute('contenteditable', 'false');
      t1.appendChild(textValue);

      const edit=document.createElement('img');
      edit.src="/editing_flat.png";
      edit.classList.add('edit-pic');
      t1.appendChild(edit);

      const del=document.createElement('img');
      del.src="/delete _flat.png"
      del.classList.add('delete-pic');
     
      t1.appendChild(del);
     
    check.addEventListener('click',(event)=>{
       ele.iscompleted=event.target.checked;

        textValue.classList.toggle('line');
       
        // if(ele.iscompleted){  
        //     textValue.classList.add('line');  
        //     // alert("You are making it as completed");
        // }
        //  else{
        // //   alert("you are unchecking the task");
        //   textValue.classList.remove('line');
        //  }
         store();
         
    })

    del.addEventListener('click',()=>{  
        deleteTodo(ele.task); 
        // deleteTodo(textValue.textContent.trim());     
        })
    
    //  edit.addEventListener('click',(event)=>{
      
    //   textValue.setAttribute('contenteditable', 'true');
    //    editTodo(textValue.textContent.trim(),index);
    //  })

     
     edit.addEventListener('click', () => {
        textValue.setAttribute('contenteditable', 'true');
        // Save changes when editing is done
        textValue.addEventListener('blur', () => {
            textValue.setAttribute('contenteditable', 'false');
            editTodo(textValue.textContent.trim(), index);
        });
    });

    content.appendChild(t1);
    //   console.log(t1.textContent);
    })
}
btn.addEventListener('click',()=>{
    const enteredValue=writeTask.value;
    if(enteredValue==''){
        alert("Please enter the task to add");
    }
    else{
        let obj={
            task:enteredValue,
            iscompleted:false
        }
        console.log(enteredValue);
       
        contentArray.push(obj);
        store();
        render();
        writeTask.value='';
    }
})

function get(){
    const data=JSON.parse(localStorage.getItem('tasks'));
    contentArray=data||[];
        render();
    
}
window.onload=get;