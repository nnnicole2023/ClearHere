// test-api.js - Test the OpenRouter API directly
const https = require('https');

const key = "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";

const payload = JSON.stringify({
  model: "openai/gpt-3.5-turbo",
  temperature: 0.2,
  messages: [
    {
      role: "system",
      content: `Explain English phrases to new immigrants in 1-2 very short sentences.
      
Rules:
1. Use simplest words possible
2. If it's a rule/sign, say what it means and what to do
3. Maximum 2 sentences total
4. No introductory phrases, just explain directly`.trim()
    },
    { role: "user", content: "final sale" },
  ],
});

const options = {
  hostname: 'openrouter.ai',
  port: 443,
  path: '/api/v1/chat/completions',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(payload);
req.end();
