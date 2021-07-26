import React from "react";

import { Bar } from "react-chartjs-2";

import { isDefault } from "../../utils/isDefault";
import formatBarChartData from "./utils/formatBarChartData";
import useViewRecords from "./hooks/useViewRecords";
import useControlFields from "./hooks/useControlFields";

function BarChart({ table }) {
  // Our X-Axis and Group Fields.
  const [xField, groupField] = useControlFields(table);

  // Records for the active view of the selected table.
  const records = useViewRecords(table);

  // Parse our records into the shape of a simple or stacked chart.
  // Returns null if x-axis or records are empty.
  const data = formatBarChartData({ records, xField, groupField });

  return data ? (
    <Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: !isDefault(groupField),
            },
          ],
          yAxes: [
            {
              stacked: !isDefault(groupField),
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
  ) : table ? (
    "Choose an X-Axis field"
  ) : (
    "Choose a Table"
  );
}

export default BarChart;
