import { useNavigate } from 'react-router-dom'
import menuIcon from '../assets/menu.png'
import logo from '../assets/message-square-quote.png'
import search_icon from '../assets/user-round-search.png'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import personIcon from '../assets/person.png';
import { ThemeContext } from '../../context/ThemeContext';




export default function Sidebar() {

    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setunseenMessages } = useContext(ChatContext)

    const { logout, onlineUsers } = useContext(AuthContext)

    const [input, setInput] = useState(false)

    const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users

    const { theme, toggleTheme } = useContext(ThemeContext);


    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, [onlineUsers])

    return (
        <div
            className={`h-full p-5 flex flex-col gap-4 border-r overflow-hidden ${theme === 'dark'
                ? 'bg-[#404560] border-slate-800 text-slate-100'
                : 'bg-[#efefef] border-gray-100 text-slate-900'
                } ${selectedUser ? 'max-md:hidden' : ''}`}
        >


            <div className="pd-5">
                <div className="flex justify-between items-center">
                    <img src={logo} alt="logo" className={`max-w-40 ${theme === 'dark' ? '' : 'filter brightness-0'}`} />
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition
    ${theme === 'dark'
                                    ? 'bg-slate-800 border border-slate-600 text-amber-300 hover:bg-slate-700'
                                    : 'bg-white border border-gray-200 text-slate-500 hover:bg-gray-100'
                                } active:scale-95`}
                        >
                            {theme === 'dark' ? '☀︎' : '☾'}
                        </button>


                        <div className="relative py-2 group">
                            <img
                                src={menuIcon}
                                alt="Menu"
                                className={`max-h-5 cursor-pointer ${theme === 'dark' ? '' : 'filter brightness-0'
                                    }`}
                            />

                            <div
                                className={`absolute top-full right-0 z-20 w-32 p-5 rounded-md border text-sm
    ${theme === 'dark'
                                        ? 'bg-slate-900 border-slate-700 text-slate-100'
                                        : 'bg-white border-gray-200 text-slate-700 shadow-lg'
                                    } hidden group-hover:block`}
                            >

                                <p className='cursor-pointer' onClick={() => navigate('/profile')}>Edit Profile</p>
                                <hr className='my-2 border-t border-t-gray-500' />
                                <p className='cursor-pointer text-sm text-red-600' onClick={() => logout()}>LogOut</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`rounded-full flex items-center gap-2 py-2.5 px-4 mt-5 border
    ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 shadow-none'
                            : 'bg-white border-gray-200 shadow-sm'
                        }`}
                >
                    <img
                        src={search_icon}
                        alt="Search"
                        className={`w-4 opacity-70 ${theme === 'dark' ? '' : 'filter brightness-0'
                            }`}
                    />
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className={`bg-transparent border-none outline-none text-sm flex-1
      ${theme === 'dark'
                                ? 'text-slate-100 placeholder-slate-400'
                                : 'text-slate-900 placeholder-gray-400'
                            }`}
                        placeholder="Search user..."
                    />
                </div>


            </div>

            <div className="flex-1 mt-4 overflow-y-auto pr-1 flex flex-col gap-1">
                {filteredUsers.map((user, index) => (
                    <div
                        onClick={() => { setSelectedUser(user); setunseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
                        key={index}
                        className={`relative flex items-center gap-2 p-2.5 pl-3 cursor-pointer max-sm:text-sm
                            rounded-xl transition-colors
                            ${theme === 'dark'
                                ? selectedUser?._id === user._id
                                    ? 'bg-slate-800'
                                    : 'bg-slate-900/40 hover:bg-slate-800/80'
                                : selectedUser?._id === user._id
                                    ? 'bg-blue-200'
                                    : 'bg-white hover:bg-blue-100'
                            }`}



                    >

                        <img
                            src={user?.profilePic || personIcon}
                            alt={user.fullName}
                            className={`w-10 h-10 rounded-full object-cover ring-1 ring-gray-200 
                                ${theme === 'dark'
                                    ? user?.profilePic
                                        ? ''
                                        : ''
                                    : user?.profilePic
                                        ? ''
                                        : 'filter brightness-0'
                                }`}
                        />
                        <div className='flex flex-col leading-5'>
                            <p>{user.fullName}</p>
                            {onlineUsers.includes(user._id)
                                ? <span className="text-green-500 text-xs">Online</span>
                                : <span className="text-gray-400 text-xs">Offline</span>
                            }

                        </div>
                        {unseenMessages[user._id] > 0 && (
                            <p className="absolute top-4.5 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-blue-500 text-white">
                                {unseenMessages[user._id]}
                            </p>
                        )}

                    </div>

                ))}

            </div>
        </div>
    )
}