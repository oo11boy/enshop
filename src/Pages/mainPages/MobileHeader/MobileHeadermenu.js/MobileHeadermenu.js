import React, { useContext } from 'react';
import './MobileHeadermenu.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { MenumobileContext } from '../../../../Contexts/MenumobileContext';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineExitToApp } from 'react-icons/md';
import { useAuth } from '../../../../Contexts/AuthContext';

export default function MobileHeadermenu() {
  const menuinfo = useContext(MenumobileContext);
  const { isLoggedIn, logout } = useAuth(); // استفاده از useAuth برای وضعیت لاگین و خروج

  return (
    <div className="headermenu">
      <div className="menumobicon">
        {menuinfo.menustatus === false ? (
          <AiOutlineMenu onClick={menuinfo.Showmenu} />
        ) : (
          <GrClose onClick={menuinfo.Showmenu} />
        )}
      </div>
      <div className="logomob">shop</div>
      <div className="helpmob">
        {isLoggedIn && (
          <div onClick={logout} className="signoutmobheader">
            <MdOutlineExitToApp />
          </div>
        )}
        <FaMoon />
      </div>
    </div>
  );
}
