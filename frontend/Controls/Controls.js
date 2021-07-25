import React from "react";

import {
  TablePickerSynced,
  ViewPickerSynced,
  Box,
  FormField,
  Select,
  useGlobalConfig,
} from "@airtable/blocks/ui";

import GlobalConfigKeys from "../../config/settings";
import { isDefault, F_DEFAULT } from "../../utils/isDefault";

// The Controls box gives us our form handlers for
// manipulating global state.
// We can choose an xAxis value and a groupBy (optional) value.

// [!] Note: if you don't need to control the shape of your select options,
// FieldPickerSynced is probably a better option than Select!

export default function Controls({ table }) {
  const globalConfig = useGlobalConfig();

  // Fetching the synced values from our global state.
  const xAxisValue = globalConfig.get(GlobalConfigKeys.X_FIELD_ID);
  const groupByValue = globalConfig.get(GlobalConfigKeys.GROUP_FIELD_ID);

  // Creating our options for the xAxis and Group Select.
  // Our xAxis operation removes the primary field and formats the data.
  // Our groupBy operation removes the xAxis field from our options.
  const xAxisFields = table.fields
    .filter((f) => f.name !== table.primaryField.name)
    .map(({ name }) => ({ value: name, label: name }));
  const groupByFields = xAxisFields.filter((f) => f.value !== xAxisValue);

  // Create a default value since Select doesn't support choosing null.
  const defaultSelect = { value: F_DEFAULT, label: "---" };

  // This effect creates a guard to handle inconsistencies in the
  // handling of null values and form state. We want to avoid
  // the condition where an input is accidentally null which
  // creates the illusion of a broken form.
  React.useEffect(() => {
    if (isDefault(xAxisValue))
      globalConfig.setAsync(GlobalConfigKeys.X_FIELD_ID, F_DEFAULT);
    if (xAxisValue === groupByValue) {
      globalConfig.setAsync(GlobalConfigKeys.GROUP_FIELD_ID, F_DEFAULT);
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
                // This sets our Global state to the selected value.
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
              disabled={isDefault(xAxisValue)}
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
