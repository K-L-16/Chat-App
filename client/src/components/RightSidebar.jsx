
import personIcon from '../assets/person.png'

export default function RightSidebar({ selectedUser}) {
    return selectedUser && (
        <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll
            ${selectedUser ? 'max-md:hidden' : ''}`}>
            
            <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
                <img src={personIcon} alt="" className='w-20 aspect-square rounded-full ' />
                <h1 className='px-10 text-xl font-medium mx-auto flex items-center'>
                    <p className='w-2 h-2 rounded-full bg-green-500'></p>
                    {selectedUser.fullName}
                </h1>
                <p className='px-10 mx-auto'>{selectedUser.bio}</p>
            </div>

            <hr className='border-[#fffff50] my-4' />
            
            {/* tut里这里是media的image，但是我的应用不需要，可以考虑作为一个其他的备选项 */}

            {/* <div className='px-5 text-xs'>
                <p>Media</p>
                <div className='mt-2 '>

                </div>
            // </div> */}
            <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2
                bg-linear-to-r from-purple-400 via-violet-600 to-purple-700
             text-white text-sm font-light py-2 px-20 rounded-full cursor-pointer">
                Logout
            </button>

        </div>
    )
}