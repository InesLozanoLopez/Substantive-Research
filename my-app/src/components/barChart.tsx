import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


const BarChart = ({ dataApi, backgroundColorArray }: { dataApi: Isector[], backgroundColorArray: string[] }) => {
    const data = {
        labels: [
            ...dataApi.map((sector: Isector) => sector.name)
        ],
        datasets: [{
            label: 'Substantive Research',
            data: dataApi.map((sector: Isector) => sector.interactions),
            backgroundColor: backgroundColorArray,
            hoverOffset: 1,
            borderColor: 'var(--dark)',
            borderWidth: 2,
            barThickness: 30,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    font: {
                        responsive: true,
                        lineHeight: 12,
                    },
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'var(--dark)',
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'var(--dark)',
                },
            },
    }
}

    return (
        <div className='graphic' >
            <Chart data={data} type={'bar'} options={options} className='chart' />
        </div >
    );
}
export default BarChart;
