import React from "react";
import { useGlobalConfig, useRecords } from "@airtable/blocks/ui";

import { Bar } from "react-chartjs-2";
import GlobalConfigKeys from "./settings/settings";
import COLORS from "./settings/colors";
import isNull from "../utils/isNull";

function Chart({ table }) {
  const globalConfig = useGlobalConfig();
  const viewId = globalConfig.get(GlobalConfigKeys.VIEW_ID);
  const view = table ? table.getViewByIdIfExists(viewId) : null;

  const xFieldId = globalConfig.get(GlobalConfigKeys.X_FIELD_ID);
  const xField =
    xFieldId !== "null" ? table.getFieldByNameIfExists(xFieldId) : null;

  const groupFieldId = globalConfig.get(GlobalConfigKeys.GROUP_FIELD_ID);
  const groupField =
    groupFieldId !== "null" ? table.getFieldByNameIfExists(groupFieldId) : null;

  const records = useRecords(view);

  const data =
    records && xField ? getChartData({ records, xField, groupField }) : null;

  return data ? (
    <Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: !isNull(groupField),
            },
          ],
          yAxes: [
            {
              stacked: !isNull(groupField),
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      }}
    />
  ) : (
    "Loading…"
  );
}

function getChartData({ records, xField, groupField }) {
  const xAxisBucket = new Map();
  const groupBucket = new Map();
  let xIndex = 0;

  const colorGen = [...COLORS];

  const transformed = records.map((record) => {
    const xValue = record.getCellValue(xField);
    const xValueString =
      xValue === null ? null : record.getCellValueAsString(xField);
    const groupValue =
      groupField === null ? null : record.getCellValue(groupField);
    const groupValueString =
      groupValue === null ? null : record.getCellValueAsString(groupField);

    const label = groupValueString;
    const xAxis = xValueString;

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

  if (isNull(groupField)) {
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

export default Chart;
