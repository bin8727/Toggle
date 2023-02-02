import logo from './logo.svg';
import styled, { createGlobalStyle, keyframes, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from "./theme";
import {useRecoilValue, useSetRecoilState} from 'recoil';
import { isDarkAtom } from "./atoms";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setColor = useSetRecoilState(isDarkAtom);
  const toggleChangeColor = () => {setColor((prev) => !prev)};

  return (
    <>
      <ThemeProvider theme={isDark? darkTheme : lightTheme}>
        <GlobalStyle />
        <Container>
          <Header>
            <Img src={logo} />
            <Toggle>
              <input type='checkbox' onClick={toggleChangeColor} />
              <span></span>
            </Toggle>
          </Header>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${(props) => props.theme.bgColor}
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
const Container = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  background-color: ${(props) => props.theme.bgColor}
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Img = styled.img`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${Spin} infinite 100s linear;
  }
`;
const Toggle = styled.label`
  position: relative;
  width: 60px;
  height: 34px;
  span {
    position: absolute;
    inset: 0;
    background-color: gray;
    transition: 0.4s;
    border-radius: 34px;
    &::before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.5s;
      border-radius: 50%;
    }
  }
  input {
    display: none;
    &:checked + span {
      background-color: black;
    }
    &:checked + span::before {
      transform: translateX(26px);
    }
  }
`;