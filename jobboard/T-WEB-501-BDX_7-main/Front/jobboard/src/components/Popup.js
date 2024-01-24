import React, { useState } from 'react';
import axios from 'axios';
import * as PopupStyle from './PopupStyle';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';



const Popup = ({ setIsPopupVisible,onLoginSuccess}) => {
  const navigate=useNavigate();
  const [showLoginForm, setShowLoginForm] = React.useState(true);
  const handleClose = () => {
    setIsPopupVisible(false);
  };
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  const [values, setValues] = useState({
    Name: '',
    LastName: '',
    Password: '',
    Mail: '',
  });

  const handleSignupFormSubmit = (event) => {
    console.log("La fonction handleFormSubmit est appelée");
    event.preventDefault();
    axios.post('http://localhost:5500/users', values)
      .then(res => {
        if (res.data.Status === "success") {
          console.log('success');
          setShowLoginForm(true);
          

        }
        else {
          console.log('error');
        }
      })
      .catch(err => console.log(err));
  };

  const [loginValue, setloginValues] = useState({
    Mail: '',
    Password: '',
  });

  axios.defaults.withCredentials = true;

  const handleFormSubmit = (event) => {

    console.log("La fonction handleSignupFormSubmit est appelée");
    event.preventDefault();
    axios.post('http://localhost:5500/users/login', loginValue)
      .then(res => {
        console.log("Réponse complète du serveur: ", res.data);
        if (res.data.Status === "success") {
          localStorage.setItem('token', res.data.token);
          console.log("Token stocké:", localStorage.getItem('token'));
          const decodedToken = jwtDecode(localStorage.getItem('token'));
          console.log("Token décodé:", decodedToken);
          if (decodedToken.isAdmin) {  // Supposons que res.data.isAdmin indique si l'utilisateur est un admin
            console.log("L'utilisateur est un admin");
            navigate('/admin/dashboard');  // Étape 3: Redirigez vers le tableau de bord de l'admin
            onLoginSuccess(true); // Informe le Header que l'utilisateur est connecté
            setIsPopupVisible(false);
          } else {
            console.log("L'utilisateur n'est pas un admin");
            if (onLoginSuccess) {
              onLoginSuccess(true); // Informe le Header que l'utilisateur est connecté
              setIsPopupVisible(false); // Ferme la popup
            }
          }
      } else {
          console.log(res.data.Error);
      }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleToggleForm = (event, newView) => {
    if (newView !== null) {
      setShowLoginForm(newView === 'login');
    }
  };

  return (
    <PopupStyle.Backdrop onClick={handleClose}>
    <PopupStyle.Container onClick={handleContentClick}>
      <PopupStyle.SignupContainer showLoginForm={showLoginForm}>
      <PopupStyle.Form onSubmit={handleSignupFormSubmit}>
          <PopupStyle.Title>Créer un compte</PopupStyle.Title>
          <PopupStyle.Input type="text" placeholder="Name" value={values.Name} onChange={(e) => setValues({ ...values, Name: e.target.value })}/>
          <PopupStyle.Input type="text" placeholder="LastName" value={values.LastName} onChange={(e) => setValues({ ...values, LastName: e.target.value })}/>
          <PopupStyle.Input type="email" placeholder="Email" value={values.Mail} onChange={(e) => setValues({ ...values, Mail: e.target.value })}/>
          <PopupStyle.Input type="password" placeholder="Password" value={values.Password} onChange={(e) => setValues({ ...values, Password: e.target.value })}/>
          <PopupStyle.Button>Sign Up</PopupStyle.Button>
        </PopupStyle.Form>
      </PopupStyle.SignupContainer>
      <PopupStyle.LoginContainer showLoginForm={showLoginForm}>
      <PopupStyle.Form onSubmit={handleFormSubmit}>
            <PopupStyle.Title>Se connecter</PopupStyle.Title>
            <PopupStyle.Input type="email" placeholder="Email" value={loginValue.Mail} onChange={(e) => setloginValues({ ...loginValue, Mail: e.target.value })}/>
            <PopupStyle.Input type="password" placeholder="Password" value={loginValue.Password} onChange={(e) => setloginValues({ ...loginValue, Password: e.target.value })}/>
            <PopupStyle.Anchor href="#">Mot de passe oublié ?</PopupStyle.Anchor> 
            <PopupStyle.Button>Login</PopupStyle.Button>
          </PopupStyle.Form>
      </PopupStyle.LoginContainer>
      <PopupStyle.OverLayContainer showLoginForm={showLoginForm}>
        <PopupStyle.Overlay showLoginForm={showLoginForm}>

        <PopupStyle.LeftOverLayPanel showLoginForm={showLoginForm}>
        <PopupStyle.Title className='cool'>Bon Retour !</PopupStyle.Title>
        <PopupStyle.Paragraph>Coooooool</PopupStyle.Paragraph>
        <PopupStyle.GhostButton onClick={(e) => handleToggleForm(e,'login')}>Se connecter</PopupStyle.GhostButton>
        </PopupStyle.LeftOverLayPanel>

        <PopupStyle.RightOverLayPanel showLoginForm={showLoginForm}>
          <PopupStyle.Title>Hello, Friend!</PopupStyle.Title>
          <PopupStyle.Paragraph>Entrer vos informations ici !</PopupStyle.Paragraph>
            <PopupStyle.GhostButton onClick={(e) => handleToggleForm(e,'signup')}>S'inscrire</PopupStyle.GhostButton>
        </PopupStyle.RightOverLayPanel>
        </PopupStyle.Overlay>
      </PopupStyle.OverLayContainer>
      </PopupStyle.Container>
      </PopupStyle.Backdrop>
  );
}

export default Popup;
