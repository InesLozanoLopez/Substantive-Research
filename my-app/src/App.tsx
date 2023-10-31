import { useEffect, useRef, useState } from 'react';
import { BiSolidSortAlt } from 'react-icons/bi';
import './App.css';
import { fetchDataApi } from './ApiServices';
import { Isector } from './interfaces';
import { percentage } from './functions';

function App() {
  const [dataApi, setDataApi] = useState<Isector[]>([]);
  const [ sortedBy, setSortedBy] = useState<string>('');
  let numInteractions = useRef<number>(0);

  useEffect(() => {
    fetchDataApi()
      .then((response: Isector[]) => {
        numInteractions.current = response.length;
        const updatedData = response.reduce((data, interplay) => {
          const existingSector = data.find((sector) => sector.name === interplay.name);
          if (existingSector) {
            existingSector.interactions += 1;
          } else {
            data.push({ ...interplay, sector_id: Number(interplay.sector_id), interactions: 1 });
          } return data;
        }, [] as Isector[]);
        setDataApi(updatedData)
      })
      .catch((error) => {
        console.log('error from App.tsx', error)
      })
  }, [])

  const handleSortBy = (property: keyof Isector) =>{
    const sortedDataApi = [...dataApi]
    if(sortedBy === property){
      sortedDataApi.reverse();
    }else{
      sortedDataApi.sort((a,b) => (a[property] < b[property] ? -1: 1))
    }
    setSortedBy(property);
    setDataApi(sortedDataApi)
  }

  return (
    <div className='tableContainer'>
      <h1>Substrantive Research</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortBy('sector_id')}>
              Sector ID <BiSolidSortAlt/>
            </th>
            <th onClick={() => handleSortBy('name')}>
              Sector <BiSolidSortAlt/>
            </th>
            <th onClick={() => handleSortBy('interactions')}>
              Nº of Interactions <BiSolidSortAlt/>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataApi.map((item) =>
            <tr key={item.sector_id}>
              <td>{item.sector_id}</td>
              <td>{item.name}</td>
              <td>{percentage(numInteractions.current, item.interactions)} %</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

export default App;
