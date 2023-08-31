function dateFormat(value) {
    return value.toISOString().split('T')[0];
}

function priceFormat(value) {
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR"
    })
}

module.exports = {dateFormat, priceFormat}