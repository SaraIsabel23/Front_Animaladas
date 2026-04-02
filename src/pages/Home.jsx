import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories'
import LatestArticles from '../components/home/LatestArticles';
import LatestPosts from '../components/home/LatestPosts';


function Home() {
    return(
        <div>
            <Header />
            <main>
               <Hero />
               <Categories />
               <LatestPosts />
               <LatestArticles /> 
            </main>
            <Footer />
        </div>
    );
};

export default Home;