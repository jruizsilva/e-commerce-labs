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
    registerSuccessMessage,
    cartSuccessMessage,
    cartErrorMessage,
    restorePasswordSuccessMessage,
    restorePasswordErrorMessage,
    addReviewSuccessMessage,
    addReviewErrorMessage,
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
      {registerSuccessMessage && <MessageSuccess msg={registerSuccessMessage} />}
      {cartSuccessMessage && <MessageSuccess msg={cartSuccessMessage} />}
      {cartErrorMessage && <MessageError msg={cartErrorMessage} />}
      {restorePasswordSuccessMessage && (
        <MessageSuccess msg={restorePasswordSuccessMessage} />
      )}
      {restorePasswordErrorMessage && (
        <MessageError msg={restorePasswordErrorMessage} />
      )}
      {addReviewSuccessMessage && (
        <MessageSuccess msg={addReviewSuccessMessage} />
      )}
      {addReviewErrorMessage && (
        <MessageError msg={addReviewErrorMessage} />
      )}
    </>
  );
};

export default Header;
