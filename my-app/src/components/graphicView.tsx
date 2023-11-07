import { useEffect, useState } from 'react';
import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const initionalColors = [
  'rgb(173, 255, 186)',
  'rgb(192, 250, 185)',
  'rgb(188, 235, 184)',
  'rgb(177, 250, 166)',
  'rgb(185, 251, 201)',
  'rgb(188, 255, 172)',
  'rgb(168, 245, 185)',
  'rgb(171, 255, 156)',
  'rgb(180, 247, 187)',
  'rgb(163, 255, 186)'
]


const GraphicView = ({ dataApi, hoveredSector }: { dataApi: Isector[], hoveredSector: number | null }) => {
  const [backgroundColorArray, setBackgroundColorArray] = useState<string[]>([]);


  useEffect(() => {
    setBackgroundColorArray(initionalColors);
  }, [dataApi]);

  useEffect(() => {
    console.log(hoveredSector);
    const newColors = [...initionalColors];

    if (hoveredSector !== null) {
      const sectorIndex = dataApi.findIndex(sector => sector.sector_id === hoveredSector);
      
      console.log('sectorIndex', sectorIndex);
      
      if (dataApi[sectorIndex].sector_id === hoveredSector) {
        console.log('dataApi[sectorIndex].sector_id', dataApi[sectorIndex].sector_id)
        newColors[sectorIndex] = 'hsl(0, 70%, 80%)';
    }}
    setBackgroundColorArray(newColors)
  }, [hoveredSector, dataApi])

  const data = {
    labels: [
      ...dataApi.map((sector: Isector) => sector.name)
    ],
    datasets: [{
      label: 'Substantive Research',
      data: dataApi.map((sector: Isector) => sector.interactions),
      backgroundColor: backgroundColorArray,
      hoverOffset: 1
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          font: {
            size: 10,
          }
        }
      }
    }
  }

  return (
    <div className='graphicContainer'>
      <Chart data={data} type={'doughnut'} options={options} />
    </div>
  );
}

export default GraphicView;
