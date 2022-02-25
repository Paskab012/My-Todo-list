import './style.css';

let tasks = [
  { description: 'wash the dishes', checked: false, index: 1 },
  { description: 'comple To Do List project', checked: false, index: 2 },
  { description: 'wash car', checked: false, index: 3 },
];

const taskWrapper = document.querySelector('.to-dos');
const newTask = document.querySelector('.new-task');
const addNewTask = document.querySelector('.submit');
const clearAll = document.querySelector('.clear-all');
const reset = document.getElementById('reset');

const addToLocalStorage = () => {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
};

const getFromLocalStorage = () => {
  const retrievedData = JSON.parse(localStorage.getItem('myTasks'));

  tasks = retrievedData;
};

const resetIndex = (tasks) => {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
};

const editTask = (desc, index) => {
  tasks[index].description = desc;
};

const rmvTask = (index) => {
  tasks.splice(index, 1);
  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index -= 1;
  }
};

const clearAllTasks = () => {
  tasks = [];
};

// check for local storage later

const displayTasks = () => {
  taskWrapper.innerHTML = '';

  tasks.forEach((tsk) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (tsk.checked === true) {
      checkbox.setAttribute('checked', 'checked');
    }

    const taskDesc = document.createElement('input');
    taskDesc.classList.add('todotask');
    taskDesc.value = tsk.description;

    const deleteTask = document.createElement('i');
    taskDesc.addEventListener('change', (e) => {
      e.preventDefault();
      editTask(e.target.value, tsk.index - 1);
      taskDesc.blur();
      displayTasks();
      addToLocalStorage();
    });

    deleteTask.classList.add('fa-solid', 'fa-trash');
    deleteTask.addEventListener('click', () => {
      rmvTask(tsk.index);
      resetIndex(tasks);
      displayTasks();
      addToLocalStorage();
    });

    li.append(checkbox, taskDesc, deleteTask);
    taskWrapper.appendChild(li);
  });
};

const onPageReload = () => {
  if (localStorage.getItem('myTasks')) {
    getFromLocalStorage();
  }
  displayTasks();
};

const clearCompletedTasks = () => {
  tasks = tasks.filter((item) => !item.checked);
  resetIndex(tasks);
  displayTasks();
  addToLocalStorage();
};

clearAll.addEventListener('click', clearCompletedTasks);

const addToTasks = () => {
  const position = tasks.length;
  tasks.push({
    description: newTask.value,
    checked: false,
    index: position,
  });
  newTask.value = '';
  displayTasks();
  addToLocalStorage();
};

reset.addEventListener('click', () => {
  clearAllTasks();
  displayTasks();
  addToLocalStorage();
});

addNewTask.addEventListener('click', (e) => {
  e.preventDefault();
  addToTasks();
});

onPageReload();
