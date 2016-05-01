/**
 * Created by sumudu on 4/28/16.
 */
'use strict';

(function(){

    var draw = function(allData){
        d3.select('.d3-container')
            .append('ul')
            .selectAll('li')
            .style('color','red')
            .data(allData)
            .enter()
            .append('li')
            .text(function(data){
                return data.name  + ' --- ' + data.status;
            }).style('color',function(d){
            if(d.status != 'PLANNED WORK'){
                return 'red';
            }else{
                return 'green';
            }
        }
        );
    }

    d3.json('data/service_status.json',draw);

})();