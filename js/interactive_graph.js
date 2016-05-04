/**
 * Created by sumudu on 5/3/16.
 */
(function () {
    'use strict';

    var container_dimension = {width: 1000, height: 500},
        margins = {left: 50, right: 50, top: 50, bottom: 50},
        chart_dimension = {width : container_dimension.width - margins.left - margins.right, height : container_dimension.height - margins.top - margins.bottom};

    var chart;
    var allData;
    var line_path_data = []
    var x_scale,y_scale;

    var drawPath = d3.svg.line()
        .x(function(d){return x_scale(d.time)})
        .y(function(d){return y_scale(d.late_percent)});





    var onClick = function(obj){
        d3.select('.time-line.interactive').remove();

        line_path_data.length = 0;
        line_path_data = _.where(allData,{line_id : obj.line_id});
        chart.append('path')
            .attr('d',drawPath(line_path_data))
            .attr('class','time-line interactive')

        d3.select('.circle-dot').remove();
        chart.selectAll('circle')
            .data(line_path_data)
            .enter()
            .append('circle')
            .attr('class','circle-dot')
            .attr('cx',function(d){return x_scale(d.time)})
            .attr('cy',function(d){return y_scale(d.late_percent)})
            .attr('r','3')
    }


    var drawGraph = function (data) {
        allData = data;

        var x_range = d3.extent(data,function(d){return d.time});
            x_scale = d3.time.scale()
                .range([0,chart_dimension.width])
                .domain(x_range);
          var  x_axis = d3.svg.axis().scale(x_scale);

        var y_range = d3.extent(data,function(d){return d.late_percent});
            y_scale = d3.scale.linear()
                .range([chart_dimension.height,0])
                .domain(y_range);
            var y_axis = d3.svg.axis().scale(y_scale).orient('left');




        chart = d3.select('#chart-interactive')
            .attr('width', container_dimension.width)
            .attr('height', container_dimension.height)
            .append('g')
            .attr('class','chart_container')
            .attr('transform','translate('+margins.left+','+margins.right+')');

        chart.append('g')
            .attr('class','x-axis')
            .attr('transform','translate(0,'+chart_dimension.height+')')
            .call(x_axis);

        chart.append('g')
            .attr('class','y-axis')
            .call(y_axis);

    };

    var drawSelection = function (data) {
        var keySection = d3.select("#keys")
            .selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'key_line')
            .attr('id', function (d) {
                return d.line_id
            });


        keySection.append('div')
            .attr('class', 'squre')
            .attr('id',function(d){return d.line_id})
            .on('click',onClick);
        keySection.append('div')
            .attr('class', 'line-label')
            .text(function (d) {
                return d.line_name
            });

        keySection.append('div')
            .attr('class', 'clear-me')

    };

    d3.json('data/subway_wait_mean.json', drawSelection);
    d3.json('data/subway_wait.json', drawGraph);
}())