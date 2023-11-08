import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


const DoughnutChart = ({ dataApi, backgroundColorArray }: { dataApi: Isector[], backgroundColorArray: string[] }) => {
    const data = {
        labels: [
            ...dataApi.map((sector: Isector) => sector.name)
        ],
        datasets: [{
            label: 'Substantive Research',
            data: dataApi.map((sector: Isector) => sector.interactions),
            backgroundColor: backgroundColorArray,
            hoverOffset: 1,
            borderColor: 'var(--dark)'
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    color: 'var(--dark)',
                    padding: 14,
                    font: {
                        responsive: true,
                        lineHeight: 12,
                    },
                    maintainAspectRatio: true,
                }
            }
        }
    }

    return (
        <div className='graphic' >
            <Chart data={data} type={'doughnut'} options={options} className='chart' />
        </div >
    );
}
export default DoughnutChart;
