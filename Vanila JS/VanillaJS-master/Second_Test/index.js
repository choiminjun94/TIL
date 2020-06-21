const color = document.getElementById("all");

function ColorChange(){
    //함수 선언
    const width = window.innerWidth;
    console.log(width);
    
    if(width <500){
        color.style.backgroundColor = "#e74c3c";
    }
    else if(width >= 500 &&  width<=700)
    {
        color.style.backgroundColor = "#2980b9";
    }
    else
    {
        color.style.backgroundColor = "#2ecc71";
    }
}

ColorChange();
window.addEventListener("resize", ColorChange);