const form = document.querySelector("#todo-form") as HTMLFormElement;
const taskTitleInput = document.querySelector(
  "#task-title-input"
) as HTMLInputElement;
const todoListUl = document.querySelector("#todo-list");

interface Task {
  title: string;
  done: boolean;
}

let tasks: Task[] = [];

// Função para atualizar o LocalStorage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carregar as tarefas do LocalStorage
function loadlTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks); // pega o que é string e transforma em objeto
    renderTasks(); // Renderizar as tarefas carregadas
  }
}

function renderTasks(){
    todoListUl!.innerHTML = ''; // Limpa a lista antes de renderizar novamente
    tasks.forEach((task) => {
        const li = document.createElement('li');

        const input = document.createElement('input');
        input.setAttribute("type", "checkbox");
        input.checked = task.done; // Define o estado do checkbox com base na tarefa

        const span = document.createElement('span');
        span.textContent = task.title;
        if (task.done){
            span.style.textDecoration = 'line-through'; // marca a tarefa como concluída
        }

        const button = document.createElement( 'button');
        button.textContent = '-';

        button.addEventListener( "click", () => {
            tasks = tasks.filter((t) => t.title !== task.title);
            updateLocalStorage();
            renderTasks(); // Re-renderiza as tarefas
        });

        input.addEventListener("change", () => {
            task.done = input.checked; // Atualiza o estado de 'done da tarefa
            span.style.textDecoration = input.checked ? "line-through" : "none"; // atualiza a decoração do texto
            updateLocalStorage(); // Atualiza o LocalStorage
        });

        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(button);
        todoListUl?.appendChild(li);
    });
}

window.onload = () => {
    loadlTasksFromLocalStorage();
}

form?.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita o comportamento padrão de recarregar a pagina ao submeter o form

  const taskTitle = taskTitleInput.value;
  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.");
    return;
  }

  // Adicionando a nova tarefa no Array de tasks
  const newTask: Task = {
    title: taskTitle,
    done: false,
  }

  tasks.push(newTask);

  updateLocalStorage(); // atualiza o LocalStorage
  renderTasks(); // Re-renderiza as tarefas

  taskTitleInput.value = "";
});