// Select from the UI API does not allow providing a "select null" option.
// It also fallsback to a null selection if the input is invalid.
// To handle these inconsistencies, a "default" guard is being used.
// This is probably a very solvable problem.

const F_DEFAULT = "_default";
const isDefault = (x) => x === null || x === F_DEFAULT;

export { isDefault, F_DEFAULT };
