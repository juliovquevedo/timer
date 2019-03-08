window.addEventListener('resize', setChartDimensions(charData));
document.getElementById("chart").addEventListener('load', setChartDimensions(charData));

function setChartDimensions (charData) {
    var chartHeight = window.getComputedStyle(document.getElementById("chartholder")).height;
    var chartWidth = window.getComputedStyle(document.getElementById("chartholder")).width;
    chartHeight = chartHeight.slice(0, -2);
    chartWidth = chartWidth.slice(0, -2);
    document.getElementsByTagName("canvas")[0].setAttribute("height", chartHeight);
    document.getElementsByTagName("canvas")[0].setAttribute("width", chartWidth);
    
    drawChart(chartWidth, chartHeight, charData); 
}

function drawChart (chartWidth, chartHeight, charData) {
    var startXaxis = chartWidth * .06;
    var zeroXaxis = chartWidth * .07;
    var endXaxis = chartWidth * .98;
    var startYaxis = chartHeight * .95;
    var zeroYaxis = chartHeight * .94;
    var endYaxis = chartHeight * .13;
    
    var c = document.getElementById("chart");
    var ctx = c.getContext("2d");
//    charData2 = [{x:0, y:19},
//                 {x:1, y:23},
//                 {x:3, y:31},
//                 {x:4, y:44},
//                 {x:5, y:50},
//                 {x:6, y:25},
//                 {x:7, y:35},
//                 {x:8, y:25},
//                 {x:9, y:38},
//                 {x:10, y:27},
//                ];
    
    
    
    xRange = charData.length;
    yRange = getLargestValue(charData, xRange);
    yPartitions = calculateYpartitions(yRange);
    drawXaxis();
    drawYaxis();
    drawBars(xRange, yRange, yPartitions, charData);
    
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
    
    function getLargestValue (charData, xRange) {
        largest = 0;
        for (m = 0; m < xRange; m++) {
            if (charData[m].y > largest) {
                largest = charData[m].y;
            }
        }
        return largest;
    }
    
    function calculateYpartitions (yRange) {
        if(yRange == 1) {
            yPartitions = 1.2;
            calculateYlines(yRange, null, yPartitions);
            return yPartitions;
        }
        firstDigit = parseInt(yRange.toString().slice(0,1));
        
        if(yRange > 9 && firstDigit == 1 && yRange != 1) {
            secondDigit = parseInt(yRange.toString().slice(1,2));
            switch(secondDigit) {
                case 0:
                case 1:
                    yPartitions = Math.pow(10, parseInt(Math.log10(yRange))) * 6 / 5;
                    break;
                case 2:
                case 3:
                    yPartitions = Math.pow(10, parseInt(Math.log10(yRange)) - 1) * 14;
                    break;
                case 4:
                case 5:
                    yPartitions = Math.pow(10, parseInt(Math.log10(yRange)) - 1) * 16;
                    break;
                case 6:
                case 7:
                    yPartitions = Math.pow(10, parseInt(Math.log10(yRange)) - 1) * 18;
                    break;
                case 8:
                case 9:
                    yPartitions = Math.pow(10, parseInt(Math.log10(yRange))) * 2;
            }
            calculateYlines(firstDigit, secondDigit, yPartitions);
        }
        else {
            yPartitions = (firstDigit * Math.pow(10, parseInt(Math.log10(yRange)))) * ((firstDigit + 1) / firstDigit);
            calculateYlines(firstDigit, null, yPartitions);
        }
        return yPartitions;
    }
    
    function calculateYlines (firstDigit, secondDigit, yPartitions) {
        if(firstDigit != 1) {
            (firstDigit * 2) < 10 ? ylines = firstDigit * 2 + 2 : ylines = firstDigit + 1;
        }
        else if (secondDigit == null) {
            ylines = 6;
        }
        else {
            ylines = parseInt(secondDigit / 2 + 6);
        }
        drawYlines(ylines, yPartitions);
    }
    
    function drawYlines (ylines, yPartitions) {
        return 0;
    }
    
    function drawBars (xRange, yRange, yPartitions, charData) {
        xWidth = endXaxis - zeroXaxis;
        yHeight = zeroYaxis - endYaxis;
        if(xRange < 6) {
            for (n = 1; n <= xRange; n++) {
                ctx.beginPath();
                if(n % 3 == 0) {
                    ctx.strokeStyle = "#010A1D";
                    ctx.fillStyle = "#010A1D";
                }
                else if(n % 3 == 1) {
                    ctx.strokeStyle = "#0D1F47";
                    ctx.fillStyle = "#0D1F47";
                }
                else if(n % 3 == 2) {
                    ctx.strokeStyle = "#2e4272";
                    ctx.fillStyle = "#2e4272";
                }
                ctx.rect(((xWidth * 6 - xWidth * xRange) / (6 * xRange + 6)) * n + (xWidth / 6 * (n - 1)) + zeroXaxis,
                         yHeight / yPartitions * (yPartitions - charData[n - 1].y) + endYaxis,
                         xWidth / 6,
                         zeroYaxis - (yHeight / yPartitions * (yPartitions - charData[n - 1].y) + endYaxis) - 1);
                ctx.fill();
                ctx.stroke();
            }
        }
        else {
            for (n = 1; n <= xRange; n++) {
                ctx.beginPath();
                if(n % 3 == 0) {
                    ctx.strokeStyle = "#010A1D";
                    ctx.fillStyle = "#010A1D";
                }
                else if(n % 3 == 1) {
                    ctx.strokeStyle = "#0D1F47";
                    ctx.fillStyle = "#0D1F47";
                }
                else if(n % 3 == 2) {
                    ctx.strokeStyle = "#2e4272";
                    ctx.fillStyle = "#2e4272";
                }
                ctx.rect((xWidth * (2 * n + (xRange * n) - (xRange) - 1)) / (xRange + 1) / (xRange + 1) + zeroXaxis,
                         yHeight / yPartitions * (yPartitions - charData[n - 1].y) + endYaxis,
                         xWidth / (xRange + 1),
                         zeroYaxis - (yHeight / yPartitions * (yPartitions - charData[n - 1].y) + endYaxis) - 1);
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}