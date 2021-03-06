let todos = [
  { id: 1, content: 'HTML', completed: true, obj: { name: 'rrb'} },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

const $todos = document.querySelector('.todos');
const $completeLeng = document.querySelector('.completed-todos');
const $activeLeng = document.querySelector('.active-todos');
const $addTodo = document.querySelector('.input-todo');
const $nav = document.querySelector('.nav');
const $allComplete = document.querySelector('.custom-checkbox');
const $clearBtn = document.querySelector('.btn');

let navState = 'all';
let _todos = [...todos];
// 렌더링 함수
// 호출될때 결과값을 그려준다.
// 새로 그려줘야 한다.
// > 빈배열을 만들어서 함수가 호출될때 새로 그려주는 방식, 빈변수에 할당해서 뿌려준다.
// (탭을 클릭하면) 나눠서 보여줘야 한다.
// active, 완료되지 않은목록
function render() {
  if(navState === 'all') {
   _todos = todos;
  } else if (navState === 'active') {
    _todos = todos.filter(todo => !todo.completed)
  } else { 
    _todos = todos.filter(todo => todo.completed)
  }

  let html = '';
  _todos.forEach(({id, content, completed}) => 
    html += `<li id="${id}" class="todo-item">
      <input class="custom-checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`
  )
  $todos.innerHTML = html;
  // 삼항연산자는 0부터 계산해야함 (모든연산은
  // 있는지 없는지 부터
  $completeLeng.innerHTML = todos.filter(todo => todo.completed).length;
  $activeLeng.innerHTML = todos.filter(todo => !todo.completed).length;
}


// 아이디 생성
function generateId() {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1
}

// 새로운 todo 추가
$addTodo.addEventListener('keydown', e => {
  if(e.keyCode !==13 || e.target.value === '' ) return;
  todos = [ { id: generateId(), content: e.target.value, completed: false },...todos]
  $addTodo.value = '';
  console.log(todos);
  render();
})

// todo 체크후 바뀌는 렌더링
// 내 이벤트 동작으로 렌더링 값이 바뀐다.
// 내 이벤트 동작과 배열을 연결시킨다.
$todos.addEventListener('change', e => {
  // 내가 원하는 부분을 확인한 후 배열값을 변경해주는 작업을 한다.
  // 완료값을 변경해줘야함
  let id = +e.target.parentNode.id
  todos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed } : todo )
  render();
})

// 액티브 클래스
$nav.addEventListener('click', e => {
  [...$nav.children].forEach((navItem) => {
    if(navItem.id === e.target.id) navItem.classList.add('active');
    else {navItem.classList.remove('active')};
  });
  // id값 할당
  navState = e.target.id;
  render();
})

// x버튼 클릭시 삭제
$todos.addEventListener('click', e => {
  const id = +e.target.parentNode.id
  if(!e.target.classList.contains('remove-todo')) return; 
  todos = todos.filter(todo => todo.id !== id);
  render();
})

// 클릭시 전체선택 & 해제
$allComplete.addEventListener('click', e => {
  if(e.target.checked) todos = todos.map(todo => ({...todo, completed: true}))
  else todos = todos.map(todo => ({...todo, completed: false}))
  render();
})

// clear btn 클릭시 완료된 todo 버려짐
$clearBtn.addEventListener('click', ()=> {
  todos = todos.filter(todo => !todo.completed)
  render
})

render();