import React from 'react';
import './Home.css';

const  Home = () => {
    return (
        <div className="home">
            <header className="home-header">
                <h1>Bienvenido a nuestra Página</h1>
                <p>Esta es la página de inicio de tu sitio web. Aquí puedes agregar cualquier contenido relevante.</p>
            </header>
            <section className="home-content">
                <h2>Sección de Contenido</h2>
                <p>Aquí puedes colocar información, imágenes o cualquier otro tipo de contenido.</p>
            </section>
        </div>
    );
};

export default Home;
