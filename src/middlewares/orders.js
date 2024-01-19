const orderStatus = {
  PENDING:'chờ duyệt',
  PROCESSING:'lấy hàng',
  ONDELIVERY:'đang giao',
  COMPLETED:'giao hàng thành công',
  CANCELLED:'Hủy đơn hàng'
};
  export const validateOrder =(req,res,next)=>{
    const {status,address,orderTotal} =req.body
    if( !address ||!orderTotal){
        return res.status(400).json({error:"Please provide all required fields."})
    } 
    if(status && !orderStatus.includes(status)){
        return res.status(400).json({error:`Status must be one of ${orderStatus.join(', ')}`})
    }
    next();
  }