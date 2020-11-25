import styled from 'styled-components';
import { BiPlay as Play, BiPause as Pause } from 'react-icons/bi';

const mainColor = '#4CAF50';

export const VideoContainer = styled.div`
  position: relative;
  display: flex;
  margin: 2rem auto;
  justify-content: center;
  width: 70vw;
  background-color: black;
  height: auto;
  iframe {
    width: 100% !important;
    background-color: black;
  }
`;

export const Video = styled.div`
  width: 100%;
  iframe {
    width: ${({fullscreen}) => fullscreen ? '100vw !important' : 'inherit'};
    ${({fullscreen}) => fullscreen ? 'height: 100vh !important' : ''};
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

export const ToggleContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const PlayButton = styled(Play)`
  color: ${mainColor};
`;

export const PauseButton = styled(Pause)`
  color: ${mainColor};
`;
