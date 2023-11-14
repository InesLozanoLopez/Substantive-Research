import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { IoPieChartSharp } from 'react-icons/io5';

const BarChart = ({
  dataApi,
  backgroundColorArray,
  handleChartView,
}: {
  dataApi: Isector[];
  backgroundColorArray: string[];
  handleChartView: any;
}) => {
  var style = getComputedStyle(document.body);
  var legendColor = style.getPropertyValue('--dark');

  const data = {
    labels: [...dataApi.map((sector: Isector) => sector.name)],
    datasets: [
      {
        label: 'Substantive Research',
        data: dataApi.map((sector: Isector) => sector.interactions),
        backgroundColor: backgroundColorArray,
        hoverOffset: 1,
        borderColor: legendColor,
        borderWidth: 2,
        barThickness: 20,
        responsive: true,
      },
    ],
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
            lineHeight: 10,
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: legendColor,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: legendColor,
        },
      },
    },
  };

  return (
    <>
      <div className="graphic">
        <div className="changeViewIcon">
          <IoPieChartSharp
            onClick={handleChartView}
            aria-label="to change view to pie chart"
          />
        </div>
        <div>
          <Chart
            data={data}
            type={'bar'}
            options={options}
            className="chart"
            aria-label="Bar chart showing data"
          />
        </div>
      </div>

    </>
  );
};
export default BarChart;
