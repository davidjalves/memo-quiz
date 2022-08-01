export const dateFormat = () => {
  const date = new Date();
  return date
    .toISOString()
    .replace(/T/, "-") // replace T with a space
    .replace(/\..+/, ""); // delete the dot and everything after
};
