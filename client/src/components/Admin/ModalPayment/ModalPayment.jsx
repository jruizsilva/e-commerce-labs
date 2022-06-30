import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageError from "../../MessageError/MessageError.js";
import style from './ModalPayment.module.css'

export default function ModalPayment({show, onClose, products}){
  const [form, setForm] = useState({});
  const [messageError, setMessageError] = useState("");
  const dispatch = useDispatch();
  const {salesPayable} = useSelector((state)=>state);
  let productDetail = null;
  
  useEffect(()=>{
    console.log(products);
  }, [products])

  useEffect(()=>{
    setMessageError("There are no pending payments");
    setTimeout(()=>{
      setMessageError("");
    }, 2000)
  },[salesPayable])

  if (show && !salesPayable[0] && messageError) return <MessageError msg={messageError}/>
  if(!show || !salesPayable[0]) return null
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h1>Payment users</h1>
          <button className={style.btnCancel} onClick={()=>{onClose(false)}}>x</button>
        </div>
        <div className={style.modalBody}>
            {salesPayable && salesPayable.map((val)=>{
              {productDetail = products.find((v)=>v.id==val.productId)}
              return (
                <div className={style.containDetailOrder} key={val.id}>
                  <div>
                    {productDetail && productDetail.name}
                  </div>
                  <div>{val.quantity}</div>
                  <div>{val.totalprice}</div>
                  <div>
                    <input type="checkbox" />
                  </div>
                </div>
              )
            })}
        </div>
        <div className={style.modalFooter}>
          <h3><b>Total: </b> 30000</h3>
          <button className={style.btnSend}>Pay</button>
        </div>
      </div>
    </div>
  )
}