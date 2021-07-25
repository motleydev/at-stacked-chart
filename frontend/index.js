import React from "react";

import {
  initializeBlock,
  useBase,
  useGlobalConfig,
  Box,
} from "@airtable/blocks/ui";

import Controls from "./Controls/Controls";
import BarChart from "./Chart/BarChart";
import GlobalConfigKeys from "../config/settings";

function SimpleChartApp() {
  // A series of Airtable hooks that get the current
  // base and active table.
  const base = useBase();
  const globalConfig = useGlobalConfig();

  const tableId = globalConfig.get(GlobalConfigKeys.TABLE_ID);
  const table = base.getTableByIdIfExists(tableId);

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
      <Controls table={table} />
      <Box position="relative" flex="auto" padding={3}>
        <BarChart table={table} />
      </Box>
    </Box>
  );
}
// The render method for Airtable Blocks
initializeBlock(() => <SimpleChartApp />);
