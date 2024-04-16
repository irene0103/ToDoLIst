// 防止預設刷新頁面
const form = document.getElementById("input-wrapper");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
});
//讓頁面重新整理，項目依然存在localStorage
//1.開啟頁面時，載入localStorage的資料
//2.做每個動作(新增刪除修改)的狀態都要存入localStorage

let listState=[];
const STATE_KET="todo-list"
function loadState() {
    const listState=localStorage.getItem(STATE_KET);
    if (listState!==null) {
        return JSON.parse(listState); //字串轉物件
    }
    return[]; //如果localStorage沒有東西，代表todo-list是空的，用空的Array代表
}
function saveState(list) {
    //把Array轉成字串，存到localStorage
    localStorage.setItem(STATE_KET,JSON.stringify(list));
}
function initList() {
    //把存在localStorage的狀態讀出來
    listState=loadState();
    //渲染在畫面上
    const ul=document.getElementById("list");
    //將所有的item存到html裡
    for (const item of listState) {
        const li=document.createElement("li");
        li.innerText=item.text;
        const deleteButton=document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.onclick=deleteButton;
        li.appendChild(deleteButton);
        li.classList.add("item");
        if(item.checked){
            li.classList.add("checked");
        }
        ul.appendChild(li);
        
    }
}

//新增項目
function addItem(){
    const ul=document.getElementById("list");
    const input=document.getElementById("input");
    const text=input.value;
    //空白提示
    if(text===""){
        alert("請輸入內容");
        return;
    }
    //新增項目
    const newItem=document.createElement("li");
    newItem.classList.add("item");
    newItem.innerText=text;

    //已完成項目
    newItem.onclick=checkItem;

    //刪除項目
    const deleteButton=document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.onclick=deleteItem;

    newItem.appendChild(deleteButton);

    //先更新listState之後再同步更新DOM
    listState.push({
        text,
        checked:fasle
    });
    saveState(listState);
    //清空
    input.value="";
    ul.appendChild(newItem);
}
//已完成項目
function checkItem(){
    const item=this;
    item.classList.toggle("checked");
    
}
//刪除項目
function deleteItem(){
    const item=this.parentNode;
    const parent=item.parentNode;
    parent.removeChild(item);
}
initList();

const addButton=document.getElementById("add-button");
addButton.addEventListener("click",addItem);
