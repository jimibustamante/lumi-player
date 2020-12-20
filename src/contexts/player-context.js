import React, { useReducer, useContext, createContext } from 'react';
import qs from 'query-string';
const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
  const searchParams = qs.parseUrl(window.location.href).query;
  const { adv_list_id: advListId, store: storeName } = searchParams;

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
    advListId,
    currentAdvId: null,

    storeName,
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
      case 'SET_CURRENT_ADV_ID': return {...state, currentAdvId: action.payload}
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