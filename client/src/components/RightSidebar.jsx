
import { useContext, useEffect, useState } from 'react'
import personIcon from '../assets/person.png'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext';


export default function RightSidebar() {

    const { selectedUser, messages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext);

    const [msgImages, setMsgImages] = useState([])

    //get all the images from the messages and set them to state
    useEffect(() => {
        setMsgImages(
            messages.filter(msg => msg.image).map(msg=>msg.image)
        )
    },[messages])
    return selectedUser && (
        <div
            className={`relative w-full h-full flex flex-col border-l ${theme === 'dark'
                ? 'bg-[#404560] border-slate-800 text-slate-100'
                    : 'bg-[#f7f7fb] border-gray-100 text-slate-900'
                } ${selectedUser ? 'max-md:hidden' : ''}`}
        >


            
            <div className="px-5 pt-10 pb-6">
                <div
                    className={`rounded-2xl px-5 py-6 flex flex-col items-center gap-2 ${theme === 'dark'
                            ? 'bg-slate-900 border border-slate-700'
                            : 'bg-white shadow-sm border border-gray-100'
                        }`}
                >

                    <img
                        src={selectedUser?.profilePic || personIcon}
                        alt=""
                        className={`w-20 aspect-square rounded-full object-cover ${theme === 'dark'
                        ? selectedUser?.profilePic
                            ? ''
                            : ''
                        : selectedUser?.profilePic
                            ? ''
                            : 'filter brightness-0'
                        }`}
                    />
                    <h1 className="text-base font-semibold flex items-center gap-2">
                        {onlineUsers.includes(selectedUser._id) && (
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                        )}
                        {selectedUser.fullName}
                    </h1>
                    <p className="text-xs text-gray-500 text-center">
                        {selectedUser.bio}
                    </p>
                </div>
            </div>


            <hr
                className={`mx-5 ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
                    }`}
            />


            

            <div className="px-5 pt-4 text-xs flex-1 overflow-y-auto">
                <p
                    className={`text-[11px] font-semibold tracking-wide uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                >
                    Img History
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">

                    {msgImages.map((url, index) => (
                        <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
                            <img src={url} alt="" className='w-20 h-15 rounded-md object-cover '/>
                        </div>
                    ))}

                </div>
            </div>

            <div
                className={`px-5 py-4 mt-auto border-t ${theme === 'dark'
                    ? 'border-slate-800 bg-[#404560]'
                        : 'border-gray-100 bg-[#f7f7fb]'
                    }`}
            >

                <button
                    onClick={() => logout()}
                    className="w-full rounded-full bg-violet-500
                    text-white text-sm font-semibold
                    py-2.5 hover:bg-violet-600 active:bg-violet-700
                    transition-colors cursor-pointer"
                  
                >
                    Logout
                </button>

            </div>


        </div>
    )
}