import { useState } from 'react';
import styles from './AddListing.module.css';
import Button from "../../components/Button/Button.jsx";
import Select from "../../components/Select/Select.jsx";
import Images from "../../components/Images/Images.jsx";

export default function AddListing({changePage}) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    year: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    condition: '',
    location: '',
    description: '',
    phone: '',
    email: ''
  });

  const [images, setImages] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file, index) =>
        URL.createObjectURL(file)
      );
      setImages(prev => [...prev, ...newImages].slice(0, 6));
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Додати оголошення</h1>
        <p className={styles.subtitle}>Заповніть форму щоб додати ваш автомобіль на продаж</p>
      </div>

      <form onSubmit={(e) => {
          changePage("home")
      }} className={styles.form}>
        {/* Основна інформація */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Основна інформація</h2>

          <div className={styles.grid}>
              <Button className={styles.inputGroup} onChange={(e) => handleInputChange('title', e.target.value)} label={"Назва оголошення *"} value={formData.title} type={"text"} placeHolder={"наприклад: Toyota Camry 2022"}/>
              <Button className={styles.inputGroup} onChange={(e) => handleInputChange('price', e.target.value)} label={"Ціна (€) *"} value={formData.price} type={"number"} placeHolder={"25000"}/>
              <Button className={styles.inputGroup} onChange={(e) => handleInputChange('mileage', e.target.value)} label={"Пробіг (км) *"} value={formData.mileage} type={"number"} placeHolder={"50000"}/>

              <Select onChange={(e) => handleInputChange('year', e.target.value)} label={"Рік випуску *"} value={formData.year}>
                  <option value="">Оберіть рік</option>
                  {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                  ))}
              </Select>

              <Select onChange={(e) => handleInputChange('fuelType', e.target.value)} label={"Тип палива *"} value={formData.fuelType}>
                      <option value="">Оберіть тип палива</option>
                      <option value="gasoline">Бензин</option>
                      <option value="diesel">Дизель</option>
                      <option value="electric">Електро</option>
                      <option value="hybrid">Гібрид</option>
              </Select>

              <Select onChange={(e) => handleInputChange('location', e.target.value)} label={"Місто *"} value={formData.location}>
                  <option value="">Оберіть місто</option>
                  <option value="Київ">Київ</option>
                  <option value="Львів">Львів</option>
                  <option value="Одеса">Одеса</option>
                  <option value="Харків">Харків</option>
                  <option value="Дніпро">Дніпро</option>
              </Select>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Фотографії (максимум 6)</h2>
            <Images images={images} handleImageUpload={handleImageUpload} removeImage={removeImage} />
        </section>

        {/* Опис */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Опис</h2>
          <textarea
            placeholder="Опишіть ваш автомобіль: комплектація, стан, особливості..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={styles.textarea}
            rows={5}
          />
        </section>

        {/* Контактна інформація */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Контактна інформація</h2>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Телефон *</label>
              <input
                type="tel"
                placeholder="+380 67 123 45 67"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </section>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancelButton} onClick={() => changePage("home")}>
            Скасувати
          </button>
          <button type="submit" className={styles.submitButton}>
            Опублікувати оголошення
          </button>
        </div>
      </form>
    </div>
  );
}