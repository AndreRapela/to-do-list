;(function () {
    "use strict"

    function Task(name){
        this.name = name
        this.createAt = Date.now()
        this.updateAt = null
        this.completed = false
    }



    //ARMAZENAR O DOM EM VARIÁVEIS
    const intemInput = document.getElementById('item-input')
    const todoAddForm = document.getElementById('todo-add')
    const ul = document.getElementById('todo-list')
    const lis = ul.getElementsByTagName("li")
    
    
    let arrTasks = getSavedData()
    
    function getSavedData(){
        let taskData = JSON.parse(localStorage.getItem('tasks'))

        
        return taskData && taskData.length ? taskData : [new Task("task 1"),new Task("task 2")]
    }

    function setNewData(){
        localStorage.setItem('tasks',JSON.stringify(arrTasks))
    }
    setNewData()

    function addTask(task){
        const li = document.createElement("li")
        li.classList = "todo-item"

        const p = document.createElement('p')
        p.className = "task-name"
        p.textContent = task.name

        const button = document.createElement('button')
        button.className = "button-check"
        button.innerHTML = `<i class="fas fa-check ${task.completed ? "" : "displayNone"} data-action ="checkButton" ></i>`
        button.setAttribute('data-action','checkButton')

        const editButton = document.createElement('i')
        editButton.className = 'fas fa-edit'
        editButton.setAttribute('data-action', 'editButton')

        const contEditBtn = document.createElement('button')
        contEditBtn.className = "editButton"
        contEditBtn.textContent = "Edit"
        contEditBtn.setAttribute('data-action', 'contEditBtn')

        const contCancelBnt = document.createElement('button')
        contCancelBnt.className = 'cancelButton'
        contCancelBnt.textContent = "Cancel"
        contCancelBnt.setAttribute('data-action', 'contCancelBtn')

        const deleteButton = document.createElement('i')
        deleteButton.className = "fas fa-trash-alt"
        deleteButton.setAttribute('data-action' , 'deleteButton')


        const containerEdit = document.createElement("div")
        containerEdit.className = "editContainer"
        const inputEdit = document.createElement('input')
        inputEdit.setAttribute('type', 'text')
        inputEdit.className = "editInput"
        inputEdit.value = task.name

        containerEdit.appendChild(inputEdit)
        containerEdit.appendChild(contEditBtn)
        containerEdit.appendChild(contCancelBnt)

       
        li.appendChild(button)
        li.appendChild(p)
        li.appendChild(editButton)
        li.appendChild(deleteButton)
        li.appendChild(containerEdit)

        AddDelet(li)
    
        return li
    }
    let troca = "vou morar só no rio"
    console.log(troca.replace('rio','montanha'))

    function renderTasks(){
        ul.innerHTML = ""
        arrTasks.forEach(li =>{
            ul.appendChild(addTask(li))
        })
        setNewData()
    }

    function armazenaTask(name){
        
        let task = new Task(name)

        arrTasks.push(task)

        console.log(arrTasks)
    }

    todoAddForm.addEventListener('submit', function (e) {
        e.preventDefault()
        // ul.innerHTML += `
        // <li class="todo-item">
        // <p class="task-name">${intemInput.value}</p>
        // </li>
        // `
        armazenaTask(intemInput.value)
        renderTasks()
        intemInput.value = ""
        intemInput.focus()
    
    });



    function AddDelet(li){
        const del = li.lastChild
        del.addEventListener('click' , function(e){
            e.preventDefault()
            
            
        })
    }

   function clickedUl(e){
        const dataAction = e.target.getAttribute('data-action')
        
        if(!dataAction) return

        let currentLi = e.target
        while(currentLi.nodeName !=='LI'){
            currentLi = currentLi.parentElement
        }

        const currentLiIndex = [...lis].indexOf(currentLi)
       

        const actions = {
            editButton: function(){
                const editContainer = currentLi.querySelector('.editContainer');
                [...ul.querySelectorAll('.editContainer')].forEach(container => {
                    container.removeAttribute("style")
                });

                editContainer.style.display = 'flex';
            },
            deleteButton: function(){
                arrTasks.splice(currentLiIndex,1)
                    // currentLi.remove()
                    renderTasks()
                    
                } ,
            contEditBtn:function(){
                const val = currentLi.querySelector(".editInput").value
                arrTasks[currentLiIndex].name = val
                arrTasks[currentLiIndex].updateAt = Date.now()
                renderTasks()
                
            },
            contCancelBtn: function(){
                currentLi.querySelector('.editContainer').removeAttribute("style")

                currentLi.querySelector('.editInput').value = arrTasks[currentLiIndex].name
            },
            checkButton: function(){
                
                arrTasks[currentLiIndex].completed  = !arrTasks[currentLiIndex].completed 
                

            if(arrTasks[currentLiIndex].completed ){    
                currentLi.querySelector('.fa-check').classList.remove("displayNone")
            }else{
                currentLi.querySelector('.fa-check').classList.add("displayNone")
            }

            renderTasks()

            }
        }

        if(actions[dataAction]){
            actions[dataAction]()
        }

        // if(actions[dataAction] ==='checkButton'){
        //     if(i.classList.contains('displayNone')){
        //         i.classList.remove('displayNone')
        //     }else{
        //             i.classList.add('displayNone')
        //     }
        // }
   }

    ul.addEventListener('click',clickedUl)
   renderTasks()

})()