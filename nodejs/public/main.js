// run function when page loads
$(function () {
    var smoothie = new SmoothieChart({			millisPerPixel:28,
        grid:{
				fillStyle:'#ffffff',
				strokeStyle:'#cacaca',
				verticalSection: 10
			},
        labels:{
				fillStyle:'#a966ff'
			},
        timestampFormatter:SmoothieChart.timeFormatter

    });

    smoothie.streamTo(document.getElementById("StockChart"), 1000);

    var line1 = new TimeSeries()

    smoothie.addTimeSeries(line1,{
		strokeStyle:'rgb(0, 255, 0)',
		fillStyle:'rgba(0, 255, 0, 0.4)',
		lineWidth:3
	})


    var socket = io()

    //d3.js also ok to present,here use smothie

    // when server emits 'data', update UI
    socket.on('data', function (data) {
        console.log(data);
        parsed = JSON.parse(data);
        line1.append(Math.trunc(parsed['timestamp'] * 1000), parsed['average'])
    });
});