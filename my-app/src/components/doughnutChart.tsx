import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { IoBarChartSharp } from 'react-icons/io5';


const DoughnutChart = ({ dataApi, backgroundColorArray, handleChartView }: { dataApi: Isector[], backgroundColorArray: string[], handleChartView: any }) => {
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
                        <IoBarChartSharp onClick={handleChartView}/>

            <Chart data={data} type={'doughnut'} options={options} className='chart' />
        </div >
    );
}
export default DoughnutChart;
