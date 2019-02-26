document.body.onkeyup = StartTimer;

var counter = 0;
var output = "";
var results = [];
var resultsSize;
var best = Infinity;
var worst = 0;
var total = 0;
var average = 0;
var used = false;
var i = 1;
var charData = [];
var ys = [];
ys.length = 180;
ys.fill(0, 0, 179);
  
function StartTimer (e) {
    if (e.keyCode != 32){
        return 0;
    }
    
//    counter = 0;
//    var output = "";
    used = false;
    
    if (i % 2 == 1) {
        var stop = setInterval(Timer, 10);
        
        function Timer () {
            counter++;
            output = counterToOutput(counter);
            document.getElementById("timer").innerHTML = output;
        }
    
    }
    
    document.body.onkeypress = StopTimer;
    
    function StopTimer (e) {

        if (e.keyCode != 32){
            return 0;
        }

        if (i % 2 == 0) {
            
            document.getElementById("deleteLastEntry").style.visibility = "visible";
            document.getElementById("deleteLastEntry").innerHTML = "delete last";
            
            clearInterval(stop);
            updateResults(output);
            resultsSize = sortResults(counter, output);
            updateBest(counter, output);
            updateWorst(counter, output);
            updateAverage(counter);
            updateTop10(resultsSize);
            updateMedian(resultsSize);
            updateStandardDeviation();
            updateChartData(counter);
            
            document.getElementById("deleteLastEntry").onclick = deleteLastEntry;

            function deleteLastEntry () {
                used = false;
                removeLastResult();
                removeLastBest();
                removeLastWorst();
                removeLastAverage();
                removeLastTop10(used);
                updateMedian(resultsSize);
                updateStandardDeviation();
                used = true;
                updateChartData(counter);
            }

            
            
            
            
            
           
            
            document.onkeypress = function () {
                var chart = new CanvasJS.Chart("chartContainer", {
                    title:{
                        text: "Times in seconds", 
                        fontWeight: "bolder",
                        fontColor: "#008B8B",
                        fontFamily: "tahoma",        
                        fontSize: 25,
                        padding: 10        
                    },
                    data:[{        
                        type: "column",
                        dataPoints: charData
                         }]
                    });

                chart.render();
            }   
            
            
        }
        counter = 0;
    }
    
    i++;
}

function updateResults (output) {
    
    document.getElementById("titleResults").innerHTML = "Results (" + (i / 2) + ")";
            
    div = document.createElement("div");
    t = document.createTextNode(output);
    div.appendChild(t);
    parent = document.getElementById("results");
    parent.insertBefore(div, parent.firstChild);
}

function updateBest (counter, output) {
    if (counter < best) {
        best = counter;
        document.getElementById("best").innerHTML = "Best: " + output;
//        document.getElementById("best").innerHTML ="Best: " + results[0].time;
    }
}

function updateWorst (counter, output) {
    if (counter > worst) {
        worst = counter;
        document.getElementById("worst").innerHTML = "Worst: " + output;
    }
}

function updateAverage (counter) {
    total += counter;
    average = total / (i / 2);

    avgOutput = "";
    avgOutput = counterToOutput(average);  
    document.getElementById("average").innerHTML = "Average: " + avgOutput;
}

function sortResults (counter, output) {
    results.push({id: counter, time: output});
    function sortByKey (results, id) {
        return results.sort(function(a, b) {
            var x = a[id];
            var y = b[id];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    results = sortByKey(results, "id");
    return results.length;
}

function updateTop10 (resultsSize) {
    resultsSize > 10 ? size = 10 : size = resultsSize;
    pa = document.getElementById("top10");
    pa.innerHTML = "";

    for (j = 0; j < size; j++) {
        div = document.createElement("div");
        t = document.createTextNode(results[j].time);
        div.appendChild(t);
        pa.appendChild(div);
    }
}

function updateMedian (resultsSize) {
    if(resultsSize == 0) {
        document.getElementById("median").innerHTML = "";
        return 0;
    }
    size = resultsSize;
    if (size % 2 == 1) {
        median = results[parseInt(size / 2)].time;
    }
    else {
        median = (results[size / 2].id + results[size / 2 - 1].id) / 2;
        median = counterToOutput(median);
    }
    document.getElementById("median").innerHTML = "Median: " + median;
}

function updateStandardDeviation () {
    var standev = getStandardDeviation(results, average);
    document.getElementById("standev").innerHTML = "Standard Deviation: " + (standev / 100).toFixed(2);
}

function updateChartData (counter) {
    if(used) {
        ys[0]--;
        q = parseInt(outputToCounter(output) / 100);
        ys[q]--;
    }
    dataSec = (counter - (counter % 100)) / 100;
    ys[dataSec]++;
    tcharData = [];

    for (m = 0, l = parseInt(best / 100); l <= parseInt(worst / 100); l++, m++) {
        tcharData[l] = {x: l, y:ys[l]};
        charData[m] = tcharData[l];
    }
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

function getStandardDeviation (data, mean) {
    var sumOfSquaredDiff = 0;
    var data = data;
    var dataSize = data.length;
    
    for (k = 0; k < dataSize; k++) {
        sumOfSquaredDiff += Math.pow(data[k].id - mean, 2);
    }
    
    if (dataSize == 1) {
        return 0;
    }
    else {
        return Math.sqrt(sumOfSquaredDiff / (dataSize - 1));
    }
}

function removeLastResult () {
    i -= 3;
    document.getElementById("titleResults").innerHTML = "Results (" + (i / 2) + ")";
    
    pa = document.getElementById("results");
    pa.removeChild(pa.firstChild);
    document.getElementById("deleteLastEntry").style.visibility = "hidden";
    i++;
}

function removeLastBest () {
    if(output === results[0].time) {
        if(resultsSize == 1){
            results.pop();
            document.getElementById("best").innerHTML = "";
            best = Infinity;
            resultsSize--;
        }
        else {
            results.shift();
            document.getElementById("best").innerHTML = "Best: " + results[0].time;
            best = results[0].id;
            resultsSize--;
        }
        used = true;
    }
}

function removeLastWorst () {
    if(resultsSize == 0) {
        document.getElementById("worst").innerHTML = "";
        worst = 0;
        used = true;
    } 
    else if(results[0].time !== output && output === results[resultsSize - 1].time) {
        results.pop();
        document.getElementById("worst").innerHTML = "Worst: " + results[resultsSize - 2].time;
        worst = results[resultsSize -2].id;
        resultsSize--;
        used = true;
    }
}

function removeLastAverage () {
    if(resultsSize == 0) {
        document.getElementById("average").innerHTML = "";
        total = 0;
    }
    else {
        ctr = outputToCounter(output);
        average = (total - ctr) / ((i-1) / 2);
        total -= ctr;
        avgOutput = counterToOutput(average);  
        document.getElementById("average").innerHTML = "Average: " + avgOutput;
    }
}

function removeLastTop10 (used) {
    if(used) {
        updateTop10(resultsSize);
    }
    else {
        for(z = 0; z < resultsSize; z++) {
            if(output === results[z].time) {
                results.splice(z, 1);
                resultsSize--;
                updateTop10(resultsSize);
                return 0;
            }
        }
    }
    
}

function outputToCounter (output) {
    ctr = output.split(":");
    ctr = parseInt(ctr[0]) * 6000 + parseInt(ctr[1]) * 100 + parseInt(ctr[2]);
    return ctr;
}