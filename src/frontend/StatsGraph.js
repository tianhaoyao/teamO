import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

function StatsGraph(props) {

    const cs = props.csbonus;
    const kda = props.kdabonus;
    const kp = props.kpbonus;
    const gold = props.goldbonus;
    const dmg = props.dmgbonus;
    
    let options = {
        chart: {
            height: 1000,
            width: 1000,
            type: 'radar',
            //background: '#fff',
            toolbar:{
                show: false
            }
        },
        labels: {
            show: false
          },
        xaxis: {
            categories: ['CS', 'KDA', 'KP', 'GOLD', 'DMG'],
        },
        yaxis: {
            floating: true,
            categories: [0, 100],
            min: -10,
            max: 100,
            show: false,
            tickAmount: 5
            
        },
        grid: {
            padding: {
              top: -10,
              left: -1,
              right: -10,
              bottom: -30
            }
        }

        
    };

    let series = [{
        name: props.name,
        data: [adjustData(cs), adjustData(kda), adjustData(kp), adjustData(gold), adjustData(dmg)],
    }];

    function adjustData(score){
        let c = 1/20 * Math.pow((score + 70), 1.45);
        if(c >= 100) {
            c = 100;
        }
        else if(c <= 0 || isNaN(c)) {
            c = 0;
        }
        return Math.round(c);
    }

    return (
        <div id="chart">
            <Chart options={options} series={series} type="radar" height={110} />
        </div>
    );
      
      
}

export default StatsGraph;