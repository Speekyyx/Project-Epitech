import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import {Button, AppBar, Toolbar, Typography, Container, IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'; 
import MinecraftWorkIcon from '../img/craft_minecraft.png';
import MinecraftLoginIcon from '../img/minecraft_caracters.png';
import { Box } from '@mui/material';
import MinecraftLogo from '../img/minecraft-logo.png';
import herbe from '../img/herbe.png';
import Profilepage from './Profilepage';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
  background-image: url(${herbe});
  background-color: #someFallbackColor;
  & .MuiToolbar-root {
    border: 4px solid black;
  }
`;

const StyledTypography = styled(Typography)({
  fontSize: '30px',
  fontFamily: '"Minecraft", monospace',
  color: 'white',
});

const StyledButton = styled(Button)({
  display: 'flex', 
  justifyContent: 'center',  
  alignItems: 'center',
  fontSize: '15px',
  fontFamily: '"Minecraft", monospace',
  backgroundColor: '#FF9800',
  color: 'white',
  border: '3px black',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#F57C00',
  },
});

const StyledIconButton = styled(IconButton)({
  display: 'flex', 
  justifyContent: 'center',  
  alignItems: 'center',
  '& img': {
    width: '100%',
  },
});

const Header = () => {
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5500/some-protected-route', {
        headers: { 'x-access-token': token }
      })
      .then(response => {
        if (response.data && response.data.Status === "success") {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, []);

  const handleProfileOpen = () => {
    setIsProfilePopupVisible(true);
    console.log('Opening Profile Popup');
  };
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsProfilePopupVisible(false);
    navigate('/');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <StyledIconButton>
              <img src={MinecraftLogo} alt="CraftToTaff Logo" />
            </StyledIconButton>
            <StyledTypography variant="h6" style={{ marginLeft: '10px' }}>
              CraftToTaff
            </StyledTypography>
          </Box>
          <Box display="flex" alignItems="center">
            <StyledButton startIcon={<img src={MinecraftWorkIcon} alt="Work" height={'40px'} />} style={{ marginLeft: '10px'}}>
              Offres d'emploi
            </StyledButton>
            { isAuthenticated ? (
              <>
                <StyledButton onClick={handleProfileOpen} style={{ marginLeft: '10px' }}> 
                  Mon Profil
                </StyledButton>
                <StyledButton style={{ marginLeft: '10px' }} onClick={handleLogout}>
                  Déconnexion
                </StyledButton>
                {isProfilePopupVisible && <Profilepage onClose={() => setIsProfilePopupVisible(false)} />}
              </>
            ) : (
              <StyledButton startIcon={<img src={MinecraftLoginIcon} alt="Login" height={'40px'} />} style={{ marginLeft: '10px'}} onClick={() => setIsPopupVisible(true)}>
                Connexion
              </StyledButton>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Container>
        {isPopupVisible && <Popup setIsPopupVisible={setIsPopupVisible} onLoginSuccess={handleLoginSuccess} />}

      </Container>
    </div>
  );
};

export default Header;
