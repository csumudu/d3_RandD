/**
 * Created by sumudu on 5/1/16.
 */
'use strict';
(function(){
    var draw = function(data){
        var margin  =60;
        var width = 1000;
        var height = 600;

        var x_extent  = d3.extent(data,function(d){
            return d.collision_with_injury;
        });

        var x_scale = d3.scale.linear()
            .range([margin,width-margin])
            .domain(x_extent);

        var x_axis = d3.svg.axis().scale(x_scale);

        var y_extent  = d3.extent(data,function(d){
            return d.dist_between_fail;
        });

        var y_scale = d3.scale.linear()
            .range([height-margin,margin])
            .domain(y_extent);

        var y_axis = d3.svg.axis().scale(y_scale).orient('left');



        d3.select('.d3-svg-graph')
            .append('svg')
                .attr('width' , width)
                .attr('height',height)

            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
                .attr('cx',function(d){return x_scale(d.collision_with_injury)})
                .attr('cy',function(d){return y_scale(d.dist_between_fail)})
                .attr('r',5);

        //draw x axis
        d3.select('svg')
            .append('g')
                .attr('class','x-axis')
                .attr("transform", "translate(0," + (height-margin) + ")")
            .call(x_axis);

        //Draw y axis
        d3.select('svg')
            .append('g')
                .attr('class','y-axis')
                .attr('transform','translate('+margin+',0)')
            .call(y_axis);

        d3.select(".x-axis")
            .append("text")
            .text("collisions with injury (per million miles)")
            .attr('x', (width - (2 * margin))/2 + 'px')
            .attr('y', 30)

    };

    d3.json('data/bus_perf.json',draw);
    draw();
})();