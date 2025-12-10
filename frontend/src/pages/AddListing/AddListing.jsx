import {useState} from 'react';
import styles from './AddListing.module.css';
import Input from "../../components/Input/Input.jsx";
import Select from "../../components/Select/Select.jsx";
import Images from "../../components/Images/Images.jsx";
import env from "../../env.js"
import {useNavigate} from "react-router-dom";
import {useCreateListing} from "../../hooks/useCreateListing.js";

export default function AddListing() {
    const ADD_CAR_ENDPOINT = "api/listing/add-car";

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        year: '',
        mileage: '',
        fuelType: '',
        transmission: 'Automatic',
        condition: "New",
        city: '',
        description: '',
    });

    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const { publishListing, loading, error } = useCreateListing();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => ({
                    file: file,
                    url: URL.createObjectURL(file)
                })
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

            <form onSubmit={async (e) => {
                e.preventDefault();
                await publishListing(formData, images)
                navigate("/")
            }} className={styles.form}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Основна інформація</h2>

                    <div className={styles.grid}>
                        <Input name={"title"} className={styles.inputGroup}
                               onChange={(e) => handleInputChange('title', e.target.value)} label={"Назва оголошення *"}
                               value={formData.title} type={"text"} placeHolder={"наприклад: Toyota Camry 2022"}/>
                        <Input name={"price"} className={styles.inputGroup}
                               onChange={(e) => handleInputChange('price', e.target.value)} label={"Ціна (€) *"}
                               value={formData.price} type={"number"} placeHolder={"25000"}/>
                        <Input name={"mileage"} className={styles.inputGroup}
                               onChange={(e) => handleInputChange('mileage', e.target.value)} label={"Пробіг (км) *"}
                               value={formData.mileage} type={"number"} placeHolder={"50000"}/>

                        <Select name={"year"} onChange={(e) => handleInputChange('year', e.target.value)} label={"Рік випуску *"}
                                value={formData.year}>
                            <option value="">Оберіть рік</option>
                            {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </Select>

                        <Select name={"fuelType"} onChange={(e) => handleInputChange('fuelType', e.target.value)} label={"Тип палива *"}
                                value={formData.fuelType}>
                            <option value="">Оберіть тип палива</option>
                            <option value="Gasoline">Бензин</option>
                            <option value="Diesel">Дизель</option>
                            <option value="Electric">Електро</option>
                            <option value="Hybrid">Гібрид</option>
                        </Select>

                        <Select name={"city"} onChange={(e) => handleInputChange('city', e.target.value)} label={"Місто *"}
                                value={formData.city}>
                            <option value="">Оберіть місто</option>
                            <option value="Kiev">Київ</option>
                            <option value="Lviv">Львів</option>
                            <option value="Odesa">Одеса</option>
                            <option value="Kcharkiv">Харків</option>
                            <option value="Dnipro">Дніпро</option>
                        </Select>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Фотографії (максимум 6)</h2>
                    <Images images={images} handleImageUpload={handleImageUpload} removeImage={removeImage}/>
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
                {/*<section className={styles.section}>*/}
                {/*    <h2 className={styles.sectionTitle}>Контактна інформація</h2>*/}

                    {/*<div className={styles.grid}>*/}
                    {/*  <div className={styles.inputGroup}>*/}
                    {/*    <label className={styles.label}>Телефон *</label>*/}
                    {/*    <input*/}
                    {/*      type="tel"*/}
                    {/*      placeholder="+380 67 123 45 67"*/}
                    {/*      value={formData.phone}*/}
                    {/*      onChange={(e) => handleInputChange('phone', e.target.value)}*/}
                    {/*      className={styles.input}*/}
                    {/*      required*/}
                    {/*    />*/}
                    {/*  </div>*/}

                    {/*  <div className={styles.inputGroup}>*/}
                    {/*    <label className={styles.label}>Email</label>*/}
                    {/*    <input*/}
                    {/*      type="email"*/}
                    {/*      placeholder="example@email.com"*/}
                    {/*      value={formData.email}*/}
                    {/*      onChange={(e) => handleInputChange('email', e.target.value)}*/}
                    {/*      className={styles.input}*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                {/*</section>*/}

                <div className={styles.buttons}>
                    <button type="button" className={styles.cancelButton} onClick={() => navigate("/")}>
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