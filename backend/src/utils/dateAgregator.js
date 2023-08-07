//Moment
const moment = require("moment");

//Booked servies graph date vs booked amount
const dateAggregator = (data) => {
    // aggregator object
    const aggregatedData = {};
  
    // Execute aggregation
    data.forEach((el) => {
      // Get the date
      let date = moment(el.createdAt).format("MMMM Do YYYY");
  
      if (aggregatedData[date]) {
        aggregatedData[date] += 1;
      } else {
        aggregatedData[date] = 1;
      }
    });
  
    return aggregatedData;
  };

  module.exports = dateAggregator;