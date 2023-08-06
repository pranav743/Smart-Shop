import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  render() {
    const { data } = this.props; // Receive the array of objects from props

    // Extract labels and quantities from the data array
    const labels = data.map((item) => item.category);
    const series = data.map((item) => item.count);

    const options = {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: labels, // Use the extracted labels
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    return (
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" width={380} />
      </div>
    );
  }
}

export default ApexChart;
