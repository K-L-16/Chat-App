import personIcon from '../assets/person.png'
import arrowIcon from '../assets/arrow.png'
import helpIcon from '../assets/info.png'
import galleryIcon from '../assets/images.png'
import logo from '../assets/message-square-quote.png'
import sendIcon from '../assets/send.png'
import { messagesDummyData } from '../assets/assets'
import { useEffect, useRef } from 'react'
import { formatMessageTime } from '../lib/utils'

export default function ChatContainer({ selectedUser, setSelectedUser }) {
    
    const scrollEnd = useRef()

    useEffect(() => {
        if (scrollEnd.current) {
            scrollEnd.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [selectedUser])
    return selectedUser ? (
        
        <div className='h-full overflow-scroll relative backdrop-blur-lg'>
            {/* //{Headers} */}
            <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
                <img src={personIcon} alt="person" className='w-8 rounded-full' />
                <p className='flex-1 text-lg text-white flex items-center gap-2'>
                    Steven Liu
                    <span className='w-2 h-2 rounded-full bg-green-500'></span>
                </p>
                <img src={arrowIcon} alt="" className='md:hidden max-w-7' onClick={()=>setSelectedUser(null)}/>
                <img src={helpIcon} alt="" className='max-md:hiddern max-w-5' />

            </div>
            {/* //chat area  */}
            <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
                {messagesDummyData.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== 'fhahefawhhifehao' && 'flex-row-reverse'}`}>
                        {msg.image ? (
                            <img src={msg.image} alt='' className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'/>
                        ) : (
                                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === 'fheahf' ? 'rounded-br-none':'rounded-bl-none'}`}>{msg.text}</p>
                        )}
                        <div className='text-center text-xs'>
                            <img src={personIcon} alt="" className='w-7 rounded-full' />
                            <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>

                        </div>

                    </div>
                ))}
                
                <div ref={scrollEnd}></div>

            </div>
            {/* text area  */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur">
                    <label htmlFor="image" className="cursor-pointer">
                        <img src={galleryIcon} alt="" className="w-5" />
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/png, image/jpeg"
                        hidden
                    />
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/60 text-sm"
                    />
                    <img src={sendIcon} alt="" className="w-6 cursor-pointer" />
                </div>
            </div>

        </div>

        
    ) : (
            <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
                <img src={logo} alt="" className='max-w-16' />
                <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
            </div>
    )
}