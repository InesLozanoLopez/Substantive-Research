import { useEffect, useState } from 'react';
import '../App.css';
import { fetchDataApi } from '../ApiServices';
import { Isector, Ioptions } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
// import './chartjs-extension/DoughnutRoundedController';

function GraphicView() {
  const [dataApi, setDataApi] = useState<Isector[]>([]);


  useEffect(() => {
    fetchDataApi()
      .then((response: Isector[]) => {
        const updatedData = response.reduce((data, interplay) => {
          const existingSector = data.find((sector: Isector) => sector.name === interplay.name);
          if (existingSector) {
            existingSector.interactions += 1;
          } else {
            data.push({ ...interplay, sector_id: Number(interplay.sector_id), interactions: 1 });
          } return data;
        }, [] as Isector[]);
        setDataApi(updatedData)
      })
      .catch(() => {
        throw new Error();
      })
  }, [])


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
            position: 'bottom',
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
