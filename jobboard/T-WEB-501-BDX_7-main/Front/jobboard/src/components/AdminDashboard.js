import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Container, TextField, Typography,Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Création d'un thème inspiré de Minecraft
const theme = createTheme({
  palette: {
    primary: {
      main: '#5C7C21', // Vert foncé de Minecraft
    },
    secondary: {
      main: '#8EBE55', // Vert clair de Minecraft
    },
  },
  typography: {
    fontFamily: 'Minecraft, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Pour garder l'aspect carré
          border: '3px solid black', // Bordure pixelisée
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: '10px 10px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px',
          border: '3px solid black',
        },
      },
    },
  },
});
const AdminDashboard = () => {
  const [view, setView] = useState('users');
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Token manquant. Veuillez vous reconnecter.");
      setLoading(false);
      return;
    }
    axios.get('http://localhost:5500/users/admin/dashboard', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data && Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        setError("La réponse du serveur n'est pas conforme.");
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Erreur détaillée:', err.response);
      setError("Erreur lors de la récupération des données.");
      setLoading(false);
    });
  };

  const fetchCompanies = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError("Token manquant. Veuillez vous reconnecter.");
      setLoading(false);
      return;
    }
    
    axios.get('http://localhost:5500/companies/admin/dashboard', { 
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data && Array.isArray(res.data.companies)) { 
        setCompanies(res.data.companies);
      } else {
        setError("La réponse du serveur pour les entreprises n'est pas conforme.");
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Erreur détaillée pour les entreprises:', err.response);
      setError("Erreur lors de la récupération des données des entreprises.");
      setLoading(false);
    });
  };


  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);

  const editUser = (user) => {
    setSelectedUser(user);
  };

  const editCompany = (company) => {
    setSelectedCompany(company);
  };

  const createUser = (newUser) => {
    axios.post('http://localhost:5500/users', newUser,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      const newUser = response.data.data;
      console.log("Réponse API:", response);
      console.log("État actuel des utilisateurs:", users);
      if (response.data.Status === "success") {
      setUsers([...users, response.data]);
      console.log('Nouvel utilisateur créé:', response.data);
    } else {
    console.warn('Problème avec le nouvel utilisateur:', newUser);
    }
  })
    .catch(error => {
      console.error('Erreur lors de la création de l utilisateur:', error);
    });
  };


  const createCompany = (newCompany) => {
    axios.post('http://localhost:5500/companies', newCompany,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      const newCompany = response.data.data;
      console.log("Réponse API:", response);
      console.log("État actuel des entreprises:", companies);
      if (response.data.Status === "success") {
      setCompanies([...companies, response.data]);
      console.log('Nouvelle entreprise créée:', response.data);
    } else {
    console.warn('Problème avec la nouvelle entreprise:', newCompany);
    }
  })
    .catch(error => {
      console.error('Erreur lors de la création de l entreprise:', error);
    });
  };

  const updateUser = (id, updatedUser) => {
    axios.put(`http://localhost:5500/users/${id}`, updatedUser, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      // Mettre à jour l'état des utilisateurs
      setUsers(users.map(user => user.idUsers === id ? response.data : user));
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
    });
  };

    const updateCompany = (id, updatedCompany) => {
        axios.put(`http://localhost:5500/companies/${id}`, updatedCompany, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          // Mettre à jour l'état des entreprises
          setCompanies(companies.map(company => company.idCompany === id ? response.data : company));
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour de lentreprise:', error);
        });
      };




  const deleteUser = (id) => {
    console.log("Tentative de suppression de l'utilisateur avec l'ID:", id);
    axios.delete(`http://localhost:5500/users/${id}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      console.log('Réponse du serveur lors de la suppression:', response);
      setUsers(users.filter(user => user.idUsers !== id));
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l’utilisateur:', error);
    });
  };
    const deleteCompany = (id) => {
      console.log("Tentative de suppression de l'entreprise avec l'ID:", id);
      axios.delete(`http://localhost:5500/companies/${id}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      console.log('Réponse du serveur lors de la suppression:', response);
      setCompanies(companies.filter(company => company.idCompany !== id));
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l’entreprise:', error);
    });
  };
  
  if (loading) {  return <div>Chargement...</div> }

  if (error) { return <div>{error}</div> }

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="2g" maxheight="">
        <Typography variant="h4" align="center" gutterBottom>
            Tableau de bord de l'Admin
        </Typography>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Button variant="contained" color="primary" onClick={() => setView('users')} style={{ marginRight: '10px' }}>
                Voir les Utilisateurs
            </Button>
            <Button variant="contained" color="primary" onClick={() => setView('companies')}>
                Voir les Entreprises
            </Button>
        </div>
        
        {view === 'users' && (
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5">Utilisateurs</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Prénom</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user, index) => (
            <TableRow key={index}>
            <TableCell>{user.idUsers}</TableCell>
            <TableCell>{user.Name}</TableCell>
            <TableCell>{user.LastName}</TableCell>
            <TableCell>{user.Mail}</TableCell>
            <TableCell>{user.CV}</TableCell>
            <TableCell>{user.Phone}</TableCell>
            <TableCell>{user.admin}</TableCell>
            <TableCell>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="primary" onClick={() => editUser(user)}>
                    Modifier
                </Button>
                <Button variant="contained" color="secondary" onClick={() => deleteUser(user.idUsers)}>
                    Supprimer
                </Button>
            </TableCell>
        </TableRow>
    ))}
                    </TableBody>
                </Table>
                
                {/* Formulaire pour créer un utilisateur */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const newUser = {
                        Name: e.target.Name.value,
                        LastName: e.target.LastName.value,
                        Mail: e.target.Mail.value,
                        Password: e.target.Password.value,
                    };
                    createUser(newUser);
                    fetchUsers();
                }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <TextField name="Name" label="Nom" variant="outlined" />
                        <TextField name="LastName" label="Nom de famille" variant="outlined" />
                        <TextField name="Mail" label="Email" variant="outlined" />
                        <TextField name="Password" label="Mot de passe" type="password" variant="outlined" />
                    </div>
                    <Button variant="contained" color="secondary" type="submit">
                        Créer
                    </Button>
                </form>
                
                {/* Formulaire conditionnel pour la mise à jour */}
                {selectedUser && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const updatedUser = {
                            Name: e.target.Name.value,
                            LastName: e.target.LastName.value,
                            Mail: e.target.Mail.value,
                            Password: e.target.Password.value,
                        };
                        updateUser(selectedUser.idUsers, updatedUser);
                        setSelectedUser(null);
                        fetchUsers();
                    }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <TextField name="Name" label="Nom" defaultValue={selectedUser.Name} variant="outlined" />
                            <TextField name="LastName" label="Nom de famille" defaultValue={selectedUser.LastName} variant="outlined" />
                            <TextField name="Mail" label="Email" defaultValue={selectedUser.Mail} variant="outlined" />
                            <TextField name="Password" label="Mot de passe" defaultValue={selectedUser.Password} type="password" variant="outlined" />
                        </div>
                        <Button variant="contained" color="secondary" type="submit">
                            Mettre à jour
                        </Button>
                    </form>
                )}
            </Paper>
        )}

            {view === 'companies' && (
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5">Companies</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>NameCompany</TableCell>
                            <TableCell>Mail</TableCell>
                            <TableCell>Adress</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {companies.map((companies, index) => (
            <TableRow key={index}>
            <TableCell>{companies.idCompany}</TableCell>
            <TableCell>{companies.NameCompany}</TableCell>
            <TableCell>{companies.MailCompany}</TableCell>
            <TableCell>{companies.Adress}</TableCell>
            <TableCell>{companies.Description}</TableCell>
            <TableCell>
                <Button variant="contained" color="primary" onClick={() => editCompany(companies)}>
                    Modifier
                </Button>
                <Button variant="contained" color="secondary" onClick={() => deleteCompany(companies.idCompany)}>
                    Supprimer
                </Button>
            </TableCell>
        </TableRow>
    ))}
                    </TableBody>
                </Table>
                
                {/* Formulaire pour créer un utilisateur */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const newCompany = {
                        NameCompany: e.target.NameCompany.value,
                        MailCompany: e.target.MailCompany.value,
                        Adress: e.target.Adress.value,
                        Description: e.target.Description.value,
                    };
                    createCompany(newCompany);
                    fetchCompanies();
                }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <TextField name="NameCompany" label="Nom" variant="outlined" />
                        <TextField name="MailCompany" label="Mail" variant="outlined" />
                        <TextField name="Adress" label="Adress" variant="outlined" />
                        <TextField name="Description" label="Description" variant="outlined" />
                    </div>
                    <Button variant="contained" color="secondary" type="submit">
                        Créer
                    </Button>
                </form>
                
                {/* Formulaire conditionnel pour la mise à jour */}
                {selectedCompany && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const updatedCompany = {
                            NameCompany: e.target.NameCompany.value,
                            MailCompany: e.target.MailCompany.value,
                            Adress: e.target.Adress.value,
                            Description: e.target.Description.value,
                        };
                        updateCompany(selectedCompany.idCompany, updatedCompany);
                        setSelectedCompany(null);
                        fetchCompanies();
                    }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <TextField name="NameCompany" label="Nom" defaultValue={selectedCompany.NameCompany} variant="outlined" />
                            <TextField name="MailCompany" label="Mail" defaultValue={selectedCompany.MailCompany} variant="outlined" />
                            <TextField name="Adress" label="Adress" defaultValue={selectedCompany.Adress} variant="outlined" />
                            <TextField name="Description" label="Description" defaultValue={selectedCompany.Description}  variant="outlined" />
                        </div>
                        <Button variant="contained" color="secondary" type="submit">
                            Mettre à jour
                        </Button>
                    </form>
                )}
            </Paper>
        )}
    </Container>
    </ThemeProvider>
);
}

export default AdminDashboard;