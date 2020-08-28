export function useCheckboxes(defaultCheckboxes) {
  const [checkboxes, setCheckboxes] = useState(
    defaultCheckboxes || getDefaultCheckboxes(),
  );
  function setCheckbox(index, checked) {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = checked;
    setCheckboxes(newCheckboxes);
  }
  return {
    setCheckbox,
    checkboxes,
  };
}
