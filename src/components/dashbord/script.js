
export const toggleSideBar = ()=>{
let sidebar = document.querySelector(".sidebar");
let navList = document.querySelector(".nav-list");
  sidebar.classList.toggle("open");
  navList.classList.toggle("scroll");
  menuBtnChange();//calling the function(optional)
}

export const searchBtn = ()=>{
toggleSideBar()
}

// following are the code to change sidebar button(optional)
function menuBtnChange() {
let closeBtn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the icons class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the icons class
 }
}