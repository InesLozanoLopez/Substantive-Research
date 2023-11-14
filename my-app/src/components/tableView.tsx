import { MutableRefObject, useEffect, useState } from 'react';
import '../App.css';
import { Isector } from '../interfaces';
import { BiSolidSortAlt } from 'react-icons/bi';
import { percentage } from '../functions';

const TableView = ({
  dataApi,
  numberOfInteractions,
  setHoveredSector,
}: {
  dataApi: Isector[];
  numberOfInteractions: MutableRefObject<number>;
  setHoveredSector: any;
}) => {
  const [dataView, setDataView] = useState<Isector[]>([]);
  const [sortedBy, setSortedBy] = useState<string>('');

  useEffect(() => {
    setDataView(dataApi);
  }, [dataApi]);

  const handleSortBy = (property: keyof Isector) => {
    const sortedDataApi = [...dataView];
    if (sortedBy === property) {
      sortedDataApi.reverse();
    } else {
      sortedDataApi.sort((a, b) => (a[property] < b[property] ? -1 : 1));
    }
    setSortedBy(property);
    setDataView(sortedDataApi);
  };

  const handleRowHover = (sector_id: number | null) => {
    setHoveredSector(sector_id);
  };

  return (
    <>
      <div className="tableHeader">
        <div onClick={() => handleSortBy('sector_id')} className="tableHeaderCell">
          Sector ID <BiSolidSortAlt />
        </div>
        <div onClick={() => handleSortBy('name')} className="tableHeaderCell">
          Sector <BiSolidSortAlt />
        </div>
        <div onClick={() => handleSortBy('interactions')} className="tableHeaderCell">
          Nº of Interactions <BiSolidSortAlt />
        </div>
      </div>
      <div className="tableBody">
        {dataView.map((item) => (
          <div
            key={item.sector_id}
            className="tableRow"
            onMouseEnter={() => handleRowHover(item.sector_id)}
            onMouseLeave={() => handleRowHover(null)}
          >
            <div className="tableCell">{item.sector_id}</div>
            <div className="tableCell">{item.name}</div>
            <div className="tableCell">
              {percentage(numberOfInteractions.current, item.interactions)} %
            </div>
          </div>
        ))}
      </div>
  </>
  
  );
};

export default TableView;
