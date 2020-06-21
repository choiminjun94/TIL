
const choice  =document.querySelector(".choice");
  option = choice.querySelectorAll("option");

for (const item of option){
  if(item.value === localStorage.getItem("country")){
    item.setAttribute("selected", 0) ;
  }
}

choice.addEventListener("change", event =>{
  localStorage.setItem("country", event.target.value);
});


// const choice = document.querySelector(".choice"),
//   option = choice.querySelectorAll("option");

// for (const item of option) {
//   if (item.value === localStorage.getItem("country")) {
//     item.setAttribute("selected", 0);
//   }
// }

// choice.addEventListener("change", event => {
//   localStorage.setItem("country", event.target.value);
// });
