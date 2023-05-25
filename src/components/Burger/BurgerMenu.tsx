import React, { useState } from 'react';
import './BurgerMenu.scss';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import Togglelang from '../ToggleLang/ToggleLang';
import { useAuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BurgerMenu: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const { t } = useTranslation('common');

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = () => {
    handleCloseMenu();
  };

  return (
    <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
      <div className="burger-icon" onClick={handleToggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {isOpen &&
        (user ? (
          <div className="menu-overlay" onClick={handleCloseMenu}>
            <div className="menu" onClick={(e) => e.stopPropagation()}>
              <NavLink to={ROUTES.welcome} onClick={handleMenuItemClick} className="menu_item">
                {t('routes.welcome')}
              </NavLink>
              <NavLink to={ROUTES.editor} onClick={handleMenuItemClick} className="menu_item">
                {t('routes.editor')}
              </NavLink>
              <div className="menu_item">
                {t('languages.language')}: <Togglelang />
              </div>
              <button className="menu_item_exit menu_item" onClick={handleLogout}>
                <span className="menu_item_text">{t('button.sing_out')}</span>
                <svg
                  className="menu_item_icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66645 15.3328C6.66645 15.5096 6.59621 15.6792 6.47119 15.8042C6.34617 15.9292 6.17661 15.9995 5.9998 15.9995H1.33329C0.979679 15.9995 0.640552 15.859 0.390511 15.609C0.140471 15.3589 0 15.0198 0 14.6662V1.33329C0 0.979679 0.140471 0.640552 0.390511 0.390511C0.640552 0.140471 0.979679 0 1.33329 0H5.9998C6.17661 0 6.34617 0.0702357 6.47119 0.195256C6.59621 0.320276 6.66645 0.48984 6.66645 0.666645C6.66645 0.84345 6.59621 1.01301 6.47119 1.13803C6.34617 1.26305 6.17661 1.33329 5.9998 1.33329H1.33329V14.6662H5.9998C6.17661 14.6662 6.34617 14.7364 6.47119 14.8614C6.59621 14.9865 6.66645 15.156 6.66645 15.3328ZM15.8045 7.52809L12.4713 4.19486C12.3462 4.06977 12.1765 3.9995 11.9996 3.9995C11.8227 3.9995 11.653 4.06977 11.528 4.19486C11.4029 4.31995 11.3326 4.48961 11.3326 4.66651C11.3326 4.84342 11.4029 5.01308 11.528 5.13817L13.7237 7.33309H5.9998C5.823 7.33309 5.65343 7.40333 5.52841 7.52835C5.40339 7.65337 5.33316 7.82293 5.33316 7.99974C5.33316 8.17654 5.40339 8.34611 5.52841 8.47113C5.65343 8.59615 5.823 8.66638 5.9998 8.66638H13.7237L11.528 10.8613C11.4029 10.9864 11.3326 11.1561 11.3326 11.333C11.3326 11.5099 11.4029 11.6795 11.528 11.8046C11.653 11.9297 11.8227 12 11.9996 12C12.1765 12 12.3462 11.9297 12.4713 11.8046L15.8045 8.47139C15.8665 8.40948 15.9156 8.33595 15.9492 8.25502C15.9827 8.17409 16 8.08735 16 7.99974C16 7.91213 15.9827 7.82538 15.9492 7.74445C15.9156 7.66352 15.8665 7.59 15.8045 7.52809Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="menu-overlay" onClick={handleCloseMenu}>
            <div className="menu" onClick={(e) => e.stopPropagation()}>
              <NavLink to={ROUTES.signIn} onClick={handleMenuItemClick} className="menu_item">
                {t('button.sing_in')}
              </NavLink>
              <NavLink to={ROUTES.signUp} onClick={handleMenuItemClick} className="menu_item">
                {t('button.sing_up')}
              </NavLink>
              <div className="menu_item">
                {t('languages.language')}: <Togglelang />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BurgerMenu;