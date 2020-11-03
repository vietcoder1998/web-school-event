export const timeConverter = (dateRaw) => {
  // if(dateRaw === -1) {
  //   return null
  // }
  var date = new Date(dateRaw);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};
