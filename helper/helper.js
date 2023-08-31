const dayjs = require('dayjs');

function dateFormat(value) {
    return value.toISOString().split('T')[0];
}

function priceFormat(value) {
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR"
    })
}

function expiredDate() {
  // Get the current date
  const currentDate = dayjs();

  // Calculate the expiration date by adding 3 days to the current date
  const expirationDate = currentDate.add(3, 'day');

  // Format the expiration date as desired (e.g., 'YYYY-MM-DD HH:mm:ss')
  const formattedExpirationDate = expirationDate.format('YYYY-MM-DD HH:mm:ss');

  return formattedExpirationDate;
}

module.exports = {dateFormat, priceFormat, expiredDate}