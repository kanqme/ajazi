
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const typingElementRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Aggiornato: testo con copyright al posto di "Sviluppatore Web & Designer"
    const phrases = [
      "Benvenuto nel mio Portfolio",
      "A cura di Davide Ajazi"
    ];
    
    let currentPhraseIndex = 0;
    let isDeleting = false;
    let text = '';
    let charIndex = 0;
    let typingSpeed = 100;
    const typingElement = typingElementRef.current;
    
    if (!typingElement) return;
    
    const typeWriter = () => {
      // Seleziona la frase corrente
      const currentPhrase = phrases[currentPhraseIndex];
      
      typingSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting) {
        text = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      } else {
        text = currentPhrase.substring(0, charIndex);
        charIndex--;
      }
      
      typingElement.textContent = text;
      
      // Applica la classe gradient-text solo alla prima frase
      if (currentPhraseIndex === 0) {
        typingElement.classList.add('gradient-text');
      } else {
        typingElement.classList.remove('gradient-text');
      }
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      }
      
      setTimeout(typeWriter, typingSpeed);
    };
    
    setTimeout(typeWriter, 500);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div id="particles-js" className="absolute inset-0" />
      
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
        <p className="text-accent-blue mb-2 text-lg animate-pulse-slow">Il Mio Lavoro Creativo</p>
        <h1 ref={typingElementRef} className="text-4xl md:text-6xl font-bold mb-6 min-h-[60px]"></h1>
      </div>
      
      <div className="absolute bottom-10 w-full flex justify-center animate-float">
        <a href="#projects" className="text-white">
          <ArrowDown size={30} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
