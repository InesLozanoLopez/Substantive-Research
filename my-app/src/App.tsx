import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchDataApi } from './ApiServices';
import { Isector} from './interfaces';

function App() {
  const [dataApi, setDataApi] = useState<Isector[]>([]);

  useEffect(() => {
    fetchDataApi()
    .then((response: Isector[]) => {
      const updatedData = response.map((interplay) => {
        return{
            ...interplay,
            interactions : interplay.interactions + 1,
        };
      });
      setDataApi(updatedData)
    }). catch ((error) => {

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
