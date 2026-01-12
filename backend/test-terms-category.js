const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/coc2/terms?category=Network%20Devices',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    const terms = JSON.parse(responseData);
    console.log(`Found ${terms.length} Network Devices terms`);
    if (terms.length > 0) {
      console.log('Sample term:', terms[0].term);
      console.log('Correct definition:', terms[0].definitions.find(d => d.is_correct)?.definition);
    }
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.end();
