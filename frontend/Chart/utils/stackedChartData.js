import COLORS from "../../../config/colors";
import getSelectValue from "./getSelectValue";

// Stacked chart data must result in the shape of:
// [{label: x, backgroundColor: y, data: [n,n,n]},...]
// Where "n" is iterated as the height of a segment
// in a stacked bar chart.
/// There must be one object for each entry in the chart.
const stackedChartData = (xAxisBucket, records, xField, groupField) => {
  const colorGen = [...COLORS];
  const result = records.reduce((collector, current) => {
    const label = getSelectValue(groupField, current);
    const xAxis = getSelectValue(xField, current);
    // Initialize our chart array the size and shape of a stacked chart entry.
    const data = new Array(xAxisBucket.size).fill(0);
    // Lookup the column position to be upserted in our data array.
    // The index reference comes from our xAxis bucket previously created.
    // See "simpleChartData.js".
    const xAxisIndex = xAxisBucket.get(xAxis).index;

    // Look for an instance of our label in our map. If it exists,
    // update the count in our array, otherwise, initialize the
    // values on our store.
    if (collector.has(label)) {
      collector.get(label).data[xAxisIndex]++;
    } else {
      data[xAxisIndex] = 1;
      collector.set(label, {
        backgroundColor: colorGen.shift(),
        label,
        data,
      });
    }
    return collector;
  }, new Map());

  return [...result.values()];
};

export default stackedChartData;
