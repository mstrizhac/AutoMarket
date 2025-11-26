import styles from './SearchFilters.module.css';
import Button from "../Button/Button.jsx";
import Select from "../Select/Select.jsx";

function SearchFilters() {
  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Фільтри пошуку</h2>

      <div className={styles.filterGrid}>
          <Select label={"Фільтри пошуку"}>
              <option value="">Всі марки</option>
              <option value="toyota">Toyota</option>
              <option value="bmw">BMW</option>
              <option value="mercedes">Mercedes-Benz</option>
              <option value="volkswagen">Volkswagen</option>
          </Select>

          <Select label={"Модель"}>
              <option value="">Всі моделі</option>
          </Select>

          <Button label={"Рік від"} type={"number"} placeHolder={"2020"}/>
          <Button label={"Рік до"} type={"number"} placeHolder={"2025"}/>
          <Button label={"Ціна від (€)"} type={"number"} placeHolder={"10000"}/>
          <Button label={"Ціна до (€)"} type={"number"} placeHolder={"50000"}/>
      </div>
      <button className={styles.button}>
        Застосувати фільтри
      </button>
    </div>
  );
}

export default SearchFilters;
