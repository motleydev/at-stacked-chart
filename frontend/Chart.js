import React from "react";
import { useGlobalConfig, useRecords } from "@airtable/blocks/ui";

import { Bar } from "react-chartjs-2";
import GlobalConfigKeys from "./settings";

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
              stacked: !!groupField,
            },
          ],
          yAxes: [
            {
              stacked: !!groupField,
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
  const xUniqueValues = new Set();
  const groupUniqueValues = new Set();
  const recordValues = [];

  const colors = [
    "#2d7ff9",
    "#18bfff",
    "#ff08c2",
    "#f82b60",
    "#ff6f2c",
    "#fcb400",
    "#20c933",
    "#8b46ff",
    "#666666",
  ];
  for (const record of records) {
    const xValue = record.getCellValue(xField);
    const xValueString =
      xValue === null ? null : record.getCellValueAsString(xField);
    const groupValue =
      groupField === null ? null : record.getCellValue(groupField);
    const groupValueString =
      groupValue === null ? null : record.getCellValueAsString(groupField);

    xUniqueValues.add(xValueString);
    groupUniqueValues.add(groupValueString);

    const cleanRecord = {};
    cleanRecord[xField.id] = xValueString;
    cleanRecord[groupField?.id] = groupValueString;

    recordValues.push(cleanRecord);
  }

  const stacked = [...groupUniqueValues].map((groupKey, index) => {
    const o = {};
    o.label = groupKey;
    o.backgroundColor = colors[index];
    o.data = [...xUniqueValues].map(
      (xKey) =>
        recordValues.filter(
          (r) => r[xField.id] === xKey && r[groupField.id] === groupKey
        ).length
    );
    return o;
  });

  const data = {
    labels: [...xUniqueValues],
    datasets: stacked,
  };
  return data;
}

export default Chart;
