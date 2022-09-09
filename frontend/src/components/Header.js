import headerLogo from '../images/header__logo.svg';
import MobileUserHeader from './MobileUserHeader';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header({ isLoggedIn, onPage, onLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  const [isHamburgerMenuActive, setIsHamburgerMenuActive] = useState(false);
  const history = useHistory();
  const handleButtonClick = (evt) => {
    if (evt.target.value === 'Log in') {
      history.push('/signin');
    } else if (evt.target.value === 'Sign up') {
      history.push('/signup');
    } else if (evt.target.value === 'Log out') {
      onLogOut();
    }
  };
  let buttonContent = '';
  if (isLoggedIn) {
    buttonContent = 'Log out';
  } else if (!isLoggedIn && onPage === 'login') {
    buttonContent = 'Sign up';
  } else if (!isLoggedIn && onPage === 'signup') {
    buttonContent = 'Log in';
  }
  return (
    <>
      <MobileUserHeader
        isLoggedIn={isLoggedIn}
        onPage={onPage}
        isActive={isHamburgerMenuActive}
        onLogOut={onLogOut}
        loggedInUser={currentUser?.email}
      />
      <header className='header'>
        <img
          alt='around the US page logo'
          className='header__logo'
          src={headerLogo}
        />
        <div className='header__credential-container'>
          {isLoggedIn && (
            <p className='header__account'>{currentUser?.email}</p>
          )}
          <button
            type='button'
            className='header__button'
            value={buttonContent}
            onClick={handleButtonClick}
          >
            {buttonContent}
          </button>
        </div>
        <div
          className={`hamburger-menu ${
            isHamburgerMenuActive ? 'hamburger-menu_expand' : ''
          }`}
          onClick={() => setIsHamburgerMenuActive((current) => !current)}
        >
          <div className='bar-top'></div>
          <div className='bar-middle'></div>
          <div className='bar-bottom'></div>
        </div>
      </header>
    </>
  );
}

export default Header;
