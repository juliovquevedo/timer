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
//            centisecs = counter % 100;
//
//            if (counter % 100 == 0) {
//                seconds++;
//                if (seconds > 59) {
//                    seconds = 0;
//                }
//            }
//            if (counter % 6000 == 0) {
//                minutes++;
//            }
//
//            output += minutes + ":";
//            seconds < 10 ? output += "0" + seconds + ":" : output += seconds + ":";
//            centisecs < 10 ? output += "0" + centisecs : output += centisecs;
//            document.getElementById("timer").innerHTML = output;
            output = counterToOutput(counter);
            document.getElementById("timer").innerHTML = output;
        }
    
    }
    document.body.onkeypress = StopTimer;
        
    function StopTimer () {
        if (i % 2 == 0) {
            clearInterval(stop);
            
            
            document.getElementById("titleResults").innerHTML = "Results (" + (i / 2) + ")";
            
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
            
            var avgOutput = "";
            avgOutput = counterToOutput(average);
//            var avgMin = parseInt(average / 6000);
//            average -= (avgMin * 6000);
//            var avgSec = parseInt(average / 100);
//            average -= (avgSec * 100);
//            console.log(average);
//            if (average.toFixed(0) == 100) {
//                average = 0;
//                avgSec++;
//            }
//            else {
//                average = average.toFixed(0);
//            }
//            
//            avgOutput += avgMin + ":";
//            avgSec < 10 ? avgOutput += "0" + avgSec + ":" : avgOutput += avgSec + ":";
//            average < 10 ? avgOutput += "0" + average : avgOutput += average;
//            
            document.getElementById("average").innerHTML = "Average: " + avgOutput;
            
            
            
            
            
            results.push({id: counter, time: output});
            
            function sortByKey(results, id) {
                return results.sort(function(a, b) {
                    var x = a[id]; var y = b[id];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
            
            results = sortByKey(results, 'id');
            results.length > 10 ? resultsSize = 10 : resultsSize = results.length;
            var pa = document.getElementById("top10");
            pa.innerHTML = "";
            
            for (j = 0; j < resultsSize; j++) {
                var d = document.createElement("div");
                var t = document.createTextNode(results[j].time);
                d.appendChild(t);
                pa.appendChild(d);
            }
            
            
            var median;
            var size = results.length;
            if (size % 2 == 1) {
                median = results[parseInt(size / 2)].time;
            }
            else {
                median = (results[size / 2].id + results[size / 2 - 1].id) / 2;
                median = counterToOutput(median);
            }
            document.getElementById("median").innerHTML = "Median: " + median;
            
        }
    }
    
    i++;
}

function counterToOutput (number) {
    var n = parseInt(number);
    var centi = n % 100;
    n -= centi;
    var min = parseInt(n / 6000);
    n -= (min * 6000);
    var sec = n / 100;
    
    var output = "";
    
    output += min + ":";
    sec < 10 ? output += "0" + sec + ":" : output += sec + ":";
    centi < 10 ? output += "0" + centi : output += centi;
    
    return output;
}