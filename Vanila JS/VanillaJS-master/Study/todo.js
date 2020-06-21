const toDoForm = document.querySelector(".js-toDoForm"),
                        // querySelector은 HTML에서 값은 가져온것이다. 
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const  ToDOS_LS ='toDos';



let toDos =[];

function deleteToDo(event){
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos();
}
// filter는 마치 forEach에서  functiondmf 실행하는 것 같이 각각의 item과 같이 실행
// filter가 하는 것은 'array'을 하나 만듬
// filter와 Foreach는 list에 잇는 모든 item을 위한 함수를 실행 시킴 


function saveToDos(){
    localStorage.setItem(ToDOS_LS, JSON.stringify(toDos));
    //JSON.stringify(toDos) 자바 스크립트는 data를 저장할수 없으며 String만 저장할수 있기에 사용
}
function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo); 
    span.innerText = text;
    li.appendChild(delBtn);
    // 아래에 있으면 버튼이 뒤로 간다.
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj ={
        text : text,
        id : newId
        //idsms 처음엔 1이다.
    };
    toDos.push(toDoObj);
    //toDos에 값을 넣기
    saveToDos(); 
    // 이것을 앞에 저장하면 toDos는 비어 있기에 저장할게 없다.
  }

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadToDos = localStorage.getItem(ToDOS_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
       parsedToDos.forEach(function(toDo){
           paintToDo(toDo.text);
           //array 관련 funtaion
       })
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init(); 