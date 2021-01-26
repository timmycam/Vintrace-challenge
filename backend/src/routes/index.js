import express from 'express';
import {
  yearBreakdown,
  varietyBreakdown,
  regionBreakdown,
  yearVarietyBreakdown,
  productSearch,
  product } from '../controllers';
const indexRouter = express.Router();

indexRouter.get('/product', productSearch);
indexRouter.get('/product/:lotCode', product);

indexRouter.get('/breakdown/year/:lotCode', yearBreakdown);
indexRouter.get('/breakdown/variety/:lotCode', varietyBreakdown);
indexRouter.get('/breakdown/region/:lotCode', regionBreakdown);
indexRouter.get('/breakdown/year-variety/:lotCode', yearVarietyBreakdown);

export default indexRouter;