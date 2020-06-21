import "index.css";

const clockContainer = document.querySelector("#js-clock"),
    clockTitle = clockContainer.querySelector("h2");

function getTime(){
    const xmasDay = new Date("2020-12-24 : 00:00:00+0900");
    const date = new Date();

    let Dday = xmasDay.getTime() - date.getTime();
    
    const Day = Math.floor(Dday / 86400000);
    Dday -= Day * 86400000;

    const Hours = Math.floor(Dday / 3600000);
    Dday -= Hours * 3600000;

    const Minutes = Math.floor(Minutes / 60000);
    Dday -= Minutes * 60000;

    const Seconds = Math.floor(Seconds / 1000);


    clockTitle.innerText=
    `${Day < 10 ? `0${Day}` : Day}D
     ${Hours < 10 ? `0${Hours}` : Hours}H
     ${Minutes < 10 ? `0${Seconds}` : Seconds}S
    }`;
}
function init()
{
    getTime();
    setInterval(getTime, 1000);
}
init();