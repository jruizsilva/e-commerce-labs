import style from "./Header.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../Logo/Logo";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import Message from "../Message/Message";
import { useSelector } from "react-redux";

const Header = () => {
  const { successCreationMessage, successEditMessage } = useSelector(
    (state) => state
  );
  return (
    <>
      <div className={style.headerContainer}>
        <Logo />
        <SearchBar />
        <NavbarMenu />
      </div>
      {successCreationMessage && (
        <Message success={true} msg={successCreationMessage} />
      )}
      {successEditMessage && (
        <Message success={true} msg={successEditMessage} />
      )}
    </>
  );
};

export default Header;
