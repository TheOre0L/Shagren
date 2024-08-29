import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { observer } from 'mobx-react-lite';
import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_URL } from '../App';
import { Context } from '../index';
import { UserDTO } from '../models/response/UserDTO';
import styles from './Header/Header.module.scss';
import BurgerMenu from './Menu/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCart from './ShopingCard/ShopingCart';
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export const AuthHeader = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<UserDTO[]>([]);

    return (
        <header>
            <nav className=" text-dark border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div style={{marginRight: "-15vw"}}><BurgerMenu/></div>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        
                        <Link className={styles.logo} to="/">
                            <div>
                            
                                <span
                                    className={'text-3xl caret-amber-600'}
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
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-stone-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Меню
                                    <ChevronDownIcon
                                        className="-mr-1 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href={`${CLIENT_URL}/user/${store.user.id}`}
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <AccountCircleIcon className="mr-4" />
                                                    Профиль
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to={`${CLIENT_URL}/settings`}
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <SettingsIcon className="mr-4" />
                                                    Настройки
                                                </Link>
                                            )}
                                        </Menu.Item>

                                        <form>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        type="submit"
                                                        onClick={() =>
                                                            store.logout()
                                                        }
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-700',
                                                            'block w-full px-4 py-2 text-left text-sm'
                                                        )}
                                                    >
                                                        <LogoutIcon className="mr-4" />
                                                        Выйти
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <ShoppingCart/>
                    </div>
                    <div
                        className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a
                                    href="/posts"
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
};

export default observer(AuthHeader);
