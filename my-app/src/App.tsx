import { useEffect, useRef, useState } from 'react';
import './App.css';
import { fetchDataApi } from './ApiServices';
import { Isector } from './interfaces';
import GraphicView from './components/graphicView';
import TableView from './components/tableView';

const App = () => {
  const [dataApi, setDataApi] = useState<Isector[]>([]);
  let numberOfInteractions = useRef<number>(0);
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  useEffect(() => {
    fetchDataApi()
      .then((response: Isector[]) => {
        numberOfInteractions.current = response.length;
        const updatedData = response.reduce((data, interplay) => {
          const existingSector = data.find(
            (sector) => sector.name === interplay.name,
          );
          if (existingSector) {
            existingSector.interactions += 1;
          } else {
            data.push({
              ...interplay,
              sector_id: Number(interplay.sector_id),
              interactions: 1,
            });
          }
          return data;
        }, [] as Isector[]);
        setDataApi(updatedData);
      })
      .catch(() => {
        throw new Error();
      });
  }, []);

  return (
    <>
      <div className="GridContainer">
        <div className="tableContainer">
          <TableView
            dataApi={dataApi}
            numberOfInteractions={numberOfInteractions}
            setHoveredSector={setHoveredSector}
          />
        </div>
        <div className="graphicContainer">
          <GraphicView dataApi={dataApi} hoveredSector={hoveredSector} />
        </div>
      </div>
    </>
  );
};

export default App;
