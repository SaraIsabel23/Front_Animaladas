import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories'

function Home() {
    return(
        <div>
            <Header />
            <main>
               <Hero />
               <Categories />
            </main>
            <Footer />
        </div>
    );
};

export default Home;