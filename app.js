
import { useState } from "react";
import "./app.css";

const services = [
  { id: 1, name: "Coupe de cheveux", price: 100, duration: "30 min" },
  { id: 2, name: "Brushing", price: 80, duration: "30 min" },
  { id: 3, name: "Soin du visage", price: 150, duration: "45 min" },
  { id: 4, name: "Manucure", price: 70, duration: "30 min" },
  { id: 5, name: "Maquillage", price: 200, duration: "60 min" },
];

function App() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [serviceId, setServiceId] = useState("1");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("10:00");
  const [rendezVous, setRendezVous] = useState([]);

  const aujourdHui = new Date().toLocaleDateString("en-CA");

  const serviceChoisi = services.find(
    (service) => service.id === Number(serviceId)
  );

  function reserver(e) {
    e.preventDefault();

    if (!nom.trim() || !telephone.trim() || !date || !heure) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const nouveauRendezVous = {
      id: Date.now(),
      nom,
      telephone,
      service: serviceChoisi.name,
      prix: serviceChoisi.price,
      date,
      heure,
    };

    setRendezVous([...rendezVous, nouveauRendezVous]);

    alert("Votre rendez-vous a été ajouté avec succès !");

    setNom("");
    setTelephone("");
    setDate("");
    setHeure("10:00");
  }

  function supprimer(id) {
    setRendezVous(
      rendezVous.filter((rdv) => rdv.id !== id)
    );
  }

  function envoyerWhatsApp(rdv) {
    const numeroSalon = "212600000000";

    const message =
      `Bonjour, je souhaite confirmer mon rendez-vous.\n` +
      `Nom : ${rdv.nom}\n` +
      `Téléphone : ${rdv.telephone}\n` +
      `Service : ${rdv.service}\n` +
      `Date : ${rdv.date}\n` +
      `Heure : ${rdv.heure}`;

    const url =
      `https://wa.me/${numeroSalon}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }

  return (
    <div className="site">
      <header className="navbar">
        <a href="#accueil" className="logo">
          <span>✿</span> Belle & Chic
        </a>

        <nav>
          <a href="#accueil">Accueil</a>
          <a href="#services">Services</a>
          <a href="#reservation">Réservation</a>
        </nav>

        <a className="nav-button" href="#reservation">
          Prendre rendez-vous
        </a>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-text">
            <span className="eyebrow">
              VOTRE BEAUTÉ, NOTRE PASSION
            </span>

            <h1>
              Prenez du temps
              <br />
              <span>pour vous.</span>
            </h1>

            <p>
              Découvrez nos soins et réservez votre moment
              de beauté en quelques clics.
            </p>

            <a className="primary-button" href="#reservation">
              Réserver maintenant ↗
            </a>

            <div className="hero-info">
              <span>✦ Service personnalisé</span>
              <span>✦ Réservation simple</span>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"
              alt="Salon de beauté élégant"
            />
            <div className="image-label">
              <span>♡</span>
              <div>
                <strong>Votre moment à vous</strong>
                <p>Beauté & bien-être</p>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <span className="eyebrow">NOS PRESTATIONS</span>
            <h2>Nos services beauté</h2>
            <p>Choisissez le soin qui vous correspond.</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <div className="service-icon">✿</div>

                <h3>{service.name}</h3>

                <p>Durée : {service.duration}</p>

                <div className="service-bottom">
                  <strong>{service.price} DH</strong>

                  <button
                    onClick={() => {
                      setServiceId(String(service.id));
                      document
                        .getElementById("reservation")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Choisir →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-section" id="reservation">
          <div className="booking-intro">
            <span className="eyebrow">RÉSERVATION EN LIGNE</span>
            <h2>Votre prochain rendez-vous</h2>
            <p>
              Remplissez le formulaire pour enregistrer
              votre demande de rendez-vous.
            </p>

            <div className="booking-note">
              <span>♡</span>
              <p>
                Choisissez votre prestation, votre date
                et l'heure qui vous convient.
              </p>
            </div>
          </div>

          <form className="booking-form" onSubmit={reserver}>
            <h3>Réserver une prestation</h3>

            <label htmlFor="nom">Nom complet</label>
            <input
              id="nom"
              type="text"
              placeholder="Votre nom complet"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />

            <label htmlFor="telephone">Numéro de téléphone</label>
            <input
              id="telephone"
              type="tel"
              placeholder="06XXXXXXXX"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />

            <label htmlFor="service">Choisir un service</label>
            <select
              id="service"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} — {service.price} DH
                </option>
              ))}
            </select>

            <div className="form-row">
              <div>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  min={aujourdHui}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="heure">Heure</label>
                <select
                  id="heure"
                  value={heure}
                  onChange={(e) => setHeure(e.target.value)}
                  required
                >
                  {[
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                    "18:00",
                  ].map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="price-summary">
              <span>Prix de la prestation</span>
              <strong>{serviceChoisi.price} DH</strong>
            </div>

            <button className="submit-button" type="submit">
              Confirmer ma réservation →
            </button>

            <p className="form-disclaimer">
              La réservation sera enregistrée dans cette session
              de démonstration.
            </p>
          </form>
        </section>

        <section className="appointments-section">
          <div className="section-heading">
            <span className="eyebrow">ESPACE DE DÉMONSTRATION</span>
            <h2>Les rendez-vous enregistrés</h2>
          </div>

          {rendezVous.length === 0 ? (
            <p className="empty-message">
              Aucun rendez-vous pour le moment.
            </p>
          ) : (
            <div className="appointments-list">
              {rendezVous.map((rdv) => (
                <article className="appointment-card" key={rdv.id}>
                  <div>
                    <h3>{rdv.nom}</h3>
                    <p>{rdv.service}</p>
                    <p>
                      {rdv.date} à {rdv.heure}
                    </p>
                    <strong>{rdv.prix} DH</strong>
                  </div>

                  <div className="appointment-actions">
                    <button
                      className="whatsapp-button"
                      onClick={() => envoyerWhatsApp(rdv)}
                    >
                      WhatsApp
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => supprimer(rdv.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <a href="#accueil" className="logo">
          <span>✿</span> Belle & Chic
        </a>

        <p>Votre beauté mérite un moment rien qu'à elle.</p>

        <small>© 2026 Belle & Chic — Site de démonstration</small>
      </footer>
    </div>
  );
}

export default App;
