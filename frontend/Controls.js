import React from "react";

import {
  TablePickerSynced,
  ViewPickerSynced,
  Box,
  FormField,
  Select,
  useGlobalConfig,
} from "@airtable/blocks/ui";

import GlobalConfigKeys from "./settings/settings";
import isNull from "../utils/isNull";

export default function Controls({ table }) {
  const globalConfig = useGlobalConfig();

  const xAxisValue = globalConfig.get(GlobalConfigKeys.X_FIELD_ID);
  const groupByValue = globalConfig.get(GlobalConfigKeys.GROUP_FIELD_ID);

  const xAxisFields = table.fields
    .filter((f) => f.name !== table.primaryField.name)
    .map(({ name }) => ({ value: name, label: name }));
  const groupByFields = xAxisFields.filter((f) => f.value !== xAxisValue);

  const defaultSelect = { value: "null", label: "---" };

  React.useEffect(() => {
    if (isNull(xAxisValue))
      globalConfig.setAsync(GlobalConfigKeys.X_FIELD_ID, "null");
    if (xAxisValue === groupByValue) {
      globalConfig.setAsync(GlobalConfigKeys.GROUP_FIELD_ID, "null");
    }
  }, [xAxisValue, groupByValue]);

  return (
    <Box display="flex" padding={3} borderBottom="thick">
      <FormField label="Table" width="25%" paddingRight={1} marginBottom={0}>
        <TablePickerSynced globalConfigKey={GlobalConfigKeys.TABLE_ID} />
      </FormField>
      {table && (
        <React.Fragment>
          <FormField label="View" width="25%" paddingX={1} marginBottom={0}>
            <ViewPickerSynced
              table={table}
              globalConfigKey={GlobalConfigKeys.VIEW_ID}
            />
          </FormField>
          <FormField
            label="X-axis field"
            width="25%"
            paddingLeft={1}
            marginBottom={0}
          >
            <Select
              options={[defaultSelect, ...xAxisFields]}
              value={xAxisValue}
              onChange={(v) => {
                globalConfig.setAsync(GlobalConfigKeys.X_FIELD_ID, v);
              }}
            />
          </FormField>
          <FormField
            label="Group by"
            width="25%"
            paddingLeft={1}
            marginBottom={0}
          >
            <Select
              disabled={isNull(xAxisValue)}
              options={[defaultSelect, ...groupByFields]}
              value={groupByValue}
              onChange={(v) => {
                globalConfig.setAsync(GlobalConfigKeys.GROUP_FIELD_ID, v);
              }}
            />
          </FormField>
        </React.Fragment>
      )}
    </Box>
  );
}
