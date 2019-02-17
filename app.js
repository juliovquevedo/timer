document.body.onkeyup = StartTimer;
var results = [];
var best = Infinity;
var worst = 0;
var total = 0;
var average = 0;
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
            
            var div = document.createElement("div");
            var t = document.createTextNode(output);
            div.appendChild(t);
            var parent = document.getElementById("results");
            parent.insertBefore(div, parent.firstChild);
            
            if (counter < best) {
                best = counter;
                document.getElementById("best").innerHTML = "Best: " + output;
            }
            if (counter > worst) {
                worst = counter;
                document.getElementById("worst").innerHTML = "Worst: " + output;
            }
            
            total += counter;
            average = total / (i / 2);
//            console.log(average);
            var avgOutput = "";
            var avgMin = parseInt(average / 6000);
            average -= (avgMin * 6000);
            var avgSec = parseInt(average / 100);
            average -= (avgSec * 100);
            average = average.toFixed(0);
            
            avgOutput += avgMin + ":";
            avgSec < 10 ? avgOutput += "0" + avgSec + ":" : avgOutput += avgSec + ":";
            average < 10 ? avgOutput += "0" + average : avgOutput += average;
            
            document.getElementById("average").innerHTML = "Average: " + avgOutput;
//            console.log(average);
        }
    }
    
    i++;
}