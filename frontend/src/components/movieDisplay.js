import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect, useRef} from 'react';
import connection from './axios'
import Button from '@mui/material/Button';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';


const defaultTheme = createTheme();

const MovieDisplay = (props) =>{
  const isMounted = useRef(false);
  const isMounted_ = useRef(false);
  const [errorMessage, setErrorMessage] = useState('')
  let [movies,setMovies]=useState([]);
  let [likes, setLikes]=useState('');
  let [dislikes, setDislikes]=useState('')
  let [currMovie, setCurrMovie]=useState('')
  let [filters, setFilters] = useState({})

    useEffect(() => {
      if (!isMounted_.current) {
        isMounted_.current = true;
        return;
      }
      async function test_auth(){
        try{
            const response = await connection.get(`/ntuaflix_api/test`, null, { withCredentials: true })
            if (response.status===200){return }
            else if(response.status===401){window.location.href = 'http://localhost:3000/signin'; return}
        }
        catch(err){
            setErrorMessage('Could not serve your request')
        }
      }
      test_auth()
    }, []);

    async function get_movies(){
      if(props.mode==='likes'){
        try{
          const user = document.cookie.split('=')[1].split('_')[0] //get username from token
          const response = await connection.get(`/ntuaflix_api/likes/${user}`, null, { withCredentials: true })
          if (response.status===200){return setMovies(response.data)}
          else if(response.status===204)return setErrorMessage('No liked movies')
        }
        catch(err){
          setErrorMessage('Could not process your request')
        }
      }
      else{
        try{
            const response = await connection.get(`/ntuaflix_api/filters`, filters, { withCredentials: true })
            if (response.status===200){return setMovies(response.data)}
            else if(response.status===204)return setErrorMessage('No films match your filters')
        }
        catch(err){
            setErrorMessage('Could not process your request')
        }
      }
    }

    async function get_likes(){
      try{
        const user = document.cookie.split('=')[1].split('_')[0] //get username from token
        const response = await connection.get(`/ntuaflix_api/likes/${user}`, null, { withCredentials: true })
        if (response.status===200){let likeids=response.data.map(object=>object.tconst); return setLikes(likeids)}
        else if(response.status===204)return setErrorMessage('No liked movies')
      }
      catch(err){
        setErrorMessage('Could not process your request')
      }
    }

    async function get_dislikes(){
      try{
        const user = document.cookie.split('=')[1].split('_')[0] //get username from token
        const response = await connection.get(`/ntuaflix_api/dislikes/${user}`, null, { withCredentials: true })
        if (response.status===200){let dislikeids=response.data.map(object=>object.tconst); return setDislikes(dislikeids)}
        else if(response.status===204)return setErrorMessage('No liked movies')
      }
      catch(err){
        setErrorMessage('Could not process your request')
      }
    }

    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      get_movies();
      get_likes();
      get_dislikes();
    }, [filters]);

    async function handleLike(movieid){
      try{
        const username = document.cookie.split('=')[1].split('_')[0] 
        const response = await connection.post(`/ntuaflix_api/rate/like/${username}/${movieid}`)
        if(response.status===200){return}
       }
      catch(err){
        setErrorMessage('Could not like the movie')
      }
    }

    return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
        <AppBar position="relative">
        </AppBar>
        <Typography component="h1" variant="h5">
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </Typography>
        <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item key={movies.indexOf(movie)} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '150%' 
                    }}
                    image={movie.imageURL ? movie.imageURL.replace(/{[^}]*}/, 'w500').trim() : "https://louisville.edu/history/images/noimage.jpg"}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {movie.primaryTitle}
                    </Typography>
                    <Typography>
                    {movie.genres ? `type: ${movie.titleType}` : ''}
                    </Typography>
                    <Typography>
                    {movie.genres}
                    </Typography>
                    <div>
                      <Button startIcon={likes.includes(movie.tconst) ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />} onClick={()=>handleLike(movie.tconst)}></Button>
                      <Button startIcon={dislikes.includes(movie.tconst) ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}></Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </main>
    </ThemeProvider>
  );
}

export default MovieDisplay;
