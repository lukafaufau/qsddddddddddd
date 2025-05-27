import { useEffect } from 'react';
import { ArrowDown, Disc as Discord } from 'lucide-react';
import CountdownTimer from './components/CountdownTimer';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  // Get stored target date or set new one if not exists
  const getTargetDate = () => {
    const storedDate = localStorage.getItem('countdownTarget');
    if (storedDate) {
      return new Date(storedDate);
    }
    
    const newTarget = new Date();
    newTarget.setDate(newTarget.getDate() + 15);
    newTarget.setHours(newTarget.getHours() + 24);
    localStorage.setItem('countdownTarget', newTarget.toISOString());
    return newTarget;
  };

  useEffect(() => {
    // Add scroll animation for the arrow
    const arrow = document.querySelector('.scroll-arrow');
    if (arrow) {
      arrow.addEventListener('click', () => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      });
    }

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'discord-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
      document.querySelector('.discord-particles')?.appendChild(particle);

      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    };

    const particleInterval = setInterval(createParticle, 500);

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <>
      <ParticleBackground />
      <div className="app-container">
        <main className="hero-section">
          <div className="content-container">
            <h1 className="logo">
              <span className="highlight">Reload</span>Web
            </h1>
            <p className="tagline">Quelque chose d'incroyable arrive bientôt</p>
            
            <CountdownTimer targetDate={getTargetDate()} />
            
            <div className="scroll-arrow">
              <ArrowDown size={32} />
            </div>
          </div>
        </main>

        <section className="discord-section">
          <div className="discord-particles"></div>
          <div className="discord-container">
            <h2 className="discord-title">Rejoignez notre communauté Discord</h2>
            <a 
              href="https://discord.gg/UbFQWdHTpR" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="discord-button"
            >
              <Discord size={24} />
              Rejoindre le serveur
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;