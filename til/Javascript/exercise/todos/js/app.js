let todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

let $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
// // let checkBox = document.createElement('')
// let list = document.createElement('li');
// // console.log($ul)

// completed 개수
function completedTodos() {
  document.querySelector('.completed-todos').innerText = todos.filter(todo => todo.completed).length;
}

// !completed 개수
function unCompletedTodos() {
  document.querySelector('.active-todos').innerHTML = todos.filter(todo => !todo.completed).length
}


// 렌더링
function renderTodos() {
  let html = '';
  todos.forEach(({id, content, completed}) => {
    html += `<li id=${id} class="todo-item">
      <input class="custom-checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`
  })

  $todos.innerHTML = html;
  completedTodos();
  unCompletedTodos();
}

// 아이디 생성
function generateId() {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

// todolist 새로 추가
  $input.addEventListener('keydown', (e) => {
    const content = $input.value.trim();
    if(e.keyCode !== 13 || content === '') return;

    $input.value = '';
    todos = [{id: generateId(), content, completed: false},...todos];
    renderTodos();
  })
  
  // input 체크박스 
  $todos.addEventListener('change', e => {
    const id = +e.target.parentNode.id;
    // console.log(id)
    todos = todos.map(todo => (todo.id === id ? {...todo, completed: !todo.completed} : todo));
    console.log(todos);
    renderTodos();

  });


renderTodos();



