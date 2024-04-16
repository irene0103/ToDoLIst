// 防止預設刷新頁面
const form = document.getElementById("input-wrapper");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
});

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
    input.value="";
    ul.appendChild(newItem);
}

function checkItem(){
    const item=this;
    item.classList.toggle("checked");
    
}

function deleteItem(){
    const item=this.parentNode;
    const parent=item.parentNode;
    parent.removeChild(item);
}

const addButton=document.getElementById("add-button");
addButton.addEventListener("click",addItem);
