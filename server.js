const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  res.send({ quote: getRandomElement(quotes)});
});

app.get('/api/quotes', (req, res, next) => {
  if (!req.query.person) {
    res.send({ quotes: quotes });
    return;
  }

  const personalQuotes = quotes
    .filter(quote => quote.person === req.query.person);

  res.send({quotes: personalQuotes});
})

app.post('/api/quotes', (req, res, next) => {
  if (!req.query.person || !req.query.quote) {
    res.status(400).send();
    return;
  }

  const newQuote = {
    quote: req.query.quote,
    person: req.query.person
  }

  quotes.push(newQuote);
  res.status(201).send({ quote: newQuote });
});

app.listen(PORT);
