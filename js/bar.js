/**
 * Created by sumudu on 5/1/16.
 */
'use strict';

(function(){
    var draw = function(d){
        d3.select('.d3-barchart')
            .append('div')
            .attr('class','chart')
            .selectAll('.bar.cash')
            .data(d.cash.concat(d.electronic))
            .enter()
            .append('div')
                .classed({'bar':true,'cash':true})
                .text(function(d){return d.name})
                .style({
                    'background-color':function(d,index){ return "#"+((1<<24)*Math.random()|0).toString(16) },
                    'width':function(d){ return d.count/50 + 'px'},
                    'margin':'5px 0px',
                    'border':'solid 1px #cccccc'});


    }





    d3.json('data/plaza_traffic.json',draw);
})();