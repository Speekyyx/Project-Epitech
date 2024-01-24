import styled from 'styled-components';

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; 
`;
export const Container = styled.div`
background-color: #fff;
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 678px;
max-width: 100%;
min-height: 400px;
`;

export const SignupContainer = styled.div`
position: absolute;
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
left: 0;
width: 50%;
opacity: 0;
z-index: 1;
${props => props.showLoginForm !== true ? `
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
` 
: null}
`;
export const LoginContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
left: 0;
width: 50%;
z-index: 2;
${props => (props.showLoginForm !== true ? `transform: translateX(100%);` : null)}
`;
export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
`;

    export const Title = styled.h1`
    font-family: Minecraft, monospace;
    font-weight: bold;
    margin-top: 10px;
 `;
    export const Input = styled.input`
    font-family: Minecraft, monospace;
    background-color: #eee;
 border: none;
 padding: 12px 15px;
 margin: 8px 0;
 width: 100%;
 `;
    export const Button = styled.button`
    font-family: Minecraft, monospace;
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
 `;
    export const GhostButton = styled(Button)`
    font-family: Minecraft, monospace;
    background-color: transparent;
 border-color: #ffffff;
 `;
    export const Anchor = styled.a`
    font-family: Minecraft, monospace;
    color: #333;
 font-size: 14px;
 text-decoration: none;
 margin: 15px 0;
 `;
    export const OverLayContainer = styled.div`
    position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;
${props =>
  props.showLoginForm !== true ? `transform: translateX(-100%);` : null}
`;

    export const Overlay = styled.div`
    background: #ff416c;
background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
background: linear-gradient(to right, #ff4b2b, #ff416c);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.showLoginForm !== true ? `transform: translateX(50%);` : null)}
`;
    export const OverLayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
 `;
    export const LeftOverLayPanel = styled(OverLayPanel)`
    transform: translateX(-20%);
   ${props => props.showLoginForm !== true ? `transform: translateX(-10%);` : null}
 `;
    export const RightOverLayPanel = styled(OverLayPanel)`
    right: 0;
     transform: translateX(10%);
     ${props => props.showLoginForm !== true ? `transform: translateX(20%);` : null}
 `;
    export const Paragraph = styled.p`
    font-family: Minecraft, monospace;
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.5px;
    margin: 50px 0 30px;
 `;










