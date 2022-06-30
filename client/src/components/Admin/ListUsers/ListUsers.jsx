import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../actions/index.js";
import ModalEdit from "../ModalEdit/ModalEdit.jsx";
import ModalEditFormik from "../ModalEditFormik/ModalEditFormik.js";
import style from "./ListUsers.module.css";

const ListUsers = () => {
  const { user, allUsers } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const [userModal, setUserModal] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function showModal(opc, userToModal = null) {
    if (userToModal) setUserModal(userToModal);
    else setUserModal({});
    setShow(opc);
  }

  return (
    <main className={style.main}>
      <section className={style.sectionOne}>
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>State</div>
        <div>Debt</div>
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
                      <button onClick={() => showModal(true, val)}>E</button>
                      <button onClick={() => {}}>D</button>
                      <button onClick={() => {}}>P</button>
                    </div>
                  </section>
                </>
              )}
            </div>
          );
        })}
      {show && userModal && (
        // <ModalEdit show={show} onClose={showModal} user={userModal} />
        <ModalEditFormik show={show} onClose={showModal} user={userModal} />
      )}
    </main>
  );
};

export default ListUsers;
