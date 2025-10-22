import styles from './About.module.css';

function About() {
  const stats = [
    { icon: '👥', label: 'Активних користувачів', value: '50,000+' },
    { icon: '🛡️', label: 'Безпечних угод', value: '100%' },
    { icon: '⭐', label: 'Рейтинг сервісу', value: '4.8/5' },
    { icon: '🕐', label: 'Років на ринку', value: '5+' }
  ];

  const features = [
    {
      icon: '✅',
      title: 'Перевірені оголошення',
      description: 'Всі оголошення проходять модерацію для забезпечення якості'
    },
    {
      icon: '🛡️',
      title: 'Безпечні угоди',
      description: 'Захищені методи оплати та верифікація продавців'
    },
    {
      icon: '🏆',
      title: 'Експертна оцінка',
      description: 'Професійна оцінка автомобілів від сертифікованих експертів'
    },
    {
      icon: '👥',
      title: 'Велика спільнота',
      description: 'Тисячі задоволених покупців та продавців'
    }
  ];

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.hero}>
        <h1 className={styles.title}>Про AutoMarket</h1>
        <p className={styles.subtitle}>
          Ми створили найкращу платформу для купівлі та продажу автомобілів в Україні.
          Наша місія - зробити процес безпечним, простим та зручним для всіх учасників.
        </p>
      </div>

      {/* Статистика */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Наша історія */}
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h2 className={styles.sectionTitle}>Наша історія</h2>
          <p>
            AutoMarket був заснований у 2019 році з простою ідеєю: створити найкращу
            платформу для купівлі та продажу автомобілів в Україні. Ми почали як невелика
            команда ентузіастів, які хотіли змінити ринок автомобілів на краще.
          </p>
          <p>
            За роки роботи ми допомогли тисячам українців знайти свій ідеальний автомобіль
            та продати свій попередній. Наша платформа постійно розвивається, додаючи нові
            функції та покращуючи користувацький досвід.
          </p>
          <p>
            Сьогодні AutoMarket - це не просто дошка оголошень, а повноцінна екосистема
            для автомобільного ринку з експертними оцінками, безпечними угодами та
            професійною підтримкою.
          </p>
        </div>
        
        <div className={styles.imageSection}>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
            alt="Команда AutoMarket"
            className={styles.image}
          />
        </div>
      </div>

      {/* Чому обирають нас */}
      <div>
        <h2 className={styles.sectionTitle}>Чому обирають AutoMarket</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Цінності */}
      <div className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>Наші цінності</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueLabel}>Прозорість</div>
            <p>Чесна інформація про кожен автомобіль та прозорі умови співпраці</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueLabel}>Безпека</div>
            <p>Захист персональних даних та безпечні методи проведення угод</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueLabel}>Якість</div>
            <p>Високі стандарти сервісу та постійне покращення платформи</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
