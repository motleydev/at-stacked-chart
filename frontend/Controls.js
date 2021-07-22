import React from "react";

import {
  TablePickerSynced,
  ViewPickerSynced,
  FieldPickerSynced,
  Select,
  Box,
  FormField,
} from "@airtable/blocks/ui";

import GlobalConfigKeys from "./settings";

export default function Controls({ table, records }) {
  return (
    <Box display="flex" padding={3} borderBottom="thick">
      <FormField label="Table" width="33.33%" paddingRight={1} marginBottom={0}>
        <TablePickerSynced globalConfigKey={GlobalConfigKeys.TABLE_ID} />
      </FormField>
      {table && (
        <FormField label="View" width="33.33%" paddingX={1} marginBottom={0}>
          <ViewPickerSynced
            table={table}
            globalConfigKey={GlobalConfigKeys.VIEW_ID}
          />
        </FormField>
      )}
      {table && (
        <FormField
          label="X-axis field"
          width="33.33%"
          paddingLeft={1}
          marginBottom={0}
        >
          <FieldPickerSynced
            table={table}
            globalConfigKey={GlobalConfigKeys.X_FIELD_ID}
          />
        </FormField>
      )}
      {table && (
        <FormField
          label="Group by"
          width="33.33%"
          paddingLeft={1}
          marginBottom={0}
        >
          <FieldPickerSynced
            table={table}
            globalConfigKey={GlobalConfigKeys.X_FIELD_ID}
          />
        </FormField>
      )}
    </Box>
  );
}
