import { ResponsiveLine } from '@nivo/line'

const EstimationChart = ({ spentHours, duration, ideal }) => {
  const data = [
    {
      id: 'Baseline',
      data: Array(duration)
        .fill()
        .map((v, i) => ({ x: i + 1, y: ideal }))
    },
    {
      id: 'Risk (superior)',
      data: Array(duration)
        .fill()
        .map((v, i) => ({ x: i + 1, y: ideal * 1.45 }))
    },
    {
      id: 'Risk (inferior)',
      data: Array(duration)
        .fill()
        .map((v, i) => ({ x: i + 1, y: ideal * 0.8 }))
    },
    {
      id: 'Work done',
      data: spentHours.map((y, i) => ({ x: i + 1, y }))
    }
  ]

  return (
    <ResponsiveLine
      enableSlices="x"
      data={data}
      margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Week',
        legendOffset: 35,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Duration in h',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'category10' }}
      pointSize={10}
      pointColor={{ from: 'color' }}
      pointLabel="y"
      pointLabelYOffset={-10}
      useMesh
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: true,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 15,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, 0.5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .05)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )
}

export default EstimationChart
