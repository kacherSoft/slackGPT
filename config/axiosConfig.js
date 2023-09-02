module.exports = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.GPT_API_KEY}`
  }
};
