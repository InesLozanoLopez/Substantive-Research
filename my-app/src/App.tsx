import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchDataApi } from './ApiServices';
import { Isector } from './interfaces';

function App() {
  const [dataApi, setDataApi] = useState<Isector[]>([]);

  useEffect(() => {
    fetchDataApi()
      .then((response: Isector[]) => {
        const updatedData = response.reduce((data, interplay) => {
          const existingSector = data.find((sector) => sector.name === interplay.name);
          if(existingSector){
            existingSector.interactions += 1;
          }else{
              data.push({...interplay, interactions: 1});
      }return data;
    }, [] as Isector[]);
        setDataApi(updatedData)
        console.log('updatedData', updatedData)

      })
      .catch((error) => {
        console.log('error from App.tsx', error)
      })
  }, [])



  return (
    <>
      {dataApi.map((sector) => (
        <div key={sector.sector_id}>
          Name: {sector.name}, Interactions: {sector.interactions}
        </div>
      ))}
    </>
  );
}

export default App;
