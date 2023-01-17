const sayHi = (req, res) => {
  const data =
  'How did the telephone propose to his girlfriend? ...he gave her a ring.';
  res.send(data);
}

module.exports = { sayHi }