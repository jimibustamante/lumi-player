import React, { useReducer, useContext, createContext } from 'react';
const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
  const initialState = {
    // Vimeo Player
    playing: true,
    fullscreen: false,
    currentVideoId: '',
    playlist: [],

    // Overlay
    showOverlay: false,
    
    // Advs
    advsList: [],
    advRunning: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'PLAY': return {...state, playing: true};
      case 'PAUSE': return {...state, playing: false};
      case 'SET_FULLSCREEN': return {...state, fullscreen: action.payload}
      case 'TOGGLE_FULLSCREEN': return {...state, fullscreen: !state.fullscreen}
      case 'SET_CURRENT_VIDEO_ID': return {...state, currentVideoId: action.payload}
      case 'SET_PLAYLIST': return {...state, playlist: action.payload}
      case 'SHOW_VIDEO_OVERLAY': return {...state, showOverlay: true}
      case 'HIDE_VIDEO_OVERLAY': return {...state, showOverlay: false}
      case 'SET_ADVS_LIST': return {...state, advsList: action.payload}
      case 'SET_ADV_RUNNING': return {...state, advRunning: action.payload}
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