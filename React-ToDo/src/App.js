document.getElementById('btnAdd').addEventListener('click', addList); // 추가
document.getElementById('btnDelAll').addEventListener('click', delAllEle); //전체 삭제
document.getElementById('btnDelLast').addEventListener('click', delLastEle); // 마지막 요소 삭제
document.getElementById('DeleteSel').addEventListener('click', delSelected); //선택 삭제

function addList() {
  //추가
  let contents = document.querySelector('.text-basic');
  if (!contents.value) {
    alert('내용을 입력 해주세요');
    contents.focus();
    // 해당요소에 포커스를 부여
    // 텍스트 창의 경우, 커서를 위치시켜 바로 입력이 가능함
    // 버튼인 경우 엔터키를 눌렀을때 클릭 효과를 내준다.
    return false;
  }
  let tr = document.createElement('tr');
  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  // .setAttribute()는 선택한 요소(element)의 속성(attribute) 값을 정합니다.
  input.setAttribute('class', 'btn-chk');

  let td01 = document.createElement('td');
  td01.appendChild(input);
  tr.appendChild(td01);

  let td02 = document.createElement('td');
  td02.innerHTML = contents.value;
  tr.appendChild(td02);

  document.getElementById('listBody').appendChild(tr);
  contents.value = '';
  contents.focus();
}

function delAllEle() {
  //전체 삭제
  let list = document.getElementById('listBody');
  let listChild = list.childNodes;
  for (let t of listChild) {
    if (t.nodeType == 1) {
      list.removeChild(t)
    }
  }
}

function delLastEle() {
  // 마지막 요소 삭제
  let body = document.getElementById('listBody');
  let list = document.querySelector('#listBody > tr');
  if(list.length > 0){
    let liLen  = list.length-1;
    body.removeChild(list[liLen]);
  }
  else{
    alert('삭제할 항목이 없습니다.');
    return false;
  }
}

function delSelected() {
    let body = document.getElementById('listBody');
    let chkbox = document.querySelectorAll('#listBody .btn-chk');
    for(let i in chkbox){
      if(chkbox[i].nodeType == 1 && chkbox[i].checked == true){
        body.removeChild(chkbox[i].parentNode.parentNode)
      }
    }
}
