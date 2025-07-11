const btnAddTask = document.querySelector(".app__button--add-task");
const btnCnclTask = document.querySelector(".app__form-footer__button--cancel");
const form = document.querySelector(".app__form-add-task");
const inputTask = document.querySelector(".app__form-textarea");
const taskList = document.querySelector(".app__section-task-list");
const taskOnGoing = document.querySelector(".app__section-active-task-description");

//Retorna o JSON do localStorage e transforma de JSON para objeto que está armazenado
const tasks = JSON.parse(localStorage.getItem('tarefas')) || [];

let selectedTask = null;
let selectedTaskLi = null;

//Função para atualizar tarefas
function updateTasks (){
    localStorage.setItem("tarefas", JSON.stringify(tasks))
}

//Função para resetar estado padrão
function resetState(){
    inputTask.value = "";
    form.classList.add("hidden");
}

//Função que cria o elemento li que representa a task
function createTask(task){
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");


    const svg = document.createElement("svg");
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragraph = document.createElement("p");
    paragraph.classList.add("app__section-task-list-item-description");
    paragraph.textContent = task.descricao;
    

    const btn = document.createElement("button");
    btn.classList.add("app_button-edit");

    btn.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        if(novaDescricao){
            paragraph.textContent = novaDescricao;
            task.descricao = novaDescricao;
            updateTasks();
        }
        
    }

    const imageBtn = document.createElement("img");
    imageBtn.setAttribute("src", "./imagens/edit.png");

    btn.append(imageBtn);

    li.append(svg);
    li.append(paragraph);
    li.append(btn);


    li.onclick = () =>{

        document.querySelectorAll(".app__section-task-list-item-active")
                .forEach(item => item.classList.remove("app__section-task-list-item-active"));

        if(selectedTask == task){
            taskOnGoing.textContent = "";
            selectedTask = null;
            selectedTaskLi = null;
            return
        }


        selectedTask = task;
        selectedTaskLi = li;
        taskOnGoing.textContent = task.descricao;
        li.classList.add("app__section-task-list-item-active");
    }

    return li;

}

//Coloca cada task dentro da lista de tasks
tasks.forEach(task => {
    const newTask = createTask(task);
    taskList.append(newTask)
});

//Mostra ou esconde o formulário
btnAddTask.addEventListener("click", ()=>{
    form.classList.toggle("hidden");
});

btnCnclTask.addEventListener("click", resetState);


//Envia o item para o array
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const task = {
        descricao: inputTask.value
    }
    tasks.push(task);
    taskList.append(createTask(task));
    resetState();
    updateTasks();
});

document.addEventListener("FocoFinalizado", () =>{
    if(selectedTask && selectedTaskLi){
        selectedTaskLi.classList.remove("app__section-task-list-item-active");
        selectedTaskLi.classList.add("app__section-task-list-item-complete");
        selectedTaskLi.querySelector("button").setAttribute('disabled', 'disabled');
    }
})

