import { MutableRefObject, useEffect, useState } from 'react';
import '../App.css';
import { Isector } from '../interfaces';
import { BiSolidSortAlt } from 'react-icons/bi';
import { percentage } from '../functions';

const TableView = ({ dataApi, numberOfInteractions, setHoveredSector }: { dataApi: Isector[], numberOfInteractions: MutableRefObject<number>, setHoveredSector: any}) => {
    const [dataView, setDataView] = useState<Isector[]>([]);
    const [sortedBy, setSortedBy] = useState<string>('');

    useEffect(() => {
        setDataView(dataApi);
    }, [dataApi])

    const handleSortBy = (property: keyof Isector) => {
        const sortedDataApi = [...dataView]
        if (sortedBy === property) {
            sortedDataApi.reverse();
        } else {
            sortedDataApi.sort((a, b) => (a[property] < b[property] ? -1 : 1))
        }
        setSortedBy(property);
        setDataView(sortedDataApi)
    }

    const handleRowHover = (sector_id: number | null) => {
        setHoveredSector(sector_id)
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSortBy('sector_id')}>
                            Sector ID <BiSolidSortAlt />
                        </th>
                        <th onClick={() => handleSortBy('name')}>
                            Sector <BiSolidSortAlt />
                        </th>
                        <th onClick={() => handleSortBy('interactions')}>
                            Nº of Interactions <BiSolidSortAlt />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataView.map((item) =>
                        <tr key={item.sector_id}
                        onMouseEnter={() => handleRowHover(item.sector_id)}
                        onMouseLeave={() => handleRowHover(null)}>
                            <td>{item.sector_id}</td>
                            <td>{item.name}</td>
                            <td>{percentage(numberOfInteractions.current, item.interactions)} %</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default TableView;
