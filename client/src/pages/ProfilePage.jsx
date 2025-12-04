import { useState } from "react"
import { useNavigate } from "react-router-dom"
import personIcon from '../assets/person.png'
import logoBig from '../assets/logo-big.png'




export default function ProfilePage() {

    const [selectImg, setselectImg] = useState(null)
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [bio, setBio] = useState('Hi everyone')

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
            <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-white flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
                    <h3 className="text-lg">Profile</h3>
                    <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
                        <input onChange={(e)=>setselectImg(e.target.files[0])} type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
                        <img src={selectImg ? URL.createObjectURL(selectImg) : personIcon} alt="" className={`w-12 h-12 border-black${selectImg && 'rounded-full'}`} />
                        upload profile image
                    </label>
                    <input type="text" required placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" />
                    <textarea className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" rows={4} placeholder="..." onChange={(e) => setBio(e.target.value)} value={bio}></textarea>
                    <button type="submit" className="bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-full text-lg cursor-pointer">Save</button>
                </form>
                <img src={logoBig} alt="" className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"/>
            </div>
            
        </div>
    )
}