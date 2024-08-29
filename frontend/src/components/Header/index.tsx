import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ApartmentIcon from '@mui/icons-material/Apartment';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Context } from '../../index';
import { UserDTO } from '../../models/response/UserDTO';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import AuthModal from '../Modal/Regist-Auth/Auth';
import RegistrationModal from '../Modal/Regist-Auth/Registration';
import { API_URL } from '../../http';
import BurgerMenu from '../Menu/Menu';

export const Header = observer(() => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<UserDTO[]>([]);
    return (
        <header>
            <nav className="bg-white text-dark border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div style={{marginRight: "-15vw"}}><BurgerMenu/></div>
                    <span className="self-center text-xl  font-semibold whitespace-nowrap dark:text-white">
                        
                        <Link className={styles.logo} to="/">
                            <div>
                                <span
                                    className={'text-3xl  caret-amber-600'}
                                    style={{
                                        color: '#d97706',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <img
                                        src={`https://i.imgur.com/NrS9R03.png`}
                                        width={200}
                                    />
                                </span>
                            </div>
                        </Link>
                    </span>
                    <div className="flex items-center lg:order-2">
                        <AuthModal />
                        <RegistrationModal />
                    </div>
                    <div
                        className=" justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a
                                    href="/catalog"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent
                                                        lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-gray-600 dark:hover:bg-gray-700
                                                         dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Каталог
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
});
export default Header;
