/**
 * common.ts
 * This Component is used for common functions for forms.
 */

const CommonUtil = () => {
  // const { post } = useFetch();

  // this function is to prevent form input to prevent some values as needed.
  const onPreventDefault = (event: any) => {
    event.preventDefault();
  };

  // Handles key press events, triggering actions based on the pressed keys.
  const onPressEnterKey = (event: any) => {
    event.key === "Enter" && event.currentTarget.blur();
  };

  // Validates input for text fields, allowing only alphabets, spaces, and certain keys.
  const validateText = (event: any) => {
    const value = event.currentTarget.value + event.key;
    const validInput = /^[A-Za-z\s]+$/.test(value);
    if (!validInput && ![8, 9, 13].includes(event.keyCode)) {
      event.preventDefault();
    }
  };

  // Validates input for numeric values, allowing only digits and certain keys.
  const validateNumber = (event: any) => {
    if (!/^\d$/.test(event.key) && event.keyCode !== 8) {
      onPreventDefault(event);
    }
  };

  // Validates input for mobile numbers, allowing specific prefixes and a maximum length of 10 digits.
  const validateMobile = (event: any) => {
    const value = event.target.value + event.key;
    const validInput = /^[9876]\d{0,9}$/.test(value);
    if (!validInput && ![8, 9, 13].includes(event.keyCode)) {
      onPreventDefault(event);
    }
  };

  // Validates input for age or marks, allowing only digits within a specific range.
  const validateAgeOrMarks = (event: any) => {
    const value = event.target.value + event.key;
    const validInput = /^[1-9]\d{0,2}$/.test(value);
    if (!validInput && ![8, 9, 13].includes(event.keyCode)) {
      onPreventDefault(event);
    }
  };

  //Determines if any field key has associated errors.
  const sectionError = (fieldKeys: Array<string>, errors: object) => {
    return fieldKeys.some((fieldKey) => fieldKey in errors);
  };

  // Truncate the display name to a specified max length, appending '...' if it exceeds that length.
  const truncateDisplayName = (displayName: string, maxLength: number) => {
    if (displayName.length > maxLength) {
      return `${displayName.slice(0, maxLength)}...`;
    }
    return displayName;
  };

  //this function is for error log
  const logError = (error: unknown, functionName: string) => {
    console.error(`Encountered Error! While calling ${functionName}- `, error);
  };
  const getDropdownValue = (value: number | string = "", label = "") => {
    return {
      value,
      label,
    };
  };

  return {
    onPreventDefault,
    onPressEnterKey,
    validateText,
    validateNumber,
    validateMobile,
    validateAgeOrMarks,
    sectionError,
    logError,
    truncateDisplayName,
    // updateQueryString,
    // decryptQueryString,
    getDropdownValue,
  };
};

export default CommonUtil();
