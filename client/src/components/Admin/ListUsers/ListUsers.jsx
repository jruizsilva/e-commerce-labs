import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, changeStateUser, getSalesPayable } from "../../../actions/index.js";
import MessageSuccess from "../../MessageSuccess/MessageSuccess.js";
import ModalEdit from "../ModalEdit/ModalEdit.jsx";

import ModalPayment from "../ModalPayment/ModalPayment.jsx";
import  style  from "./ListUsers.module.css";
import ModalEditFormik from "../ModalEditFormik/ModalEditFormik.js";

  const ListUsers = () => {
  const { user, allUsers } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);
  const [userModal, setUserModal] = useState({});
  const [productsG, setProductsG] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllUsers());
  },[dispatch])

  function showModal(opc, userToModal = null) {
    if (userToModal) setUserModal(userToModal);
    else setUserModal({});
    setShow(opc);
  }
  function showModalP(opc){
    setShowP(opc);
  }

  function changeState(id, state){
    if(window.confirm('Sure you want to change user status')){
      dispatch(changeStateUser(id, state));
    }
  }

  
  function paymentOption(products){
    let idsProduct = products.map((val)=>val.id);
    dispatch(getSalesPayable(idsProduct));
    setProductsG(products);
    setShowP(true);
  }

  return (
    <main className={style.main}>
      <section className={style.sectionOne}>
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>State</div>
        <div>Opcions</div>
      </section>
      {allUsers &&
        allUsers.map((val) => {
          return (
            <div key={val.id}>
              {user.id != val.id && (
                <>
                  <section className={style.section} key={val.id}>
                    <div>{val.name}</div>
                    <div>{val.email} </div>
                    <div>{val.role} </div>
                    <div>{val.state} </div>
                    <div> </div>
                    <div className={style.contButtons}>
                      <button onClick={()=>showModal(true, val)}>E</button>
                      <button onClick={()=>{changeState(val.id, val.state)}}>D</button>
                      <button onClick={()=>{paymentOption(val.products)}}>P</button>
                    </div>
                  </section>
                </>
              )}
            </div>
          );
        })}
      {show && userModal && (
        // <ModalEdit show={show} onClose={showModal} user={userModal} />
        <>
        <ModalEditFormik show={show} onClose={showModal} user={userModal} />
        <ModalPayment show={showP} onClose={showModalP} products={productsG} />
        {registerSuccessMessage && <MessageSuccess msg={registerSuccessMessage}/>}
        </>
      )}
    </main>
  );
};

export default ListUsers;
