import React from 'react';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ props }) => {
  return (
    <React.Fragment>
      <header className="Header_section">
        <h1 className="Header_title">INSTAX</h1>
        {/* //TODO:have to link profile page */}
        {props === 'Homepage' && (
          <>
            <Link>
              <AccountCircleRoundedIcon
                fontSize="large"
                className="Header_link"
              />
            </Link>
          </>
        )}
      </header>
    </React.Fragment>
  );
};

export default Header;
