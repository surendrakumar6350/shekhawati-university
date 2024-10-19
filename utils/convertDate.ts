const convertDate = (isoDateString: any) => {
  const dateObject = new Date(isoDateString);

  interface DateOptions {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit" | "long" | "short" | "narrow";
    day: "numeric" | "2-digit";
  }
  // Format the date and time
  const options: DateOptions = {
    year: "numeric",
    month: "long", // 'short' for abbreviated month name
    day: "numeric",
  };

  // Convert to a user-friendly format
  const formattedDate = dateObject.toLocaleString("en-US", options);
  return formattedDate;
};
export default convertDate;
