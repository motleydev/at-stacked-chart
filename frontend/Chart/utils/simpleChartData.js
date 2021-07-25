import COLORS from "../../../config/colors";

// Simple chart data must be in the shape of
// [{backgroundColor: x, data: [n,n,n]}]
// where "n" is the size and position of the bars on a chart.
// There must be exactly one entry in the array.
const simpleChartData = (xAxisBucket) => {
  return [
    {
      backgroundColor: [...COLORS].shift(),
      data: [...xAxisBucket.values()].map((v) => v.tally),
    },
  ];
};

export default simpleChartData;
