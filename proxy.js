const http = require("http");
const https = require("https");

const AIRTABLE_API_KEY = "patRkyVYUVONqOCje.6112547b254199d937ca2d1323fe959540aace1d2959e48a062db6eebc933c3d";
const AIRTABLE_BASE_ID = "appeRGdpcvJduYnHb";
const AIRTABLE_TABLE = "Attendance";
const AIRTABLE_VIEW = "viw8oOLDEs8hRoOUs";

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Content-Type", "application/json");

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}?view=${AIRTABLE_VIEW}`;

  https
    .get(
      url,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      },
      (airtableRes) => {
        let data = "";
        airtableRes.on("data", (chunk) => (data += chunk));
        airtableRes.on("end", () => {
          res.writeHead(airtableRes.statusCode);
          res.end(data);
        });
      },
    )
    .on("error", (err) => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    });
});

server.listen(3000, () => {
  console.log("Proxy server running at http://localhost:3000");
});
