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
    var startXaxis = chartWidth * .06;
    var zeroXaxis = chartWidth * .07;
    var endXaxis = chartWidth * .98;
    var startYaxis = chartHeight * .95;
    var zeroYaxis = chartHeight * .94;
    var endYaxis = chartHeight * .13;
    
    var c = document.getElementById("chart");
    var ctx = c.getContext("2d");
    charData2 = [{x:0, y:19},
                 {x:1, y:23},
                 {x:3, y:31},
                 {x:4, y:44},
                 {x:5, y:50},
                 {x:6, y:25},
                 {x:7, y:35},
                 {x:8, y:25},
                 {x:9, y:38},
                 {x:10, y:27},
                ];
    
    
    
    xRange = charData2.length;
    yRange = getLargestValue(charData2, xRange);
    yPartitions = calculateYpartitions(yRange);
    drawXaxis();
    drawYaxis();
    drawBars(xRange, yRange, yPartitions, charData2);
    
    
    
    
    function drawXaxis () {
        ctx.moveTo(startXaxis, zeroYaxis);
        ctx.lineTo(endXaxis, zeroYaxis);
        ctx.stroke();
    }
    
    function drawYaxis () {
        ctx.moveTo(zeroXaxis, startYaxis);
        ctx.lineTo(zeroXaxis, endYaxis);
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
    
    function calculateYpartitions (yRange) {
        if(yRange == 1) {
            return 1.2;
        }
        firstDigit = parseInt(yRange.toString().slice(0,1));
        
        if(yRange > 9 && firstDigit == 1) {
            secondDigit = parseInt(yRange.toString().slice(1,2));
            switch(secondDigit) {
                case 0:
                case 1:
                    return Math.pow(10, parseInt(Math.log10(yRange))) * 6 / 5;
                case 2:
                case 3:
                    return Math.pow(10, parseInt(Math.log10(yRange)) - 1) * 14;
                case 4:
                case 5:
                    return Math.pow(10, parseInt(Math.log10(yRange)) - 1) * 16;
                case 6:
                case 7:
                    return Math.pow(10, parseInt(Math.log10(yRange)) - 1) * 18;
                case 8:
                case 9:
                    return Math.pow(10, parseInt(Math.log10(yRange))) * 2;
            }
        }
        
        return (firstDigit * Math.pow(10, parseInt(Math.log10(yRange)))) * ((firstDigit + 1) / firstDigit);
        
    }
    
    function drawBars (xRange, yRange, yPartitions, charData2) {
        xWidth = endXaxis - zeroXaxis;
        yHeight = zeroYaxis - endYaxis;
        if(xRange < 6) {
            for (n = 1; n <= xRange; n++) {
                ctx.beginPath();
                ctx.strokeStyle = "blue";
                ctx.rect(((xWidth * 6 - xWidth * xRange) / (6 * xRange + 6)) * n + (xWidth / 6 * (n - 1)) + zeroXaxis,
                         yHeight / yPartitions * (yPartitions - charData2[n - 1].y) + endYaxis,
                         xWidth / 6,
                         zeroYaxis - (yHeight / yPartitions * (yPartitions - charData2[n - 1].y) + endYaxis) - 1);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.stroke();
            }
        }
        else {
            for (n = 1; n <= xRange; n++) {
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.rect((xWidth * (2 * n + (xRange * n) - (xRange) - 1)) / (xRange + 1) / (xRange + 1) + zeroXaxis,
                     yHeight / yPartitions * (yPartitions - charData2[n - 1].y) + endYaxis,
                     xWidth / (xRange + 1),
                     zeroYaxis - (yHeight / yPartitions * (yPartitions - charData2[n - 1].y) + endYaxis) - 1);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.stroke();
            }
        }
    }
}