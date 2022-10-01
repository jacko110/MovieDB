import React,{useState,useEffect} from 'react'
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const useFetch = (urlParams) => {
    const [isLoading,setIsLoading]=useState(true)
    const [movies,setMovies] = useState(null)
    const [error,setError]=useState({show:false,msg:''})

    const fetchMovies = async (url)=>{
        try {
          setIsLoading(true)
          const res = await fetch(url)
          const data = await res.json()
          // console.log(data);
          if(data.Response === 'True'){
            setMovies(data.Search || data)
            setError({show:false,msg:''})
          }else{
            setError({show:true,msg:data.Error})
          }
          setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
      } 
    
      useEffect(()=>{
        fetchMovies(`${API_ENDPOINT}${urlParams}`)
      },[urlParams])
  return {isLoading,error,movies}
}

export default useFetch