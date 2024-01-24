import React from 'react';
import styled from 'styled-components';
import footer from '../img/footer.png';

const BedrockFooter = styled.div`
    background-color: url(${footer}); 
    padding: 0;
    display: flex;
    justify-content: space-between;
    font-family: 'Minecraft', monospace; 
    border: 5px solid #black;
`;

const Section = styled.div`
    flex: 1;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5); // Un fond semi-transparent pour rendre le texte plus lisible sur la texture de roche-mère.
    border: 3px solid #555;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h3`
    color: #AAA;
    border-bottom: 2px solid #888;
    padding-bottom: 5px;
`;

const Text = styled.p`
    color: #DDD;
`;

const LinkList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const LinkItem = styled.li`
    margin-bottom: 10px;
`;

const StyledLink = styled.a`
    color: #AAA;
    text-decoration: none;
    &:hover {
        color: #FFF;
        text-decoration: underline;
    }
`;

const SocialIcon = styled.i`
    font-size: 24px;
    margin-right: 10px;
    color: #DDD;
    &:hover {
        color: #FFF;
    }
`;

const Footer = () => {
    return (
        <BedrockFooter>
            <Section>
                <Title>À propos</Title>
                <Text>Notre mission est de connecter les professionnels du monde entier avec les opportunités d'emploi qui leur conviennent le mieux.</Text>
            </Section>
            <Section>
                <Title>Liens rapides</Title>
                <LinkList>
                    <LinkItem><StyledLink href="#">Accueil</StyledLink></LinkItem>
                    <LinkItem><StyledLink href="#">Recherche d'emploi</StyledLink></LinkItem>
                    <LinkItem><StyledLink href="#">Contactez-nous</StyledLink></LinkItem>
                    <LinkItem><StyledLink href="#">FAQ</StyledLink></LinkItem>
                </LinkList>
            </Section>
            <Section>
                <Title>Contact</Title>
                <Text>Email: contact@notresite.com</Text>
                <Text>Téléphone: +33 1 23 45 67 89</Text>
            </Section>
            <Section>
                <Title>Suivez-nous</Title>
                <div>
                    <a href="#"><SocialIcon className="fab fa-facebook"></SocialIcon></a>
                    <a href="#"><SocialIcon className="fab fa-twitter"></SocialIcon></a>
                    <a href="#"><SocialIcon className="fab fa-linkedin"></SocialIcon></a>
                    <a href="#"><SocialIcon className="fab fa-instagram"></SocialIcon></a>
                </div>
            </Section>
        </BedrockFooter>
    );
}

export default Footer;
