import React from 'react';
import { Link } from 'react-router-dom'

import { FiArrowRight } from 'react-icons/fi';
import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Logo"/>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        <div className="location">
          <strong>Torres</strong>
          <span>Rio Grande do Sul</span>
        </div>
        <Link to="/orphanages" className="enter-app">
          <FiArrowRight width={26} color="rgba(0,0,0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;