const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/coc2/categories',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Categories:', JSON.parse(responseData));
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.end();
