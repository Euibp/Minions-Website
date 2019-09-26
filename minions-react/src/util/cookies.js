//Funções de Cookies

export function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var splitArguments = decodedCookie.split(';');
    for(var index = 0; index<splitArguments.length; index++) {
      var argument = splitArguments[index];
      while (argument.charAt(0) === ' ') {
        argument = argument.substring(1);
      }
      if (argument.indexOf(name) === 0) {
        return argument.substring(name.length, argument.length);
      }
    }
    return "";
  }

 export function setCookie(cookieName, cookieValue, expiresDays) {
    var data = new Date();
    data.setTime(data.getTime() + (expiresDays*24*60*60*1000));
    var expiresTime = "expires="+ data.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expiresTime + ";path=/";
  }



  export function getCookieMinionList(){
    var Cookie = getCookie("minions");
    if(Cookie === "") return "";
    return JSON.parse(Cookie);
  }


  ///Funções da parte de cards
  export function addCookieMinion(minionData) {
    var Cookie = getCookie("minions");
    if (Cookie === ""){
      Cookie = "[]"
    }
    var minions = JSON.parse(Cookie);
    minions.push({"id":minionData.id,"name":minionData.nome})
    Cookie = JSON.stringify(minions)
    setCookie("minions",Cookie,7)
  }
  
  export function removeCookieMinion(minionId){
    var Cookie = getCookie("minions");
    if (Cookie === "") return false
    var minions = JSON.parse(Cookie);
    minions = minions.filter(item => item.id !== minionId)
    Cookie = JSON.stringify(minions)
    setCookie("minions",Cookie,7)
  
  }

  export function checkCookieMinion(minionId) {
    var Cookie = getCookie("minions");

    if (Cookie === "") return false
    var minions = JSON.parse(Cookie);
    var check = false;
    minions.forEach(minion => {
      if(minionId === minion.id) check = true
    }
    );
    return check
    
  }
