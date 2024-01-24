import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Profilepage({ onClose }) {
  const authToken = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    Name: '',
    LastName: '',
    Mail: '',
    Password: '',
    CV: '',
    Phone: '',
    Role: '',
    Img: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5500/users/2', userData, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Utilisez le jeton d'authentification ici
        },
        withCredentials: true
      });
      if (response.data.message === 'User updated successfully') {
        console.log('Mise à jour réussie');
        onClose();
      } else {
        console.log('Erreur de mise à jour');
      }
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Profil utilisateur</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" name="Name" label="Nom" value={userData.Name} onChange={handleChange} />
          <TextField fullWidth margin="normal" name="LastName" label="Prénom" value={userData.LastName} onChange={handleChange} />
          <TextField fullWidth margin="normal" name="Mail" label="Email" value={userData.Mail} onChange={handleChange} />
          <TextField fullWidth margin="normal" name="Password" label="Mot de passe" type="password" value={userData.Password} onChange={handleChange} />
          <TextField fullWidth margin="normal" name="CV" label="CV" value={userData.CV} onChange={handleChange} />
          <TextField fullWidth margin="normal" name="Phone" label="Téléphone" value={userData.Phone} onChange={handleChange} />
          {/* Pour le champ d'image, vous pouvez ajouter d'autres logiques pour la gestion des fichiers */}
          <TextField fullWidth margin="normal" type="file" name="Img" onChange={handleChange} />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Annuler
            </Button>
            <Button type="submit" color="primary">
              Mettre à jour
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Profilepage;
