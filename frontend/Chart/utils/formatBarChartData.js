import { isDefault } from "../../../utils/isDefault";
import groupRecordsByXFields from "./groupRecordsByXField";
import stackedChartData from "./stackedChartData";
import simpleChartData from "./simpleChartData";

function getChartData({ records, xField, groupField }) {
  if (isDefault(xField) || !records) return null;

  // Store all our unique xAxis values along with a tally
  // of the entries and an index in our store for reference if/when
  // applying grouping logic.
  const xAxisBucket = records.reduce(groupRecordsByXFields(xField), new Map());

  // Return either a simple or stacked dataset
  let datasets = isDefault(groupField)
    ? simpleChartData(xAxisBucket)
    : stackedChartData(xAxisBucket, records, xField, groupField);

  const data = {
    // Labels map to the length and value of x-axis labels
    labels: [...xAxisBucket.keys()],
    datasets,
  };
  return data;
}

export default getChartData;
