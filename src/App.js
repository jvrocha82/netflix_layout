
import React, { useEffect, useState } from "react";
import tmdb from "./Tmdb";
import MovieRow from './components/MovieRow'
import FeatureMovie from './components/FeatureMovie'
import './App.css'
import Header from './components/Header'


export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista TOTAL
      //console.log('Tmdb',Tmdb)
     
      let list = await tmdb.getHomeList();
      setMovieList(list);
      //Pegando o FeatureMovie
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id,'tv')
      setFeatureData(chosenInfo)
    };
    loadAll();
  }, []);
  useEffect(() =>{
const scrollListener = () => {
  if(window.scrollY > 10){
    setBlackHeader(true)
  }else{
    setBlackHeader(false)
  }
}
window.addEventListener('scroll', scrollListener);
return () =>{
  window.removeEventListener('scroll, scroll', scrollListener);
}
  },[])
  return (
    <div className="page">
      <Header black={blackHeader}/>
     {featureData &&  <FeatureMovie item={featureData}/>}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      <footer>
        Feito com <span role="img" arialabel="coração">♥</span> pela b7web<br/>
        Direitos de imagem para a Netflix<br/>
        Dados pegos do site Themoviedb.org 
      </footer>
      {
        movieList.length <= 0 &&  
     
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando"/>
      </div>
       }
    </div>
  );
}
