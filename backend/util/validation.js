function isValidText(value) {
  return value && value.trim().length > 0;
}

function isValidDate(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidImageUrl(value) {
  return value && value.startsWith("http");
}

function isValidEmail(value) {
  return value && value.includes("@");
}

export { isValidText, isValidDate, isValidImageUrl, isValidEmail };
