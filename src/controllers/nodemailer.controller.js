import nodemailer from 'nodemailer';


export const sendMail = async (data) => {
	const transporter = nodemailer.createTransport({
		// config mail server
		service: 'Gmail',
		auth: {
			user: 'dasuabest@gmail.com',
			pass: 'qcgsbmwlkzrmvjzt',
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	const totalAmount = data.orderDetails.reduce((acc, product) => acc + product.price * product.quantity, 0);
	const mainOptions = {
		// thiết lập đối tượng, nội dung gửi mail
		from: data.fullname,
		to: data.email,
		subject: 'cảm ơn bạn đã đặt hàng tại Cửa hàng chúng tôi',
		text: 'Hi!',
		html: /* html */ `
			<div class="col-md-12">
				<div class="row">
					<div class="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
						<div class="row">
							<div class="receipt-header receipt-header-mid">
								<div class="col-xs-8 col-sm-8 col-md-8 text-left">
									<div class="receipt-right">
										<h3><b>Dear ${data.fullname} </b></h3>
										<p><b>Email:</b> ${data.email}</p>
										<p><b>Số Điện thoại :</b> ${data.phonenumber}</p>
										<p><b>Mã hóa đơn :</b> ${data._id}</p>
										<p><b>Trạng thái đơn hàng:</b> ${data.status}</p>
										<p><b>Thanh toán:</b> ${data.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
										<p><b>Địa chỉ :</b>${data?.address}</p>
									</div>
								</div>
								<table style="border: 1px solid #ccc; border-collapse: collapse; margin: 0; padding: 0; width: 100%; table-layout: fixed;">
									<caption style="font-size: 1.5em; margin: .5em 0 .75em;"><h3>HÓA ĐƠN ĐẶT HÀNG</h3></caption>
									<thead>
										<tr style="background-color: #f8f8f8; border: 1px solid #ddd; padding: .35em;">
											<th style="padding: .625em; text-align: center; font-size: .85em; letter-spacing: .1em; text-transform: uppercase;">Số thứ tự</th>
											<th style="padding: .625em; text-align: center; font-size: .85em; letter-spacing: .1em; text-transform: uppercase;">Sản phẩm</th>
											<th style="padding: .625em; text-align: center; font-size: .85em; letter-spacing: .1em; text-transform: uppercase;">Hình ảnh</th>
											<th style="padding: .625em; text-align: center; font-size: .85em; letter-spacing: .1em; text-transform: uppercase;">Số lượng</th>
											<th style="padding: .625em; text-align: center; font-size: .85em; letter-spacing: .1em; text-transform: uppercase;">Giá tiền</th>
										</tr>
									</thead>
									<tbody>
      ${data.orderDetails.map(
			(product, index) => /*html*/ `
          <tr style="background-color: #f8f8f8; border: 1px solid #ddd; padding: .35em;">
		  <tr style="background-color: #f8f8f8; border: 1px solid #ddd; padding: .35em;">
		  <td style="padding: .625em; text-align: center;" data-label="Account">${index + 1}</td>
		  <td style="padding: .625em; text-align: center;" data-label="Due Date">${product.name}</td>
		  <td style="padding: .625em; text-align: center;" data-label="Amount">
  <img src="${product.img[0]}" alt="" style="width: 100px; height: 100px;" />
</td>
		
		  <td style="padding: .625em; text-align: center;" data-label="Amount">${product.quantity}</td>
		  <td style="padding: .625em; text-align: center;" data-label="Period">${product.price * product.quantity}</td>
		  
	  </tr>
          </tr>
        `,
		)}
      <!-- Ô lớn ghi tổng tiền -->
      <tr style="background-color: #f8f8f8; border: 1px solid #ddd; padding: .35em;">
        <td colspan="4" style="padding: .625em; text-align: right; font-weight: bold;" data-label="Total">Tổng tiền:</td>
        <td style="padding: .625em; text-align: center;" data-label="TotalAmount">${totalAmount}</td>
      </tr>
	  <tr style="background-color: #f8f8f8; border: 1px solid #ddd; padding: .35em;">
	  <td colspan="4" style="padding: .625em; text-align: right; font-weight: bold;" data-label="Total">Giảm giá:</td>
	  <td style="padding: .625em; text-align: center;" data-label="TotalAmount">${data.Discount}</td>
	</tr>
	<tr style="background-color: #f8f8f8; border: 1px solid #ddd; padding: .35em;">
	<td colspan="4" style="padding: .625em; text-align: right; font-weight: bold;" data-label="Total">Thành tiền:</td>
	<td style="padding: .625em; text-align: center;" data-label="TotalAmount">${totalAmount - data.Discount}</td>
  </tr>
    </tbody>
								</table>
							</div>
						</div>
						<div class="row">
							<div class="receipt-header receipt-header-mid receipt-footer">
								<div class="col-xs-8 col-sm-8 col-md-8 text-left">
									<div class="receipt-right">
										<h4 style="color: rgb(140, 140, 140);">Cảm ơn bạn rất nhiều 💕💕💕!</h4>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
			`,
	};

	await transporter.sendMail(mainOptions);
};
export const sendMail1 = async (data) => {
	const transporter = nodemailer.createTransport({
		// config mail server
		service: 'Gmail',
		auth: {
			user: 'dasuabest@gmail.com',
			pass: 'qcgsbmwlkzrmvjzt',

		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	const mainOptions = {
		from: data.fullname,
		to: data.email,
		subject: 'Cảm ơn bạn đã liên hệ',
		text: `Xin chào ${data.name},\n\nCảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ xem xét và trả lời sớm nhất có thể.\n\nTrân trọng,\nĐội ngũ hỗ trợ`,
		html: `
		  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h2 style="color: #333; text-align: center;">Bạn có một tin nhắn mới</h2>
			<ul style="list-style-type: none; padding: 0;">
			  <li>
				<strong>Tên:</strong> ${data.name}
			  </li>
			  <li>
				<strong>Email:</strong> ${data.email}
			  </li>
			  <li>
				<strong>Số điện thoại:</strong> ${data.phonenumber}
			  </li>
			  <li>
				<strong>Nội dung:</strong> ${data.description}
			  </li>
			  <li>
				<strong>Trạng thái:</strong> ${data.status}
			  </li>
			  <li>
				<strong style="color: red; font-size: 18px;">Trả lời:</strong> ${data.traloi}
			  </li>
			</ul>
		  </div>
		  
		`,
	};


	await transporter.sendMail(mainOptions);
};
export const sendMail2 = async (data) => {
	const transporter = nodemailer.createTransport({
		// config mail server
		service: 'Gmail',
		auth: {
			user: 'dasuabest@gmail.com',
			pass: 'qcgsbmwlkzrmvjzt',

		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	const mainOptions = {
		from: data.fullname,
		to: data.email,
		subject: 'Cảm ơn bạn đã liên hệ',
		text: `Xin chào ${data.fullname},\n\nCảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ xem xét và trả lời sớm nhất có thể.\n\nTrân trọng,\nĐội ngũ hỗ trợ`,
		html: `Mã xác nhận của bạn là: ${confirmationCode}`,
	};


	await transporter.sendMail(mainOptions);
};
