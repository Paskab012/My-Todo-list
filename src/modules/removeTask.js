const removeTaskAdded = (index, list, task) => {
  list.removeTask(index);
  if (!list.taskList.length) {
    task.parentNode.classList.add('dn');
  }
  task.remove();
};

export default removeTaskAdded;
