import React from "react";

import {
  initializeBlock,
  useBase,
  useRecords,
  useGlobalConfig,
  Box,
} from "@airtable/blocks/ui";

import Controls from "./Controls";
import Chart from "./Chart";
import GlobalConfigKeys from "./settings";

function SimpleChartApp() {
  const base = useBase();
  const globalConfig = useGlobalConfig();

  const tableId = globalConfig.get(GlobalConfigKeys.TABLE_ID);
  const table = base.getTableByIdIfExists(tableId);

  const viewId = globalConfig.get(GlobalConfigKeys.VIEW_ID);
  const view = table ? table.getViewByIdIfExists(viewId) : null;

  const records = useRecords(view);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      flexDirection="column"
    >
      <Controls table={table} records={records} />
      <Box position="relative" flex="auto" padding={3}>
        <Chart table={table} records={records} />
      </Box>
    </Box>
  );
}

initializeBlock(() => <SimpleChartApp />);
