import { useState } from "react";

export default function useModal(initialState) {
  const [isOpenModal, setIsOpenModal] = useState(initialState);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return [isOpenModal, openModal, closeModal];
}
