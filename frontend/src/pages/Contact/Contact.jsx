import { useState } from 'react';
import styles from './Contact.module.css';
import Input from "../../components/Input/Input.jsx";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Повідомлення надіслано! Ми зв\'яжемося з вами найближчим часом.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Телефон',
      details: ['+380 44 123 45 67', '+380 67 890 12 34'],
      description: 'Дзвоніть у будь-який час'
    },
    {
      icon: '📧',
      title: 'Email',
      details: ['info@automarket.ua', 'support@automarket.ua'],
      description: 'Відповімо протягом 2 годин'
    },
    {
      icon: '📍',
      title: 'Адреса',
      details: ['вул. Хрещатик, 22', 'Київ, 01001'],
      description: 'Головний офіс'
    },
    {
      icon: '🕐',
      title: 'Графік роботи',
      details: ['Пн-Пт: 9:00 - 18:00', 'Сб-Нд: 10:00 - 16:00'],
      description: 'Підтримка 24/7 онлайн'
    }
  ];

  const faqItems = [
    {
      question: 'Як додати оголошення?',
      answer: 'Перейдіть на сторінку "Додати оголошення", заповніть всі необхідні поля та додайте фотографії вашого автомобіля.'
    },
    {
      question: 'Чи безпечно купувати через вашу платформу?',
      answer: 'Так, ми перевіряємо всі оголошення та надаємо рекомендації щодо безпечних угод. Також ми пропонуємо сервіс професійної перевірки автомобілів.'
    },
    {
      question: 'Скільки коштує розміщення оголошення?',
      answer: 'Базове розміщення оголошення безкоштовне. Додаткові опції (преміумне розміщення, підняття в топ) мають окрему вартість.'
    },
    {
      question: 'Як зв\'язатися з продавцем?',
      answer: 'У кожному оголошенні вказані контактні дані продавця. Також ви можете скористатися внутрішньою системою повідомлень.'
    }
  ];

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h1 className={styles.title}>Зв'яжіться з нами</h1>
        <p className={styles.subtitle}>
          Маєте питання або потребуєте допомоги? Наша команда завжди готова вам допомогти.
          Зв'яжіться з нами будь-яким зручним способом.
        </p>
      </div>

      <div className={styles.mainContent}>
        {/* Форма */}
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>💬 Надіслати повідомлення</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                  <Input onChange={(e) => handleInputChange('name', e.target.value)} label={"Ім'я "} value={formData.name} type={"text"} placeHolder={"Ваше ім'я"}/>
                  <Input onChange={(e) => handleInputChange('email', e.target.value)} label={"Email *"} value={formData.email} type={"email"} placeHolder={"your@email.com"}/>
                  <Input onChange={(e) => handleInputChange('phone', e.target.value)} label={"Телефон"} value={formData.phone} type={"tel"} placeHolder={"+380 67 123 45 67"}/>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Тема звернення *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={styles.select}
                    required
                  >
                    <option value="">Оберіть тему</option>
                    <option value="general">Загальне питання</option>
                    <option value="technical">Технічна підтримка</option>
                    <option value="billing">Питання оплати</option>
                    <option value="complaint">Скарга</option>
                    <option value="suggestion">Пропозиція</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Повідомлення *</label>
                <textarea
                  placeholder="Опишіть ваше питання або пропозицію..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={styles.textarea}
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Надіслати повідомлення
              </button>
            </form>
          </div>
        </div>

        {/* Контактна інформація */}
        <div className={styles.infoSection}>
          {contactInfo.map((info, index) => (
            <div key={index} className={styles.infoCard}>
              <div className={styles.infoIcon}>{info.icon}</div>
              <h3 className={styles.infoTitle}>{info.title}</h3>
              {info.details.map((detail, detailIndex) => (
                <p key={detailIndex} className={styles.infoDetail}>{detail}</p>
              ))}
              <p className={styles.infoDescription}>{info.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>❓ Часті питання</h2>
          <p className={styles.faqSubtitle}>
            Відповіді на найпоширеніші питання наших користувачів
          </p>
        </div>

        <div className={styles.faqGrid}>
          {faqItems.map((item, index) => (
            <div key={index} className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>{item.question}</h3>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}