function fetchHolidays(month, callback) {
fetch('https://sholiday.faboul.se/dagar/v2.1/' + month)
  .then(response => response.json())
  .then(data => callback(data))
}

export default fetchHolidays;