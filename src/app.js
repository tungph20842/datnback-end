import analyticRouter from './routers/analytic.routes';
import blogRouter from './routers/blog';
import cartRouter from './routers/cart';
import categoryRouter from './routers/category';
import colorRouter from './routers/color';
import commentRouter from './routers/comment';
import contactRouter from './routers/contact';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import newsRouter from './routers/news';
import oderDetailRouter from './routers/Oder_detail';
import orderRouter from './routers/orders';
import productRouter from './routers/product';
import productSizeRouter from './routers/product_size';
import router from './routers/users';
import searchRouter from './routers/search';
import sizeRouter from './routers/size';
import vnpayRouter from './routers/vnpay';
import voucherRouter from './routers/voucher';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', commentRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', voucherRouter);
app.use('/api', colorRouter);
app.use('/api', sizeRouter);
app.use('/api', cartRouter);
app.use('/api', newsRouter);
app.use('/api', oderDetailRouter);
app.use('/api', productSizeRouter);
app.use('/api', router);
app.use('/api', orderRouter);
app.use('/api', searchRouter);
app.use('/api', contactRouter);
app.use('/api', blogRouter);
app.use('/api', vnpayRouter);
app.use('/api', analyticRouter);

// mongoose.connect("mongodb://127.0.0.1:27017/DATN_WD55");
mongoose.connect(
	'mongodb+srv://phamvanduy15012003:vanduy2003@duantotnghiep.lcazero.mongodb.net/DuAn?retryWrites=true&w=majority',
);
export const viteNodeApp = app;
