import {useState} from 'react';
import styles from './Auth.module.css';
import Input from "../../components/Input/Input.jsx";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Auth({type}) {
    const navigate = useNavigate();

    const { register, login } = useAuth();

    const isRegister = type === 'register';
    const [formData, setFormData] = useState({
        mail: '',
        password: '',
        phone: '',
        name: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Вхід</h1>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                if (isRegister) {
                    register(formData.mail, formData.password, formData.name, formData.phone).then(success => {
                        if (success) navigate('/');
                    })
                } else {
                    login(formData.mail, formData.password).then(success => {
                        if (success) navigate('/');
                    })
                }
                return false;
            }} className={styles.form}>
                <section className={styles.section}>
                    {isRegister
                        && (<Input onChange={(e) => handleInputChange('phone', e.target.value)} label={"Мобільний"}
                                   value={formData.phone} type={"phone"}/>)
                    }

                    {isRegister
                        && (<Input onChange={(e) => handleInputChange('name', e.target.value)} label={"Ім'я"}
                                   value={formData.name}/>)
                    }

                    <Input onChange={(e) => handleInputChange('mail', e.target.value)} label={"Пошта"}
                           value={formData.title} type={"email"} placeHolder={"example@gmail.com"}/>
                    <Input onChange={(e) => handleInputChange('password', e.target.value)} label={"Пароль"}
                           value={formData.password} type={"password"}/>


                </section>

                <div className={styles.buttons}>
                    <button type="submit" className={styles.submitButton}>
                        {isRegister ? "Зареєструвати" : "Увійти"}
                    </button>
                </div>
                <Link className={styles.chooseText}
                      to={!isRegister ? "/register" : "/login"}>{!isRegister ? "Зареєструвати" : "Увійти"}</Link>
            </form>
        </div>
    );
}