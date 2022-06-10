import style from './Header.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../Logo/Logo';
import NavbarMenu from '../NavbarMenu/NavbarMenu';

const Header = () => {
  return (
    <div className={style.headerContainer}>
      <Logo />
      <SearchBar />
      <NavbarMenu />
    </div>
  )
}

export default Header;