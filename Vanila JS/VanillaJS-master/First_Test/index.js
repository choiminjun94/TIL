const mouseControl ={
    on :function(){
        title.innerHTML = "mouse is here!"
        title.style.color ="red";
    },
    out : function(){
        title.innerHTML="The mouse is gone"
        title.style.color="blue";
    },
    rightClick : function(){
        title.innerHTML="Right Click!"
        title.style.color="purple"
    },
    resized: function(){
        title.innerHTML ="resize";
        title.style.color="Orange"
    },
    down :  function(){
        title.innerHTML="Click Down"
        title.style.color = "green"
    },
    up : function(){
        title.innerHTML="Click UP!!!"
        title.style.color="gold"
    }

};
const title = document.querySelector("#title");
title.addEventListener("mouseover" ,mouseControl.on);
title.addEventListener("mouseout", mouseControl.out);
window.addEventListener("contextmenu", mouseControl.rightClick);
window.addEventListener("resize", mouseControl.resized);
title.addEventListener("mousedown", mouseControl.down);
title.addEventListener("mouseup", mouseControl.up);