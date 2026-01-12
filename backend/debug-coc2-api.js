const http = require('http');

// Test the exact URL the frontend would call
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/coc2/terms',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response length:', responseData.length);
    console.log('First 200 chars:', responseData.substring(0, 200));
    
    try {
      const data = JSON.parse(responseData);
      console.log('Parsed data type:', typeof data);
      console.log('Is array?', Array.isArray(data));
      console.log('Data length:', data.length);
      
      if (data.length > 0) {
        console.log('First item keys:', Object.keys(data[0]));
        console.log('First item:', JSON.stringify(data[0], null, 2));
      }
    } catch (e) {
      console.log('JSON parse error:', e.message);
    }
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.end();
