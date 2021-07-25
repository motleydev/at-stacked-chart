import getSelectValue from "./getSelectValue";

const groupRecordsByXFields = (xField) => (collector, current) => {
  const xAxisKey = getSelectValue(xField, current);

  // We check to see if we've recorded this entry in our x-axis
  // bucket and increment the tally, if not,
  // we add it and store the value with an index
  // for later reference.
  if (!collector.has(xAxisKey)) {
    collector.set(xAxisKey, { index: collector.size, tally: 1 });
  } else {
    collector.get(xAxisKey).tally++;
  }

  return collector;
};

export default groupRecordsByXFields;
