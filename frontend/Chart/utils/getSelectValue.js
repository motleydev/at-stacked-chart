import { isDefault, F_DEFAULT } from "../../../utils/isDefault";
const getSelectValue = (v, record) =>
  isDefault(v) ? F_DEFAULT : record.getCellValueAsString(v);

export default getSelectValue;
