window.addEventListener('resize', setChartDimensions);
document.getElementById("chart").addEventListener('load', setChartDimensions());

function setChartDimensions () {
    var chartHeight = window.getComputedStyle(document.getElementById("chartholder")).height;
    var chartWidth = window.getComputedStyle(document.getElementById("chartholder")).width;
    chartHeight = chartHeight.slice(0, -2);
    chartWidth = chartWidth.slice(0, -2);
    document.getElementsByTagName("canvas")[0].setAttribute("height", chartHeight);
    document.getElementsByTagName("canvas")[0].setAttribute("width", chartWidth);
    
    drawChart(chartWidth, chartHeight);
}

function drawChart (chartWidth, chartHeight) {
    var c = document.getElementById("chart");
    var ctx = c.getContext("2d");
    charData2 = [{x:0, y:1},
                 {x:1, y:2},
                 {x:2, y:3},
                 {x:3, y:2},
                 {x:4, y:1},
                 {x:5, y:1},
                ];
    
    
    
    xRange = charData2.length;
    yRange = getLargestValue(charData2, xRange);
    drawXAxis();
    drawYAxis();
    
    
    
    
    function drawXAxis () {
        ctx.moveTo(chartWidth*.06,chartHeight*.94);
        ctx.lineTo(chartWidth*.98,chartHeight*.94);
        ctx.stroke();
    }
    
    function drawYAxis () {
        ctx.moveTo(chartWidth*.07,chartHeight*.95);
        ctx.lineTo(chartWidth*.07,chartHeight*.13);
        ctx.stroke();
    }
    
    function getLargestValue (charData2, xRange) {
        largest = 0;
        for (m = 0; m < xRange; m++) {
            if (charData2[m].y > largest) {
                largest = charData2[m].y;
            }
        }
        return largest;
    }
}