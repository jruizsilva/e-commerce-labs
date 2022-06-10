import style from './Header.module.css';
import SearchBar from '../SearchBar/SearchBar';

const Header = ()=>{
  return(
    <div className={style.headerContainer}>
       Header
       <SearchBar/>
    </div>
  )
}

export default Header;