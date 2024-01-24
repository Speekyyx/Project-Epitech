import React, { useState } from 'react';
import { TextField, Button, Box, Container, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MinecraftLocationIcon from '../img/map_minecraft.png';
import MinecraftWorkIcon from '../img/minecraft_caracters.png';

const StyledSearchBar = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7a7a7a',  // Gris Pierre de Minecraft
    padding: '10px',
    borderRadius: '8px',
    margintop: '0',
});

const StyledButton = styled(Button)({
    fontFamily: "'Minecraft', monospace",
    backgroundColor: '#b93a32',  // Couleur de la brique
    color: 'white',
    border: '3px solid #8c2e24',  // Bordure un peu plus foncée
    '&:hover': {
      backgroundColor: '#9f3329',  // Brique un peu plus foncée au survol
    },
});

const StyledTextField = styled(TextField)({
    margin: '0 10px',
    backgroundColor: '#D4D4D4',  // Couleur inspirée du fer de Minecraft
    '& .MuiOutlinedInput-root': {
        fontFamily: "'Minecraft', monospace",
        '&:hover fieldset': {
            borderColor: '#B0B0B0',  // Gris un peu plus foncé au survol
        },
        '&.Mui-focused fieldset': {
            borderColor: '#9E9E9E',  // Gris encore plus foncé lors de la mise au point
        },
    },
});

const JobSearch = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');

    const handleSearch = () => {
        console.log(`Recherche d'un(e) ${jobTitle} à ${jobLocation}`);
    };

    return (
        <Container
            style={{
                height: '100vh',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '10%',
            }}
        >
            <StyledSearchBar>
                <IconButton>
                <img src={MinecraftWorkIcon} alt="Work" width="50" height="50" />
                </IconButton>
                <StyledTextField
                    variant="outlined"
                    placeholder="Quoi ? (ex. Développeur)"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                <IconButton>
                <img src={MinecraftLocationIcon} alt="Location" width="50" height="50" />
                </IconButton>
                <StyledTextField
                    variant="outlined"
                    placeholder="Où ? (ex. Paris)"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                />
                <StyledButton variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}>
                        Rechercher
                </StyledButton>
            </StyledSearchBar>
        </Container>
    );
};

export default JobSearch;
