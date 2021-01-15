import styled from 'styled-components';
import { BiPlay as Play, BiPause as Pause } from 'react-icons/bi';
const mainColor = 'white';
const textColor = 'black'

export const AppContainer = styled.div`
  background-color: black;
`;

export const HeaderContainer = styled.div`
  width: 100vw;
  height: auto;
  padding: 2rem 0;
  img {
    width: 30%;
    max-width: 300px;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  display: flex;
  margin: ${({fullscreen}) => fullscreen ? '0' : '0 auto'};
  justify-content: center;
  width: ${({fullscreen}) => fullscreen ? '100vw' : '50vw'};
  background-color: black;
  height: auto;
  z-index: 999999;
  iframe {
    width: 100% !important;
    background-color: transparent;
  }
`;

export const Video = styled.div`
  width: 100%;
  iframe {
    background-color: transparent;
    width: ${({fullscreen}) => fullscreen ? '100vw !important' : 'inherit'};
    ${({fullscreen}) => fullscreen ? 'height: 100vh !important' : ''};
  }
`;

export const AdvVideo = styled.div`
  iframe {
    position: absolute;
    background-color: transparent;
    width: 100% !important;
    height: 100%;
    z-index: ${({ advRunning }) => advRunning ? '100' : '-1'};
    opacity: ${({ advRunning }) => advRunning ? '1' : '0'};
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const List = styled.ul`
  list-style: none;
  margin: 3rem 0;
  color: gray;
`;
export const ListElement = styled.li`
  ${({isPlaying}) => (
    isPlaying && `color: ${mainColor}`
  )}
`;

export const Button = styled.button`
  background-color: ${mainColor}; /* Green */
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 0 1rem;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  color: ${textColor};
  transition-duration: 0.4s;
`;

export const Overlay = styled.div`
  background-color: transparent;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: opacity .5s ease-in-out;
  user-select: none;
`;

export const PlayButton = styled(Play)`
  color: ${mainColor};
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export const PauseButton = styled(Pause)`
  color: ${mainColor};
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export const FullscreenLogo = styled.img`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 300px;
  height: auto;
  z-index: 9999999;
`;
