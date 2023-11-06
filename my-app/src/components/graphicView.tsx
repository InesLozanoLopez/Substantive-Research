import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const GraphicView = ({dataApi}: {dataApi: Isector[]}) => {

  const data = {
    labels: [
        ...dataApi.map((sector: Isector) => sector.name)
    ],
    datasets: [{
      label: 'Substantive Research',
      data: dataApi.map((sector: Isector) => sector.interactions),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 71)',
        'rgb(124, 252, 0)',
        'rgb(255, 69, 0)',
        'rgb(255, 140, 0)',
        'rgb(0, 128, 128)'
      ],
      hoverOffset: 1
    }]
  };

  const options = {
    plugins: {
        legend: {
            display: true,
            position: 'bottom' as const,
            labels: {
                font:{
                    size: 10,
                }
            }
        }
    }
  }

  return (
    <div className='graphicContainer'>
    <Chart data={data} type={'doughnut'} options={options}/>
    </div>
  );
}

export default GraphicView;
