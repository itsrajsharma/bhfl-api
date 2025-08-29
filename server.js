const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true, message: "Backend up. Use POST /bfhl" });
});

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  
  if (!data || !Array.isArray(data)) {
    return res.status(200).json({
      is_success: false,
      error: "Invalid data"
    });
  }

  const odd_numbers = [];
  const even_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;

  data.forEach(item => {
    const str = String(item);
    
    if (!isNaN(str) && str.trim() !== '') {
      const num = parseInt(str);
      sum += num;
      if (num % 2 === 0) {
        even_numbers.push(str);
      } else {
        odd_numbers.push(str);
      }
    } else if (/^[a-zA-Z]$/.test(str)) {
      alphabets.push(str.toUpperCase());
    } else {
      special_characters.push(str);
    }
  });

  const concat_string = alphabets
    .reverse()
    .map((char, i) => i % 2 === 0 ? char : char.toLowerCase())
    .join('');

  res.status(200).json({
    is_success: true,
    user_id: "john_doe_29082025",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// For Vercel deployment
module.exports = app; 