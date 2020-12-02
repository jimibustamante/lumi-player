import React, { useReducer, useContext, createContext } from 'react';
const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
  const initialState = {
    playing: true,
    fullscreen: false,
    currentVideoId: '',
    playlist: [],
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'PLAY': return {...state, playing: true};
      case 'PAUSE': return {...state, playing: false};
      case 'SET_FULLSCREEN': return {...state, fullscreen: action.payload}
      case 'SET_CURRENT_VIDEO_ID': return {...state, currentVideoId: action.payload}
      case 'SET_PLAYLIST': return {...state, playlist: action.payload}
      default: throw new Error('Unexpected action');
    }
  };
  const contextValue = useReducer(reducer, initialState);
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  )
};

export const usePlayer = () => {
  const contextValue = useContext(PlayerContext);
  return contextValue;
};