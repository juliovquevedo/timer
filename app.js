document.getElementById("start").onclick = myFunction;
  


function myFunction () {

//    var minutes = 0;
//    var seconds = 0;
    var centisecs = 0;
//    var tracker = 1;
    
    setInterval(StartTimer, 10);
    
    function StartTimer () {

//        if (tracker % 100 == 0) {
//            seconds++;
//        }
//        if (tracker % 6000 == 0) {
//            minutes++;
//    }
        centisecs++;
//        tracker++;
        
        
        document.getElementById("timer").innerHTML = centisecs;
//        document.getElementById("timer").innerHTML = minutes + ":" + seconds + ":" + centisecs;
    }
}