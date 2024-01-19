const a = {
    "vnp_TmnCode": "I132OD5T",
    "vnp_HashSecret":"MLWCWESVUEUERXAMZZPOEPXRZYGLYIDZ",
    "vnp_Url":"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    "vnp_ReturnUrl":"http://localhost:5173/successful"
}


const config = {
    get: (key) => {
        return a[key];
    }
}
export default config