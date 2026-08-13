const https = require('https');
https.get('https://unsplash.com/s/photos/kampala', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    console.log(matches ? [...new Set(matches)].slice(0, 10) : 'no matches');
  });
});
