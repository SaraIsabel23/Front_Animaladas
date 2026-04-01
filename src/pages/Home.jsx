import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories'
import LatestArticles from '../components/home/LatestArticles';


function Home() {
    return(
        <div>
            <Header />
            <main>
               <Hero />
               <Categories />
               <LatestArticles /> 
            </main>
            <Footer />
        </div>
    );
};

export default Home;