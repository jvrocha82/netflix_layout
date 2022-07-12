const API_KEY = process.env.REACT_APP_API_KEY
const API_BASE = "https://api.themoviedb.org/3";
const lenguage = "pt-BR";
const defaultFetchConfig = `language=${lenguage}&api_key=${API_KEY}`

/*
--originais da netflix
--recommendados (trending)
--em alta (top rated)
--ação
--comédia
--terror
--romance
--documentários
*/
const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};
let functionList = {
     getHomeList : async() => {
      return [
        {
          slug: "originals",
          title: "Originais do Netflix",
          items: await basicFetch(
            `/discover/tv?with_network=213&${defaultFetchConfig}`
          ),
        },
        {
          slug: "tranding",
          title: "Recomendados para Você",
          items: await basicFetch(
            `/trending/all/week?with_network=213&${defaultFetchConfig}`
          ),
        },
        {
          slug: "toprated",
          title: "Em Alta",
          items: await basicFetch(
            `/movie/top_rated?with_network=213&${defaultFetchConfig}`
          ),
        },
        {
          slug: "action",
          title: "ação",
          items: await basicFetch(
            `/discover/movie?with_network=213&with_genres=28&${defaultFetchConfig}`
          ),
        },
        {
          slug: "comedy",
          title: "Comédia",
          items: await basicFetch(
            `/discover/movie?with_network=213&with_genres=35&${defaultFetchConfig}`
          ),
        },
        {
          slug: "horror",
          title: "Terror",
          items: await basicFetch(
            `/discover/movie?with_network=213&with_genres=27&${defaultFetchConfig}`
          ),
        },
        {
          slug: "romance",
          title: "romance",
          items: await basicFetch(
            `/discover/movie?with_network=213&with_genres=10749&${defaultFetchConfig}`
          ),
        },
        {
          slug: "documentary",
          title: "Documentarios",
          items: await basicFetch(
            `/discover/movie?with_genres=99&${defaultFetchConfig}`
          ),
        }
      ]
    },
    getMovieInfo: async (movieId, type) => {
      let info = {};
      if (movieId) {
        switch (type) {
          case "movie":
            info = await basicFetch(`/movie/${movieId}?${defaultFetchConfig}`)
            break;
          case "tv":
            info = await basicFetch(`/tv/${movieId}?${defaultFetchConfig}`)
            break;
            default:
            info = null;
        }
      }
      return info;
    },
  };

  export default functionList;