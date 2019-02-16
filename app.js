//document.getElementById("start").onkeyup = StartTimer;
document.getElementById("start").touchend = StartTimer;
  
function StartTimer () {
    document.getElementById("start").id = "stop";
    var counter = 0;
    var minutes = 0;
    var seconds = 0;
    var centisecs = 0;
    var output = "";
    var stop = setInterval(StartTimer, 10);
    
    function StartTimer () {
        output = "";
        counter++;
        centisecs = counter % 100;
        
        if (counter % 100 == 0) {
            seconds++;
            if (seconds > 59) {
                seconds = 0;
            }
        }
        if (counter % 6000 == 0) {
            minutes++;
        }
        
        output += minutes + ":";
        seconds < 10 ? output += "0" + seconds + ":" : output += seconds + ":";
        centisecs < 10 ? output += "0" + centisecs : output += centisecs;
        document.getElementById("timer").innerHTML = output;
    }
    
    document.getElementById("stop").touchstart = StopTimer;
//    document.getElementById("stop").onkeydown = StopTimer;
    
    function StopTimer () {
        clearInterval(stop);
    }
}
