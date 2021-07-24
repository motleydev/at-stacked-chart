import { useGlobalConfig, useRecords } from "@airtable/blocks/ui";
import GlobalConfigKeys from "../../../config/settings";

// A simple hook wrapper for getting active view records;
function useViewRecords(table) {
  const globalConfig = useGlobalConfig();

  const viewId = globalConfig.get(GlobalConfigKeys.VIEW_ID);
  const view = table ? table.getViewByIdIfExists(viewId) : null;

  const records = useRecords(view);

  return records;
}

export default useViewRecords;
