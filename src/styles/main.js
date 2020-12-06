import styled from 'styled-components';
import { BiPlay as Play, BiPause as Pause } from 'react-icons/bi';
const mainColor = '#4CAF50';

export const VideoContainer = styled.div`
  position: relative;
  display: flex;
  margin: ${({fullscreen}) => fullscreen ? '0' : '2rem auto'};
  justify-content: center;
  width: ${({fullscreen}) => fullscreen ? '100vw' : '70vw'};
  background-color: black;
  height: auto;
  z-index: 999999;
  iframe {
    width: 100% !important;
    background-color: transparent;
    /* background-color: black; */
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
    width: 50vw !important;
    height: 50vh;
    z-index: ${({ advRunning }) => advRunning ? '9999999' : '-1'};
    opacity: ${({ advRunning }) => advRunning ? '1' : '0'};
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const List = styled.ul`
  list-style: none;
  margin: 3rem 0;
`;
export const ListElement = styled.li`
  ${({isPlaying}) => (
    isPlaying && `color: ${mainColor}`
  )}
`;

export const Button = styled.button`
  background-color: ${mainColor}; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 0 1rem;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  color: white;
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
