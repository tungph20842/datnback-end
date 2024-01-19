import { analyticController } from '../controllers/analytic.controller.js';
import express from 'express';

const router = express.Router();

router.post('/filter-order', analyticController.filterMoney);
router.post('/analytic-day', analyticController.analyticDay);
router.post('/analytic-of-the-week', analyticController.analyticWeek);
router.get('/analytic-month', analyticController.analyticMonth);
router.get('/analytic-year', analyticController.analyticYear);
router.get('/analytic-status-year', analyticController.analyticStatus);
router.get('/analytic-status-week', analyticController.analyticStatusWeek);

router.get('/analytic-order-peding', analyticController.getOrderStatusPending);
router.get('/analytic-order-processing', analyticController.getOrderStatusProcessing);
router.get('/analytic-order-delivery', analyticController.getOrderStatusDelivery);
router.get('/analytic-order-complete', analyticController.getOrderStatusComplete);
router.get('/analytic-order-cancelled', analyticController.getOrderStatusCancelled);

router.get('/analytic-products', analyticController.countProducts);
router.get('/analytic-users', analyticController.countUsers);
router.get('/analytic-numbes', analyticController.counts);

router.get('/top-product', analyticController.getTopProducts);
router.get('/top-product-by-week', analyticController.getTopProductsByWeek);
router.get('/top-product-by-month', analyticController.getTopProductsByMonth);
router.get('/top-product-by-year', analyticController.getTopProductsByYear);
export default router;
