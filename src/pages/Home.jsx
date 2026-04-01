import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';


function Home() {
    return(
        <div>
            <Header />
            <main>
               <Hero />
            </main>
            <Footer />
        </div>
    );
};

export default Home;