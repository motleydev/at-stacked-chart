import React from "react";
import { useGlobalConfig } from "@airtable/blocks/ui";

import { Bar } from "react-chartjs-2";
import GlobalConfigKeys from "./settings";

function Chart({ table, records }) {
  const globalConfig = useGlobalConfig();
  const xFieldId = globalConfig.get(GlobalConfigKeys.X_FIELD_ID);
  const xField = table ? table.getFieldByIdIfExists(xFieldId) : null;

  const data = records && xField ? getChartData({ records, xField }) : null;
  return data ? (
    <Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
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

function getChartData({ records, xField }) {
  const recordsByXValueString = new Map();
  for (const record of records) {
    const xValue = record.getCellValue(xField);
    const xValueString =
      xValue === null ? null : record.getCellValueAsString(xField);

    if (!recordsByXValueString.has(xValueString)) {
      recordsByXValueString.set(xValueString, [record]);
    } else {
      recordsByXValueString.get(xValueString).push(record);
    }
  }

  const labels = [];
  const points = [];
  for (const [xValueString, records] of recordsByXValueString.entries()) {
    const label = xValueString === null ? "Empty" : xValueString;
    labels.push(label);
    points.push(records.length);
  }

  const data = {
    labels,
    datasets: [
      {
        backgroundColor: "#4380f1",
        data: points,
      },
    ],
  };
  return data;
}

export default Chart;
