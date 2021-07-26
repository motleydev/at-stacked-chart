import { useGlobalConfig } from "@airtable/blocks/ui";
import GlobalConfigKeys from "../../../config/settings";

// A simple hook wrapper for getting our x-axis and group-by fields.
function useControlFields(table) {
  const globalConfig = useGlobalConfig();

  if (table) {
    const xFieldId = globalConfig.get(GlobalConfigKeys.X_FIELD_ID);
    const xField =
      xFieldId !== null ? table.getFieldByNameIfExists(xFieldId) : null;

    const groupFieldId = globalConfig.get(GlobalConfigKeys.GROUP_FIELD_ID);
    const groupField =
      groupFieldId !== null ? table.getFieldByNameIfExists(groupFieldId) : null;

    return [xField, groupField];
  } else {
    return [];
  }
}

export default useControlFields;
