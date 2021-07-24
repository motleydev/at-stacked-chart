import COLORS from "../../../config/colors";
import { isDefault, F_DEFAULT } from "../../../utils/isDefault";

function getChartData({ records, xField, groupField }) {
  if (isDefault(xField) || !records) return null;

  const xAxisBucket = new Map();
  const groupBucket = new Map();
  let xIndex = 0;

  const colorGen = [...COLORS];

  const transformed = records.map((record) => {
    const label = isDefault(groupField)
      ? F_DEFAULT
      : record.getCellValueAsString(groupField);
    const xAxis = isDefault(xField)
      ? F_DEFAULT
      : record.getCellValueAsString(xField);

    if (!groupBucket.has(label)) {
      groupBucket.set(label, { backgroundColor: colorGen.shift() });
    }

    if (!xAxisBucket.has(xAxis)) {
      xAxisBucket.set(xAxis, { index: xIndex, tally: 1 });
      xIndex++;
    } else {
      let existing = xAxisBucket.get(xAxis);
      xAxisBucket.set(xAxis, { ...existing, tally: existing.tally + 1 });
    }

    return { label, xAxis };
  });

  let datasets;

  if (isDefault(groupField)) {
    datasets = [
      {
        backgroundColor: colorGen.shift(),
        data: [...xAxisBucket.values()].map((v) => v.tally),
      },
    ];
  } else {
    transformed.forEach(({ label, xAxis }) => {
      const data = new Array(xAxisBucket.size).fill(0);
      const xAxisIndex = xAxisBucket.get(xAxis).index;
      let groupBucketEntry = groupBucket.get(label);

      if (groupBucketEntry.label) {
        groupBucketEntry.data[xAxisIndex] =
          groupBucketEntry.data[xAxisIndex] + 1;
        groupBucket.set(label, {
          ...groupBucketEntry,
          data: groupBucketEntry.data,
        });
      } else {
        data[xAxisIndex] = 1;
        groupBucket.set(label, {
          ...groupBucketEntry,
          label,
          data,
        });
      }
    });
    datasets = [...groupBucket.values()];
  }

  const data = {
    labels: [...xAxisBucket.keys()],
    datasets,
  };
  return data;
}

export default getChartData;
