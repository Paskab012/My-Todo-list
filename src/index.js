import './style.css';

let tasks = [];

const addToLocalStorage = () => {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
};

const getFromLocalStorage = () => {
  if (localStorage.getItem('myTasks')) {
    tasks = JSON.parse(localStorage.getItem('myTasks'));
  }
  return tasks;
};

const resetIndex = (tasks) => {
  for (let i = 0; i < tasks.length; i += 1) {
    let index = i + 1;
    index = i;
    tasks[i].index = index;
  }
};
