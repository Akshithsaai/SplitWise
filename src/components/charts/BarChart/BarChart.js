import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect,useState } from 'react';

const chartSetting = {
  xAxis: [
    {
      label: 'Expenses',
    },
  ],
  width: 650,
  height: 450,
};

let dataset = [
    {
      expense: 0,
      month: 'Jan',
    },
    {
      expense: 0,
      month: 'Fev',
    },
    {
      expense: 0,
      month: 'Mar',
    },
    {
      expense: 0,
      month: 'Apr',
    },
    {
      expense: 0,
      month: 'May',
    },
    {
      expense: 0,
      month: 'June',
    },
    {
      expense: 0,
      month: 'July',
    },
    {
      expense: 0,
      month: 'Aug',
    },
    {
      expense: 0,
      month: 'Sept',
    },
    {
      expense: 0,
      month: 'Oct',
    },
    {
      expense: 0,
      month: 'Nov',
    },
    {
      expense: 0,
      month: 'Dec',
    },
  ];

const valueFormatter = (value) => `Rs${value}`;

export default function HorizontalBars({dataset}) {
    const [data, setData] = useState(dataset);

    // Update local state when dataset prop changes
    useEffect(() => {
      setData(dataset);
    }, [dataset]);
  return (
    <BarChart 
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'expense', label: 'Expenses', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
