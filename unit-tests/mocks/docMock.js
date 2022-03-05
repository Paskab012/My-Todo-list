const createMockDoc = () => {
  document.body.innerHTML = `
  <div id="container">
  <div id="today">
      <p id="title">Today's To Do</p>
      <i class="fa-solid fa-arrows-rotate"></i>
  </div>
  <form>

      <input required id="task" type="text" placeholder="Add to your list..." /><img id="enter" src="#"
          alt="enter image">
      <ul class="list"></ul>
      <button id="clear" type="button">Clear all completed</button>
</form>
</div>
    `;
};

export default createMockDoc;