import style from "./Header.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../Logo/Logo";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import MessageError from "../MessageError/MessageError";
import MessageSuccess from "../MessageSuccess/MessageSuccess";
import { useSelector } from "react-redux";

const Header = () => {
  const {
    successCreationMessage,
    successEditMessage,
    registerErrorMessage,
    cartSuccessMessage,
    cartErrorMessage,
    restorePasswordSuccessMessage,
    restorePasswordErrorMessage,
  } = useSelector((state) => state);
  return (
    <>
      <div className={style.headerContainer}>
        <Logo />
        <SearchBar />
        <NavbarMenu />
      </div>

      {successCreationMessage && (
        <MessageSuccess msg={successCreationMessage} />
      )}
      {successEditMessage && <MessageSuccess msg={successEditMessage} />}
      {registerErrorMessage && <MessageError msg={registerErrorMessage} />}
      {cartSuccessMessage && <MessageSuccess msg={cartSuccessMessage} />}
      {cartErrorMessage && <MessageError msg={cartErrorMessage} />}
      {restorePasswordSuccessMessage && (
        <MessageSuccess msg={restorePasswordSuccessMessage} />
      )}
      {restorePasswordErrorMessage && (
        <MessageError msg={restorePasswordErrorMessage} />
      )}
    </>
  );
};

export default Header;
