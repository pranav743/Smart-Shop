import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  render() {
    const { data } = this.props;

    const labels = data.map((item) => item.category);
    const series = data.map((item) => item.count);

    const options = {
      chart: {
        width: 350,
        type: 'pie',
        height: 500,
      },
      labels: labels,
      dataLabels: {
        style: {
          colors: ['#ffffff'],
          fontSize: '18px',
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          customScale: 1.08,
          dataLabels: {
            offset: 0,
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          colors: '#ffffff', // Change the color of the legend text to white
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    return (
      <div id="chart" style={{marginTop: '15px'}}>
        <p style={{margin: '15px 0 35px 0', color: '#fff'}}>Distribution of Categories</p>
        <ReactApexChart options={options} series={series} type="pie" width={380} />
      </div>
    );
  }
}

export default ApexChart;
