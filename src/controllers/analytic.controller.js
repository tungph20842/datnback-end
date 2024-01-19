import Order, { orderStatus } from '../models/orders';

import User from '../models/users';
import Voucher from '../models/voucher';
import product from '../models/product';

export const analyticController = {
	/* filter money */
	filterMoney: async (req, res) => {
		try {
			const { startDate, endDate } = req.body;

			// Tạo bản sao của startDate và endDate
			const start = new Date(startDate);
			const end = new Date(endDate);
			start.setHours(0, 0, 0, 0);
			end.setHours(23, 59, 59, 999);

			// thống kê số tiền trong khoảng thời gian startDate và endDate
			const orderMoney = await Order.find({
				orderDate: { $gte: start, $lte: end },
			});
			let totalMoney = 0;
			orderMoney.forEach((order) => {
				totalMoney += order.orderTotal;
			});

			// Lấy các đơn hàng trong khoảng thời gian startDate và endDate
			const orders = await Order.find({
				orderDate: { $gte: start, $lte: end },
			});
			return res.status(200).json({ totalMoney, orders });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* analytic day */
	analyticDay: async (req, res) => {
		try {
			/* thống kê ra số tiền và đơn hàng trong ngày */
			const { date } = req.body;
			const start = new Date(date);
			const end = new Date(date);
			start.setHours(0, 0, 0, 0);
			end.setHours(23, 59, 59, 999);
			const orderMoney = await Order.find({
				orderDate: { $gte: start, $lte: end },
			});
			let totalMoney = 0;
			orderMoney.forEach((order) => {
				totalMoney += order.orderTotal;
			});
			const orders = await Order.find({
				orderDate: { $gte: start, $lte: end },
			});
			return res.status(200).json({ totalMoney, orders });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* analytic week */
	analyticWeek: async (req, res) => {
		try {
			const { month, year } = req.body;

			// Tạo một date đầu tiên của tháng và ngày cuối cùng của tháng
			const startDate = new Date(year, month - 1, 1); // month - 1 vì tháng bắt đầu từ 0
			const endDate = new Date(year, month, 0);

			const weeksInMonth = [];
			let weekStartDate = new Date(startDate);
			let weekEndDate = new Date(startDate);

			while (weekStartDate.getMonth() === month - 1) {
				// Đặt ngày kết thúc tuần
				weekEndDate = new Date(weekStartDate);
				weekEndDate.setDate(weekEndDate.getDate() + 6);
				if (weekEndDate > endDate) {
					weekEndDate = endDate;
				}
				weekEndDate.setHours(23, 59, 59, 999); // Kết thúc vào 23:59:59 của ngày cuối cùng

				// Thực hiện truy vấn để lấy các đơn hàng trong tuần
				const ordersOfWeek = await Order.find({
					orderDate: { $gte: weekStartDate, $lte: weekEndDate },
				});
				// Tính tổng số tiền của các đơn hàng trong tuần
				let totalMoneyOfWeek = 0;
				ordersOfWeek.forEach((order) => {
					totalMoneyOfWeek += order.orderTotal;
				});

				weeksInMonth.push({
					startDate: new Date(weekStartDate),
					endDate: new Date(weekEndDate),
					totalMoneyOfWeek,
					ordersOfWeek,
				});

				// Di chuyển đến ngày bắt đầu tuần tiếp theo
				weekStartDate.setDate(weekStartDate.getDate() + 7);
				weekStartDate.setHours(0, 0, 0, 0); // Bắt đầu từ 00:00:00 của ngày đầu tiên
			}

			return res.status(200).json({ weeksInMonth });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	/* thống kê số tiền theo từng tháng */
	analyticMonth: async (_, res) => {
		try {
			const today = new Date();
			const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
			const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

			Order.aggregate([
				{
					$match: {
						orderDate: {
							$gte: firstDayOfMonth,
							$lte: lastDayOfMonth,
						},
					},
				},
				{
					$group: {
						_id: null,
						totalAmount: { $sum: '$orderTotal' },
						count: { $sum: 1 },
					},
				},
			])
				.then((result) => {
					if (result.length > 0) {
						const { totalAmount, count } = result[0];
						return res.status(200).json({ totalAmount, count });
					} else {
						return res.status(200).json({ totalAmount: 0, count: 0 });
					}
				})
				.catch((error) => {
					console.error('Đã xảy ra lỗi:', error);
				});
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* thống kê số tiền theo từng năm */
	analyticYear: async (_, res) => {
		Order.aggregate([
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 },
				},
			},
		])
			.then((results) => {
				if (results.length > 0) {
					const data = results.map((result) => {
						return {
							_id: result._id,
							count: result.count,
						};
					});
					results.forEach((result) => {
						console.log(`${result._id}: ${result.count}`);
					});
					return res.status(200).json(data);
				} else {
					return res.status(200).json({ message: 'Không có đơn hàng nào' });
				}
			})
			.catch((error) => {
				return res.status(500).json({ error: error.message });
			});
	},

	/* thống kê số lượng trạng thái đơn hàng */
	analyticStatus: async (_, res) => {
		Order.aggregate([
			{
				$group: {
					_id: '$status', // Nhóm theo trạng thái
					count: { $sum: 1 }, // Đếm số lượng đơn hàng trong mỗi trạng thái
					totalAmount: { $sum: '$orderTotal' }, // Tính tổng số tiền trong mỗi trạng thái
				},
			},
		])
			.then((results) => {
				if (results.length > 0) {
					console.log('Thống kê số lượng đơn hàng và tổng số tiền theo từng trạng thái:');
					results.forEach((result) => {
						console.log(`${result._id}: ${result.count} - ${result.totalAmount}`);
					});
					return res.status(200).json(results);
				} else {
					return res.status(200).json({ message: 'Không có đơn hàng nào' });
				}
			})
			.catch((error) => {
				return res.status(500).json({ error: error.message });
			});
	},

	/* thống kê số lượng trái thái đơn hàng theo từng tuần */
	analyticStatusWeek: async (_, res) => {
		try {
			const today = new Date();
			const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
			const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

			const weeksInMonth = [];
			let weekStartDate = new Date(firstDayOfMonth);
			let weekEndDate = new Date(firstDayOfMonth);

			while (weekStartDate.getMonth() === today.getMonth()) {
				// Đặt ngày kết thúc tuần
				weekEndDate = new Date(weekStartDate);
				weekEndDate.setDate(weekEndDate.getDate() + 6);
				if (weekEndDate > lastDayOfMonth) {
					weekEndDate = lastDayOfMonth;
				}
				weekEndDate.setHours(23, 59, 59, 999); // Kết thúc vào 23:59:59 của ngày cuối cùng

				// Thực hiện truy vấn để lấy các đơn hàng trong tuần
				const ordersOfWeek = await Order.find({
					orderDate: { $gte: weekStartDate, $lte: weekEndDate },
				});
				// Tính tổng số tiền của các đơn hàng trong tuần
				let totalMoneyOfWeek = 0;
				ordersOfWeek.forEach((order) => {
					totalMoneyOfWeek += order.orderTotal;
				});

				weeksInMonth.push({
					startDate: new Date(weekStartDate),
					endDate: new Date(weekEndDate),
					totalMoneyOfWeek,
					ordersOfWeek,
				});

				// Di chuyển đến ngày bắt đầu tuần tiếp theo
				weekStartDate.setDate(weekStartDate.getDate() + 7);
				weekStartDate.setHours(0, 0, 0, 0); // Bắt đầu từ 00:00:00 của ngày đầu tiên
			}

			// Thống kê số lượng đơn hàng và tổng số tiền theo từng trạng thái
			const results = [];
			weeksInMonth.forEach((week) => {
				const { ordersOfWeek } = week;
				const status = {};
				ordersOfWeek.forEach((order) => {
					if (status[order.status]) {
						status[order.status].count += 1;
						status[order.status].totalAmount += order.orderTotal;
					}
					if (!status[order.status]) {
						status[order.status] = {
							count: 1,
							totalAmount: order.orderTotal,
						};
					}
				});
				results.push({
					week,
					status,
				});
			});
			return res.status(200).json(results);
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* time */
	analyticDayTime: () => {
		const today = new Date();
		// const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		// const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
		const startOfDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)); // Chuyển sang múi giờ UTC
		const endOfDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)); // Chuyển sang múi giờ UTC
		return { startOfDay, endOfDay };
	},

	analyticWeekTime: () => {
		const today = new Date();
		const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // Ngày đầu tuần
		const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay())); // Ngày cuối tuần
		return { startOfWeek, endOfWeek };
	},

	analyticMonthTime: () => {
		const today = new Date();
		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Ngày đầu tháng
		const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Ngày cuối tháng
		return { startOfMonth, endOfMonth };
	},

	analyticYearTime: () => {
		const today = new Date();
		const startOfYear = new Date(today.getFullYear(), 0, 1); // Ngày đầu năm
		const endOfYear = new Date(today.getFullYear(), 11, 31); // Ngày cuối năm
		return { startOfYear, endOfYear };
	},

	/* order status */
	getOrderStatus: async (start, end, status) => {
		const results = await Order.aggregate([
			{
				$match: {
					orderDate: { $gte: start, $lte: end },
					status: status,
				},
			},
			{
				$group: {
					_id: null,
					totalAmount: { $sum: '$orderTotal' },
					count: { $sum: 1 },
					orders: { $push: '$$ROOT' }, // Lưu thông tin đơn hàng
				},
			},
		]);
		return results;
	},

	/* get order status pending */
	getOrderStatusPending: async (_, res) => {
		try {
			/* day */
			const { startOfDay, endOfDay } = analyticController.analyticDayTime();
			const resultDay = await analyticController.getOrderStatus(startOfDay, endOfDay, orderStatus.PENDING);

			/* week */
			const { startOfWeek, endOfWeek } = analyticController.analyticWeekTime();
			const resultWeek = await analyticController.getOrderStatus(startOfWeek, endOfWeek, orderStatus.PENDING);

			/* month */
			const { startOfMonth, endOfMonth } = analyticController.analyticMonthTime();
			const resultMonth = await analyticController.getOrderStatus(startOfMonth, endOfMonth, orderStatus.PENDING);

			/* year */
			const { startOfYear, endOfYear } = analyticController.analyticYearTime();
			const resultYear = await analyticController.getOrderStatus(startOfYear, endOfYear, orderStatus.PENDING);

			return res.status(200).json({ day: resultDay, week: resultWeek, month: resultMonth, year: resultYear });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* get order status processing */
	getOrderStatusProcessing: async (_, res) => {
		try {
			/* day */
			const { startOfDay, endOfDay } = analyticController.analyticDayTime();
			const resultDay = await analyticController.getOrderStatus(startOfDay, endOfDay, orderStatus.PROCESSING);

			/* week */
			const { startOfWeek, endOfWeek } = analyticController.analyticWeekTime();
			const resultWeek = await analyticController.getOrderStatus(startOfWeek, endOfWeek, orderStatus.PROCESSING);

			/* month */
			const { startOfMonth, endOfMonth } = analyticController.analyticMonthTime();
			const resultMonth = await analyticController.getOrderStatus(startOfMonth, endOfMonth, orderStatus.PROCESSING);

			/* year */
			const { startOfYear, endOfYear } = analyticController.analyticYearTime();
			const resultYear = await analyticController.getOrderStatus(startOfYear, endOfYear, orderStatus.PROCESSING);

			return res.status(200).json({ day: resultDay, week: resultWeek, month: resultMonth, year: resultYear });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* get order status delivery */
	getOrderStatusDelivery: async (_, res) => {
		try {
			/* day */
			const { startOfDay, endOfDay } = analyticController.analyticDayTime();
			const resultDay = await analyticController.getOrderStatus(startOfDay, endOfDay, orderStatus.ONDELIVERY);

			/* week */
			const { startOfWeek, endOfWeek } = analyticController.analyticWeekTime();
			const resultWeek = await analyticController.getOrderStatus(startOfWeek, endOfWeek, orderStatus.ONDELIVERY);

			/* month */
			const { startOfMonth, endOfMonth } = analyticController.analyticMonthTime();
			const resultMonth = await analyticController.getOrderStatus(startOfMonth, endOfMonth, orderStatus.ONDELIVERY);

			/* year */
			const { startOfYear, endOfYear } = analyticController.analyticYearTime();
			const resultYear = await analyticController.getOrderStatus(startOfYear, endOfYear, orderStatus.ONDELIVERY);

			return res.status(200).json({ day: resultDay, week: resultWeek, month: resultMonth, year: resultYear });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* get order status Complete */
	getOrderStatusComplete: async (_, res) => {
		try {
			/* day */
			const { startOfDay, endOfDay } = analyticController.analyticDayTime();
			const resultDay = await analyticController.getOrderStatus(startOfDay, endOfDay, orderStatus.COMPLETED);

			/* week */
			const { startOfWeek, endOfWeek } = analyticController.analyticWeekTime();
			const resultWeek = await analyticController.getOrderStatus(startOfWeek, endOfWeek, orderStatus.COMPLETED);

			/* month */
			const { startOfMonth, endOfMonth } = analyticController.analyticMonthTime();
			const resultMonth = await analyticController.getOrderStatus(startOfMonth, endOfMonth, orderStatus.COMPLETED);

			/* year */
			const { startOfYear, endOfYear } = analyticController.analyticYearTime();
			const resultYear = await analyticController.getOrderStatus(startOfYear, endOfYear, orderStatus.COMPLETED);

			return res.status(200).json({ day: resultDay, week: resultWeek, month: resultMonth, year: resultYear });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* get order status Cancelled */
	getOrderStatusCancelled: async (_, res) => {
		try {
			/* day */
			const { startOfDay, endOfDay } = analyticController.analyticDayTime();
			const resultDay = await analyticController.getOrderStatus(startOfDay, endOfDay, orderStatus.CANCELLED);

			/* week */
			const { startOfWeek, endOfWeek } = analyticController.analyticWeekTime();
			const resultWeek = await analyticController.getOrderStatus(startOfWeek, endOfWeek, orderStatus.CANCELLED);

			/* month */
			const { startOfMonth, endOfMonth } = analyticController.analyticMonthTime();
			const resultMonth = await analyticController.getOrderStatus(startOfMonth, endOfMonth, orderStatus.CANCELLED);

			/* year */
			const { startOfYear, endOfYear } = analyticController.analyticYearTime();
			const resultYear = await analyticController.getOrderStatus(startOfYear, endOfYear, orderStatus.CANCELLED);

			return res.status(200).json({ day: resultDay, week: resultWeek, month: resultMonth, year: resultYear });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* thống kê số lượng các loại */
	counts: async (_, res) => {
		try {
			const productCount = await product.countDocuments();
			const userCount = await User.countDocuments();
			const voucherCount = await Voucher.countDocuments();

			/* map array */
			const counts = [
				{ title: 'Sản phẩm', value: productCount },
				{ title: 'Người dùng', value: userCount },
				{ title: 'Voucher', value: voucherCount },
			];

			return res.status(200).json(counts);
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* thống kê số lượng sản phẩm trong kho */
	countProducts: async (_, res) => {
		try {
			const productCount = await product.countDocuments();
			return res.status(200).json({ productCount });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* thống kê số lượng người dùng */
	countUsers: async (_, res) => {
		try {
			const userCount = await User.countDocuments();
			return res.status(200).json({ userCount });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	/* thống kê số lượng voucher */
	countVouchers: async (_, res) => {
		try {
			const voucherCount = await Voucher.countDocuments();
			return res.status(200).json({ voucherCount });
		} catch (error) {
			return res.status(500).json({ error });
		}
	},

	getTop10Products: async (req, res, status) => {
		try {
			const result = await Order.aggregate([
				{
					$match: { status },
				},
				{
					$unwind: '$orderDetails',
				},
				{
					$group: {
						_id: '$orderDetails.productId',
						totalQuantity: { $sum: '$orderDetails.quantity' },
					},
				},
				{
					$sort: { totalQuantity: -1 },
				},
				{
					$limit: 10,
				},
			]);
			const productIds = result.map((item) => item._id);
			const topProducts = await product.find({ _id: { $in: productIds } });
		// console.log(topProducts)
			const data = topProducts.map((product) => {
				const item = result.find((item) => item._id.toString() === product._id.toString());
				return {
					_id: product._id,
					name: product.name,
					img: product.img,
					totalQuantity: item.totalQuantity,
				};
			});
			console.log(data);
			return data;
		} catch (error) {
			console.error('Error:', error);
		}
	},

	/* getTop10CompletedProducts */
	getTopProducts: async (req, res) => {
		const resultCompleted = await analyticController.getTop10Products(req, res, orderStatus.COMPLETED);
		const resultCancelled = await analyticController.getTop10Products(req, res, orderStatus.CANCELLED);
		return res.status(200).json({
			completed: resultCompleted,
			cancelled: resultCancelled,
		});
	},

	/* get top 10 week */
	getTopProduct: async (timeUnit, status) => {
		try {
			const result = await Order.aggregate([
				{
					$match: { status },
				},
				{
					$unwind: '$orderDetails',
				},
				{
					$group: {
						_id: {
							productId: '$orderDetails.productId',
							[timeUnit]: { [`$${timeUnit}`]: '$orderDate' },
						},
						totalQuantity: { $sum: '$orderDetails.quantity' },
					},
				},
				
				{
					$sort: { totalQuantity: -1 },
				},
				{
					$group: {
						_id: `$_id.${timeUnit}`,
						topProducts: {
							$push: {
								productId: '$_id.productId',
								totalQuantity: '$totalQuantity',
							},
						},
					},
				},
				{
					$project: {
						_id: 0,
						[timeUnit]: '$_id',
						topProducts: { $slice: ['$topProducts', 10] },
					},
				},
			]);

			const productIds = result[0].topProducts.map((item) => item.productId);
			const topProducts = await product.find({ _id: { $in: productIds } });
			const data = topProducts.map((product) => {
				const item = result[0].topProducts.find((item) => item.productId.toString() === product._id.toString());
				return {
					_id: product._id,
					name: product.name,
					img: product.img,
					totalQuantity: item.totalQuantity,
				};
			});
			return data;
		} catch (error) {
			console.error('Error:', error);
		}
	},

	// Call the function to get the top products by week
	getTopProductsByWeek: async (req, res) => {
		const resultCompleted = await analyticController.getTopProduct('isoWeek', orderStatus.COMPLETED);
		const resultCancelled = await analyticController.getTopProduct('isoWeek', orderStatus.CANCELLED);
		return res.status(200).json({ completed: resultCompleted, cancelled: resultCancelled });
	},

	// Call the function to get the top products by month
	getTopProductsByMonth: async (req, res) => {
		const resultCompleted = await analyticController.getTopProduct('month', orderStatus.COMPLETED);
		const resultCancelled = await analyticController.getTopProduct('month', orderStatus.CANCELLED);
		return res.status(200).json({ completed: resultCompleted, cancelled: resultCancelled });
	},

	// Call the function to get the top products by year
	getTopProductsByYear: async (req, res) => {
		const resultCompleted = await analyticController.getTopProduct('year', orderStatus.COMPLETED);
		const resultCancelled = await analyticController.getTopProduct('year', orderStatus.CANCELLED);
		return res.status(200).json({ completed: resultCompleted, cancelled: resultCancelled });
	},
};
