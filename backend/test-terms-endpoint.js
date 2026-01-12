const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/coc2/terms',
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
    console.log(`Found ${terms.length} total terms`);
    if (terms.length > 0) {
      console.log('Sample term:', terms[0].term);
      console.log('Category:', terms[0].category);
      console.log('Definitions:', terms[0].definitions.map(d => d.definition));
    }
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.end();
