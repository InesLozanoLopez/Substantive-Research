import { useEffect, useMemo, useState } from 'react';
import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { getRandomColors } from '../functions';


const GraphicView = ({ dataApi, hoveredSector }: { dataApi: Isector[], hoveredSector: number | null }) => {
  const [backgroundColorArray, setBackgroundColorArray] = useState<string[]>([]);
  const initionalColors = useMemo(() => getRandomColors(dataApi.length), [dataApi]);


  useEffect(() => {
    const newColors = [...initionalColors];

    if (hoveredSector !== null) {
      const sectorIndex = dataApi.findIndex(sector => sector.sector_id === hoveredSector);

      if (dataApi[sectorIndex].sector_id === hoveredSector) {
        newColors[sectorIndex] = 'hsl(30, 50%, 50%)';
      }
    }
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
            usePointStyle: true,
            font: {
              responsive: true,
              lineHeight: 12,
            },
            maintainAspectRatio: true,
        }
      }
    }
  }

  return(
    <div className = 'graphic' >
        <Chart data={data} type={'doughnut'} options={options} className='chart'/>
    </div >
  );
}

export default GraphicView;
