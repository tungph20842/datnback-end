import config from '../config/config';
import { createHmac } from 'crypto';
import dateFormat from 'dateformat';
import moment from 'moment';
import queryString from 'query-string';

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key));
		}
	}
	str.sort();
	for (key = 0; key < str.length; key++) {
		sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
	}
	return sorted;
}

export const Vnpay = (req, res) => {
	var ipAddr =
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	console.log(req.body, 'data body::::');

	var tmnCode = config.get('vnp_TmnCode');
	var secretKey = config.get('vnp_HashSecret');
	var vnpUrl = config.get('vnp_Url');
	var returnUrl = config.get('vnp_ReturnUrl');

	var date = new Date();
	// data
	var createDate = dateFormat(date, 'yyyymmddHHmmss');
	var orderId = dateFormat(date, 'HHmmss');
	var amount = req.body.orderTotal;

	var vnp_Params = {};
	// end
	vnp_Params['vnp_Version'] = '2.1.0';
	vnp_Params['vnp_Command'] = 'pay';
	vnp_Params['vnp_TmnCode'] = tmnCode;
	vnp_Params['vnp_Amount'] = amount * 100;
	vnp_Params['vnp_BankCode'] = 'NCB';
	vnp_Params['vnp_CreateDate'] = createDate;
	// vnp_Params['vnp_Merchant'] = ''
	vnp_Params['vnp_Locale'] = 'vn';
	vnp_Params['vnp_CurrCode'] = 'VND';
	vnp_Params['vnp_TxnRef'] = orderId;
	vnp_Params['vnp_OrderInfo'] = 'Thanh_toan_don_hang';
	vnp_Params['vnp_OrderType'] = 'other';
	vnp_Params['vnp_ReturnUrl'] = `${returnUrl}?userId=${
		req.body.userId
	}&expire=${moment(new Date())
		.add(15, 'minute')
		.toDate()
		.getTime()}&fullname=${req.body.fullname}&email=${req.body.email}&address=${
		req.body.address
	}&phone=${req.body.phonenumber}&total=${req.body.orderTotal}&discount=${req.body.Discount}&isPaid=${req.body.isPaid}`;
	vnp_Params['vnp_IpAddr'] = ipAddr;

	vnp_Params = sortObject(vnp_Params);

	var signData = queryString.stringify(vnp_Params, { encode: false });
	var hmac = createHmac('sha512', secretKey);
	var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
	vnp_Params['vnp_SecureHash'] = signed;
	vnpUrl += '?' + queryString.stringify(vnp_Params, { encode: false });

	res.send(vnpUrl);
};
