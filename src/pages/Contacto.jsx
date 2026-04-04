import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import styles from './Contacto.module.css';

function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    
    // Simular envio (conectar más adelante con el backend y a la vez que me llegue a mi mail)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Contacto</h1>
            <p>Estamos aquí para ayudarte. ¡Contacta con nosotros!</p>
          </div>

          <div className={styles.content}>
            <div className={styles.info}>
              <h2>Información de contacto</h2>
              
              <div className={styles.infoItem}>
                <MapPin size={24} className={styles.icon} />
                <div>
                  <h3>Dirección</h3>
                  <p>Calle Calero Pita 54</p>
                  <p>28053 Madrid (Vallecas)</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Phone size={24} className={styles.icon} />
                <div>
                  <h3>Teléfono</h3>
                  <p><a href="tel:910850848">91 085 08 48</a></p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Mail size={24} className={styles.icon} />
                <div>
                  <h3>Email</h3>
                  <p><a href="mailto:animaladas2016@gmail.com">animaladas2016@gmail.com</a></p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock size={24} className={styles.icon} />
                <div>
                  <h3>Horario</h3>
                  <p>Lunes a Viernes: 10:00 - 14:00 / 17:00 - 20:00</p>
                  <p>Sábados: 10:00 - 14:00</p>
                  <p>Domingos y tercer sábado de mes: Cerrado</p>
                </div>
              </div>

              <div className={styles.mapa}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.252676812764!2d-3.6742684249204665!3d40.38109215780913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42267ad996c9a7%3A0x94d6aca0b089dce4!2sC.%20de%20Calero%20Pita%2C%2054%2C%20Puente%20de%20Vallecas%2C%2028053%20Madrid!5e0!3m2!1ses!2ses!4v1775110040094!5m2!1ses!2ses"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicacion Animaladas"
                />
              </div>
            </div>

            <div className={styles.formWrapper}>
              <h2>Envíanos un mensaje</h2>

              {success && (
                <p className={styles.success}>
                  Mensaje enviado correctamente. ¡Te responderemos pronto!
                </p>
              )}

              {error && <p className={styles.error}>{error}</p>}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="subject">Asunto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contacto;