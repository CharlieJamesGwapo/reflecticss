const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/coc2/questions?category=Network%20Topology',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    const questions = JSON.parse(responseData);
    console.log(`Found ${questions.length} Network Topology questions`);
    if (questions.length > 0) {
      console.log('Sample question:', questions[0].question_text);
      console.log('Choices:', questions[0].choices.map(c => c.choice_text));
    }
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.end();
