
var mailboxes = [];
var mailbox = [];

window.addEventListener("load",function(){

  loadList(mailboxes);

  showButton("remove",mailboxes);
  //listener for touch on the list of mailboxes
  document.getElementById("mailboxes-list").addEventListener("touchend",function(event){

    id = event.target.getAttribute("id");

    for(i=0;i<mailboxes.length;i++){
      mailitem = mailboxes[i];

      if(mailitem.id == id){
        mailitem.status = 1;
        // console.log(mailboxes);
        renderList("mailboxes-list",mailboxes);
      }
    }
    showButton("remove",mailboxes);

  });

  document.getElementById("remove").addEventListener("touchend",function(){

    var len = mailboxes.length-1;
    // console.log(len);
    for(i=len;i>=0;i--){
      var item = mailboxes[i];

      if(item.status == 1){
        mailboxes.splice(i,1);
        // saveList(mailboxes);
        renderList("mailboxes-list",mailboxes);
      }
    }
    showButton("remove",mailboxes);
  });

  document.getElementById("add-account")
  .addEventListener("touchend", function(args){

    document.querySelector("#modal").setAttribute("class","modal open");

  });

});

var inputform = document.getElementById("input-form");
inputform.addEventListener("submit",function(event){
  event.preventDefault();
  //get task inputs values
  var obj = {};

  for(i = 0; i < inputform.length; i++){
    if(inputform[i].value != ""){
      obj[inputform[i].name] = inputform[i].value;
    }
  }

  if(obj != null){
    createMailbox(obj);
    inputform.reset();
    document.getElementById("modal").classList.remove("open");
    document.getElementById("message").style.display = "none";
  }

});

function createMailbox(obj){

  id = new Date().getTime();
  mailitem = {id:id,name:obj["name"],account:obj["account"],email:obj["email"],status:0,unread:10};

  mailboxes.push(mailitem);
  renderList("mailboxes-list",mailboxes);
}

function saveList(list_array){
  // console.log("save >>>",list_array);
  if(window.localStorage){
    localStorage.setItem("mailboxes",JSON.stringify(list_array));
  }
}

function loadList(list_array){

  if(window.localStorage){
    try{
      obj = JSON.parse(localStorage.getItem("mailboxes"));
      // console.log(obj);
      if(obj && obj.length > 0){

        document.getElementById("message").style.display = "none";
        mailboxes = JSON.parse(localStorage.getItem("mailboxes"));
        renderList("mailboxes-list",mailboxes);

      } else {
        localStorage.setItem("mailboxes",JSON.stringify([]));
        document.getElementById("message").style.display = "block";
      }
    }
    catch(error){
      console.log("error"+error);
    }
  }
}

function renderList(elm,list_array){

    var container = document.getElementById(elm);

    while(container.hasChildNodes()){
      container.removeChild(container.firstChild);
    }

    // console.log("render>>>> " + elm, list_array);

    saveList(list_array);

    itemstotal = list_array.length;

    for(i=0;i<itemstotal;i++){
      item = list_array[i];
      console.log("itera", item);
      listitem = document.createElement("li");
      listitem.innerHTML = item.name;

      content = document.createElement("small");
      content.innerHTML = item.email;

      listitem.appendChild(content);

      if(item.unread && item.unread != undefined){
        pointer = document.createElement("span");
        pointer.setAttribute("class","unread");
        pointer.innerHTML = item.unread;
        listitem.appendChild(pointer);
      }

      listitem.setAttribute("id",item.id);
      listitem.setAttribute("data-status",item.status);

      if(item.status==1){

        listitem.setAttribute("class","mailbox-item default");

      } else {

        listitem.setAttribute("class","mailbox-item");
      }
      container.appendChild(listitem);

  }
}

function showButton(element,arr){

  var show=false;
  var len=arr.length;
  for(i=0;i<len;i++){
    var item = arr[i];
    if(item.status == 1){
      show = true;
    }
  }
  if(show==true){
    document.getElementById(element).setAttribute("class","show");
  }
  else{
    document.getElementById(element).removeAttribute("class");
  }
}
