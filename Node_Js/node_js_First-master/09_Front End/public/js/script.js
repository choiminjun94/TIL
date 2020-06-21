$(function(){
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
    // convertDate함수는 html element중에 data-date이 있는 것을 찾습니다
    // data-date에 날짜데이터가 들어 있으면, 해당 데이터를 년-월-일의 형태로 변환해서 element의 텍스트 데이터로 넣습니
    $('[data-date]').each(function(index,element){
      //console.log(element)
      var dateString = $(element).data('date');
      if(dateString){
        var date = new Date(dateString);
        $(element).html(getDate(date));
      }
    });
  }

  function convertDateTime(){
    // convertDateTime함수는 data-date-time을 찾아서 년-원-일 시:분:초의 형태로 변환해서 출력합니다.
    //이렇게 하는 이유는 JavaScript에서 날짜/시간을 원하는 형태(format)으로 만들기 위해서입니다
    $('[data-date-time]').each(function(index,element){
      var dateString = $(element).data('date-time');
      if(dateString){
        var date = new Date(dateString);
        $(element).html(getDate(date)+' '+getTime(date));
      }
    });
  }

  convertDate();
  convertDateTime();
});
