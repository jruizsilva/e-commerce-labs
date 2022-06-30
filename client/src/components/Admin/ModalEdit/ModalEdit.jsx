import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../actions/index.js";
import style from "./ModalEdit.module.css";

export default function ModalEdit({ show, onClose, user }) {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    const { id, name, email, address, phone, bank_account, role } = user;

    setForm({
      id,
      name,
      email,
      address,
      phone,
      bank_account,
      password: "",
      role,
    });
  }, [user]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    dispatch(updateUser(form));
    onClose(false);
  }

  if (!show) return null;
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h1>User edit</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={style.modalBody}>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={style.inpModal}
              name="name"
              type="text"
              placeholder="Name"
              required
              defaultValue={form.name}
            />
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={style.inpModal}
              name="email"
              type="email"
              placeholder="Email"
              required
              defaultValue={form.email}
            />
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={style.inpModal}
              name="address"
              type="text"
              placeholder="Address"
              defaultValue={form.address}
            />
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={style.inpModal}
              name="phone"
              type="number"
              placeholder="phone"
              defaultValue={form.phone}
            />
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={style.inpModal}
              name="bank_account"
              type="text"
              placeholder="bank_account"
              defaultValue={form.bank_account}
            />
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={style.inpModal}
              name="password"
              type="text"
              placeholder="password"
              defaultValue={form.password}
            />
            <select
              onChange={(e) => {
                handleChange(e);
              }}
              className={style.inpModal}
              name="role"
              required
              value={form.role}
            >
              <option value="">Role</option>
              <option value="admin">Admin</option>
              <option value="user">Regular user</option>
            </select>
          </div>
          <div className={style.modalFooter}>
            <button className={style.btnSend}>Send</button>
            <button
              type="button"
              className={style.btnCancel}
              onClick={() => {
                onClose(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
