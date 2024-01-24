import React, { useState } from 'react';

const ClientInfo = ({ setIsClientInfoVisible }) => {

    const [phone, setPhone] = useState('');
    //const [cv, setCv] = useState(null);
    //const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setIsClientInfoVisible(false);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

   // const handleCVUpload = (e) => {
        //setCv(e.target.files[0]);
    //};

    //const handleImageUpload = (e) => {
        //setImage(e.target.files[0]);
    //};

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="client-info">
            <h2>Informations du Client</h2>
            <button onClick={handleClose}>Fermer</button>
            
            <div className="info-section">
                <label>Email: </label>
                <span>client@mail.com (Non modifiable)</span>
            </div>

            <div className="info-section">
                <label>Name: </label>
                <span>John (Non modifiable)</span>
            </div>

            <div className="info-section">
                <label>LastName: </label>
                <span>Doe (Non modifiable)</span>
            </div>

            <div className="info-section">
                <label>Numéro de téléphone: </label>
                <input type="text" value={phone} onChange={handlePhoneChange} />
            </div>

            <div className="info-section">
                <label>CV: </label>
                <input type="file"/>
            </div>

            <div className="info-section">
                <label>Image: </label>
                <input type="file"/>
            </div>

            <div className="info-section">
                <label>Mot de passe: </label>
                <input type="password" value={password} onChange={handlePasswordChange} />
            </div>

            <button onClick={() => {
                // Ajoutez votre logique pour sauvegarder les informations ici.
            }}>
                Sauvegarder
            </button>
        </div>
    );
};

export default ClientInfo;
