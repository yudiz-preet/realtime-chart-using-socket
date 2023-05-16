import './App.css';
import { io } from "socket.io-client";
import ReactApexChart from "react-apexcharts";
import React, { useEffect, useState } from 'react';

const socket = io('http://localhost:3000/');

function App() {
  const [seriesData, setSeriesData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
  
    socket.on('testMessage', function(data, labelsValue){
      console.log('data1: ', data);
      console.log('labelsValue: ', labelsValue)
      setSeriesData(data || [])
      setLabels(labelsValue || [])
    })

      return () => {
        socket.off("connect", () => {
          console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });
        
        socket.off("disconnect", () => {
          console.log(socket.id); // undefined
        });
      
        socket.off('testMessage', function(data, labelsValue){
          console.log('data1: ', data);
          console.log('labelsValue: ', labelsValue)
          setSeriesData(data || [])
          setLabels(labelsValue || [])
        })
          
      }
  }, [])

const chartData = {

  series: [
    {
      name: "Chart-1",
      type: "line",
      data: [0, 15, 25, 20, 32, 27]
    },
    {
      name: "Chart-2",
      type: "line",
      data: [0, 32, 20, 40, 20, 30]
    },
    {
      name: "Chart-3",
      type: "line",
      data: [0, 38, 50, 10, 28, 43]
    }
  ],
  chart: {
    height: 100,
    type: 'line',     
  },
  colors: ['#00008b', '#00FFFF', '#FFA500'],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      colors: undefined
  },
    background:{
      enabled: true,
      foreColor: '#fff',
      padding: 4,        
      borderRadius: 15,
    }
  },
  stroke: {
    curve: 'smooth'
  },
  animations: {
    enabled: true,
    easing: 'easeinout',
    speed: 0.5,
    animateGradually: {
        enabled: true,
        delay: 10000
    },
    dynamicAnimation: {
        enabled: true,
        speed: 10000
    }
}
}

// const chart2Data = {
//   series: [{
//     // data: data.slice()
//     data: [56,98,78,56,99,1,10,100,54,78,98,51,0,45,56,98,78,56,99,1,10,100,54,78,98,51,0,45,56,98,78,56,99,1,10,100,54,78,98,51,0,45,56,98,78,56,99,1,10,100,54,78,98,51,0,45,56,98,78,56,99,1,10,100,54,78,98,51,0,45].slice()
//   }],
//   options: {
//     chart: {
//       id: 'realtime',
//       height: 350,
//       type: 'line',
//       animations: {
//         enabled: true,
//         easing: 'linear',
//         dynamicAnimation: {
//           speed: 1000
//         }
//       },
//       toolbar: {
//         show: false
//       },
//       zoom: {
//         enabled: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth'
//     },
//     title: {
//       text: 'Dynamic Updating Chart',
//       align: 'left'
//     },
//     markers: {
//       size: 0
//     },
//     // xaxis: {
//     //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//     //   tickAmount: 5
//     // },
//     yaxis: {
//       max: 100
//     },
//     legend: {
//       show: false
//     },
//   },
// };


  return (
    <>
    <div style={{height:'500px', width:'500px'}}>
      <ReactApexChart options={{...chartData, series: seriesData, labels}} series={seriesData} />
    </div>
    {/* <div>
    <ReactApexChart options={chart2Data.options} series={chart2Data.series} type="line" height={350} />
    </div> */}
    </>
  );
}

export default App;
