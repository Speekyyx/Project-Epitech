import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import marron from '../img/marron.png';

const MinecraftBody = styled(Box)`
    flexGrow: 1;
    background: url(${marron});  
    backgroundRepeat: no repeat;  
    boxShadow: 0 4px 8px rgba(0,0,0,0.1); 
    border: 5px solid #3e290c;  
`;

const Body = ({ children }) => {
    return <MinecraftBody>{children}</MinecraftBody>;
};

export default Body;
