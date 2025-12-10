import styles from './SearchFilters.module.css';
import Input from "../Input/Input.jsx";
import Select from "../Select/Select.jsx";

function SearchFilters({cars}) {
  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Фільтри пошуку</h2>

      <div className={styles.filterGrid}>
          <Input label={"Рік від"} type={"number"} placeHolder={"2020"}/>
          <Input label={"Рік до"} type={"number"} placeHolder={"2025"}/>
          <Input label={"Ціна від (€)"} type={"number"} placeHolder={"10000"}/>
          <Input label={"Ціна до (€)"} type={"number"} placeHolder={"50000"}/>
      </div>
      <button className={styles.button} onClick={cars.sort}>
        Застосувати фільтри
      </button>
    </div>
  );
}

export default SearchFilters;
