import {
  getAggregate,
  getReviews,
  getImages,
  addReview,
  addComment,
  updateReview,
  reportComment,
} from './serverHelpers';
import { db } from '../review-database/connection';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3004;

app.use(cors());

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('*/reviewBundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/reviewBundle.js'));
});

app.get('*/reviews/summary/:productId', (req, res) => {
  const product = Number(req.params.productId);
  if (typeof product !== 'number') {
    res.sendStatus(400);
  }
  getAggregate(product).then(summary => res.send(summary));
});

app.get('*/reviews/:productId', (req, res) => {
  const product = Number(req.params.productId);
  if (typeof product !== 'number') res.sendStatus(400);
  getReviews(product, getImages).then(results => res.send(results));
});

app.get('*/reviews/comments/:reviewId', (req, res) => {
  // TODO: add comment viewing
  res.send();
});

app.post('*/reviews/addreview', (req, res) => {
  // TODO: add review posting
  res.send();
});

app.post('*/reviews/addcomment', (req, res) => {
  // TODO: add comment posting
  res.send();
});

app.post('*/reviews/reviewfeedback', (req, res) => {
  // TODO: add review helpful/not_helpful incrementing
  res.send();
});

app.post('*/reviews/reportcomment', (req, res) => {
  // TODO: add abuse incrementing
  res.send();
});

app.use('*/*', express.static('public'));

app.listen(port, () => {
  console.log('Listening on port:', port);
});
