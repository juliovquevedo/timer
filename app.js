document.body.onkeyup = StartTimer;
var i = 1;
  
function StartTimer () {
    
    var counter = 0;
    var minutes = 0;
    var seconds = 0;
    var centisecs = 0;
    var output = "";
    
    if (i % 2 == 1) {
        var stop = setInterval(Timer, 10);

        function Timer () {
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
    
    }
    document.body.onkeypress = StopTimer;
        
    function StopTimer () {
        if (i % 2 == 0) {
            clearInterval(stop);
            console.log(counter);
            var div = document.createElement("div");
            var t = document.createTextNode(output);
            div.appendChild(t);
            document.getElementById("results").appendChild(div);
        }
    }
    
    i++;
}
