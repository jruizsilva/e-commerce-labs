import style from './Sort.module.css';
import { sortByValue } from '../../actions/index';
import { useDispatch } from 'react-redux';

const Sort = () => {
  const dispatch = useDispatch();

  function handleSortValue({ target: { value } }) {
    dispatch(sortByValue(value));
  }

  return (
    <div className={style.sortContainer}>
      <label>Sort by: </label>
      <select id="sortSelect" onChange={e => handleSortValue(e)}>
        <option value="sortSelected" hidden>
          Sort
        </option>
        <option value="AZ">A to Z</option>
        <option value="ZA">Z to A</option>
        <option value="LESS">Less price</option>
        <option value="HIGH">Higher price</option>
      </select>
    </div>
  );
};

export default Sort;
