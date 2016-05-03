/**
 * Created by sumudu on 5/3/16.
 */
(function () {
    'use strict';
    var drawGraph = function(data){

    };

    var drawSelection = function(data){
        var keySection = d3.select("#keys")
            .selectAll('div')
            .data(data)
            .enter()
            .append('div')
                .attr('class','key_line')
                .attr('id',function(d){return d.line_id});


        keySection.append('div')
            .attr('class','squre');
        keySection.append('div')
            .attr('class','line-label')
            .text(function(d){return d.line_name});
        keySection.append('div')
            .attr('class','clear-me')

    };

    d3.json('data/subway_wait_mean.json',drawSelection);
    d3.json('data/subway_wait.json',drawGraph);
}())