import '../App.css';
import { Isector } from '../interfaces';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { IoBarChartSharp } from 'react-icons/io5';

const DoughnutChart = ({
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
        responsive: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          color: legendColor,
          padding: 14,
          font: {
            responsive: true,
            lineHeight: 12,
          },
          // maintainAspectRatio: true,
        },
      },
    },
  };

  return (
    <>
      <div className="graphic">
        <div className="changeViewIcon">
          <IoBarChartSharp
            onClick={handleChartView}
            aria-label="to change view to bar chart"
          />
        </div>
        <div>
          <Chart
            data={data}
            type={'doughnut'}
            options={options}
            className="chart"
            aria-label="Pie chart showing data"
          />
        </div>
      </div>

    </>
  );
};
export default DoughnutChart;
