const fs = require('fs');

const fixPrices = (filename) => {
  let content = fs.readFileSync(filename, 'utf8');
  content = content.replace(/'Kraaifontein, Durbanville & Surrounds': 600,/g, "'Kraaifontein, Durbanville & Surrounds': 500,");
  content = content.replace(/'Table View, Blouberg & Surrounds': 800,/g, "'Table View, Blouberg & Surrounds': 700,");
  content = content.replace(/'Southern Suburbs & Surrounds': 900,/g, "'Southern Suburbs & Surrounds': 800,");
  content = content.replace(/'CBD, Atlantic Seaboard & Surrounds': 1000,/g, "'CBD, Atlantic Seaboard & Surrounds': 900,");
  content = content.replace(/'Other Area \(Custom Travel Quote\)': 600/g, "'Other Area (Custom Travel Quote)': 500");
  fs.writeFileSync(filename, content);
};

fixPrices('src/components/BookingFlow.jsx');
fixPrices('src/components/SingleBookingFlow.jsx');

let chatJs = fs.readFileSync('api/chat.js', 'utf8');
chatJs = chatJs.replace(/- Kraaifontein, Durbanville & Surrounds: R 1,000 \/ month/g, "- Kraaifontein, Durbanville & Surrounds: R 900 / month");
chatJs = chatJs.replace(/- Table View, Blouberg & Surrounds: R 1,300 \/ month/g, "- Table View, Blouberg & Surrounds: R 1,200 / month");
chatJs = chatJs.replace(/- Southern Suburbs & Surrounds: R 1,500 \/ month/g, "- Southern Suburbs & Surrounds: R 1,400 / month");
chatJs = chatJs.replace(/- CBD, Atlantic Seaboard & Surrounds: R 1,800 \/ month/g, "- CBD, Atlantic Seaboard & Surrounds: R 1,700 / month");
fs.writeFileSync('api/chat.js', chatJs);

console.log("Prices updated.");
