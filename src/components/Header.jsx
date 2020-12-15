import React from 'react';
import { usePlayer } from '../contexts/player-context';
import Barbanegra from '../assets/images/logo_barbanegra_white.png'
import Barbazul from '../assets/images/logo_barbazul_white.png'
import { HeaderContainer } from '../styles/main';

const Header = () => {
  const [playerState] = usePlayer();
  const { storeName } = playerState;
  const src = () => {
    switch (storeName) {
      case 'barbazul':
        return Barbazul;
      case 'barbanegra':
        return Barbanegra;
      default:
        return Barbazul;
    }
  }

  return (
    <HeaderContainer>
      <img src={src()} alt='' />
    </HeaderContainer>
  );
};

export default Header;