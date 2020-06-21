// public/js/script.js
// client의 브라우저에서 사용하게 될 JavaScript입니다
// public 폴더에 들어 있으며, head.ejs파일에 이 파일을 불러오는 코드가 작성
// 이곳은 jQuery로 작성

$(function(){
    // $을 붙이는 이유는 jquery 객체라는 의미
    //  jquery 객체라서 선언문 안봐도 저 뒤에 홀로 쓰이고 있어도 뭐하는 역할인지 알 수 있죠
    function get2digits (num){
      return ('0' + num).slice(-2);
    }
  
    function getDate(dateObj){
      if(dateObj instanceof Date)
        return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth()+1)+ '-' + get2digits(dateObj.getDate());
    }
  
    function getTime(dateObj){
      if(dateObj instanceof Date)
        return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes())+ ':' + get2digits(dateObj.getSeconds());
    }
  
    function convertDate(){
      $('[data-date]').each(function(index,element){
        // data-data는 밑과 같은 역할을 한다. 
        // <span data-date="2020-01-08T20:08:24.586Z">2020-01-08</span> 
        // data-date에 날짜데이터가 들어 있으면, 해당 데이터를 년-월-일의 형태로 변환해서 element의 텍스트 데이터로 넣습니다.
        var dateString = $(element).data('date');
        if(dateString){
          var date = new Date(dateString);
          $(element).html(getDate(date));
        }
      });
    }
    // convertDate함수는 html element중에 data-date이 있는 것을 찾습니다
  
    function convertDateTime(){
      $('[data-date-time]').each(function(index,element){
        var dateString = $(element).data('date-time');
        if(dateString){
          var date = new Date(dateString);
          $(element).html(getDate(date)+' '+getTime(date));
        }
      });
    }
    //convertDateTime함수는 data-date-time을 찾아서 년-원-일 시:분:초의 형태로 변환해서 출력합니다.
    //이렇게 하는 이유는 JavaScript에서 날짜/시간을 원하는 형태(format)으로 만들기 위해서입니다.
    convertDate();
    convertDateTime();
  });

  // get2digits, getDate, getTimes는 onvertDate함수, convertDateTime함수 안에서 사용되는 함수이다.
  // 