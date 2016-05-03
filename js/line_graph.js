/**
 * Created by sumudu on 5/2/16.
 */
'use strict';

(function(){

    var draw = function(data){

        var margin = 50;
        var width = 1000;
        var height = 500;

        var x_extent = d3.extent(data.times_square.concat(data.grand_central),function(d){
            return d.time;
        });


        var x_scale = d3.time.scale()
            .range([margin, (width - margin)])
            .domain(x_extent)



        var y_extent = d3.extent(data.times_square.concat(data.grand_central),function(d){
            return d.count
        });

        var y_scale = d3.scale.linear()
            .range([(height - margin),margin])
            .domain(y_extent);


        //Render TimeSqure dots
        d3.select('.d3-svg-line-graph')
            .append('svg')
                .attr('width',width)
                .attr('height',height)
                .attr('class','line-grp-svg')
            .selectAll('circle.timeSquare')
            .data(data.times_square)
            .enter()
            .append('circle')
            .attr('class','timeSquare')
            .attr('cx',function(d){
                return x_scale(d.time);
            })
            .attr('cy',function(d){
                return y_scale(d.count);
            })
            .attr('r',5);

        //Render Grand Central dots
        d3.select('svg.line-grp-svg')
            .selectAll('circle.grandCentral')
            .data(data.grand_central)
            .enter()
            .append('circle')
            .attr('class','grandCentral')
            .attr('cx',function(d){
                return x_scale(d.time);
            })
            .attr('cy',function(d){
                return y_scale(d.count);
            })
            .attr('r',5);

        //Draw x - axis
        var x_axis = d3.svg.axis().scale(x_scale).ticks(d3.time.day, 1).tickFormat(d3.time.format("%a/%d"));

        d3.select('svg.line-grp-svg')
            .append('g')
            .attr('class','x-axis')
            .attr('transform','translate(0,'+ (height-margin)+')')
            .call(x_axis)

        //draw y_axis
        var y_axis = d3.svg.axis().scale(y_scale).orient('left');
        d3.select('svg.line-grp-svg')
            .append('g')
            .attr('class','y-axis')
            .attr('transform','translate('+margin+',0)')
            .call(y_axis);

        //Draw Path
        var drawPath = d3.svg.line()
            .x(function(d){return x_scale(d.time)})
            .y(function(d){return y_scale(d.count)});

        d3.select('svg.line-grp-svg')
            .append('path')
            .attr('d',drawPath(data.times_square))
            .attr('class','time-line')

        d3.select('svg.line-grp-svg')
            .append('path')
            .attr('d',drawPath(data.grand_central))
            .attr('class','grand-central')

    }






    d3.json('data/turnstile_traffic.json',draw);
})();