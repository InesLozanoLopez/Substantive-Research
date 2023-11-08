import { useEffect, useMemo, useState } from 'react';
import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { getRandomColors } from '../functions';
import DoughnutChart from './doughnutChart';
import BarChart from './barChart';

const GraphicView = ({ dataApi, hoveredSector }: { dataApi: Isector[], hoveredSector: number | null }) => {
  const [backgroundColorArray, setBackgroundColorArray] = useState<string[]>([]);
  const [barView, setBarView] = useState<boolean>(true);

  const initionalColors = useMemo(() => getRandomColors(dataApi.length), [dataApi]);


  useEffect(() => {
    const newColors = [...initionalColors];

    if (hoveredSector !== null) {
      const sectorIndex = dataApi.findIndex(sector => sector.sector_id === hoveredSector);

      if (dataApi[sectorIndex].sector_id === hoveredSector) {
        newColors[sectorIndex] = '#347AB7'; /* 347AB7 => var(--dark-blue)*/
      }
    }
    setBackgroundColorArray(newColors)
  }, [hoveredSector, dataApi]);

  const handleChartView =() => {
    setBarView(!barView);
  }

  return (
    <>
      {!barView &&
      <DoughnutChart dataApi={dataApi} backgroundColorArray={backgroundColorArray} handleChartView={handleChartView} />
}
      {barView &&
      <BarChart dataApi={dataApi} backgroundColorArray={backgroundColorArray} handleChartView={handleChartView} />
}
    </>
  );
}

export default GraphicView;
