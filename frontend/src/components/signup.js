import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import connection from './axios'

const defaultTheme = createTheme();


export default function SignUp(){
  const [errorMessage, setErrorMessage] = useState('')
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSignUp(){
    try{
    const response = await connection.post(`/signup/${usernameRef.current.value}/${emailRef.current.value}/${passwordRef.current.value}`)
    console.log(response)
    if(response.status===200){window.location.href = 'http://localhost:3000/signin'}
    else if(response.status===500){
      setErrorMessage('Internal Server Error! Please Try Again')
    }
    else{
      setErrorMessage('')
    }}
    catch(err){
      setErrorMessage('Could not serve your request')
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              inputRef={usernameRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            <Button 
              onClick={handleSignUp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Typography component="h1" variant="h5">
            <p style={{ color: 'red' }}>{errorMessage}</p>
            </Typography>
            <Grid container>
              <Grid item>
                <Link to='../signin'>
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}