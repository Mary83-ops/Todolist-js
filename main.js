const list_todo = document.getElementById("list");
const create_btn = document.getElementById("create");

let todos = [];

create_btn.addEventListener('click', NewTodo);

function NewTodo () {
    const task = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    todos.unshift(task);

    const { task_todo, input_todo } = CreateTodoElement(task);

    list_todo.prepend(task_todo);

    input_todo.removeAttribute("disabled");
    input_todo.focus();

    Save();
}


function CreateTodoElement(task) {
    const task_todo = document.createElement("div");
    task_todo.classList.add("task");

    const input_todo = document.createElement("input");
    input_todo.type = "text";
    input_todo.value = task.item;
    input_todo.setAttribute("disabled", "");

    const actions_todo = document.createElement("div");
    actions_todo.classList.add("actions");

    const edit_btn = document.createElement("button");
    edit_btn.classList.add("edit-todo");
    edit_btn.innerText = "Edit";

    const delete_btn = document.createElement("button");
    delete_btn.classList.add("delete-todo");
    delete_btn.innerText = "Delete";

    actions_todo.append(edit_btn);
    actions_todo.append(delete_btn);

    task_todo.append(input_todo);
    task_todo.append(actions_todo);

    input_todo.addEventListener("input", () => {
        task.text = input_todo.value;
    });

    input_todo.addEventListener("blur", () => {
    input_todo.setAttribute("disabled", "");

    Save();
    });

    edit_btn.addEventListener("click", () => {
        input_todo.removeAttribute("disabled");
        input_todo.focus();
    });

    delete_btn.addEventListener("click", () => {
        todos = todos.filter(t => t.id !=task.id);

        task_todo.remove();

        Save();
    });

    return { task_todo, input_todo, edit_btn, delete_btn}
    }

function DisplayTodos() {
    Load();

    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];

        const { task_todo } = CreateTodoElement(task);

        list_todo.append(task_todo)
    }
}

DisplayTodos();

function Save() {
    const save = JSON.stringify(todos);

    localStorage.setItem("my_todos", save);
}

function Load() {
    const data = localStorage.getItem("my_todos");

    if (data) {
        todos = JSON.parse(data);
    }
}