import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import personIcon from '../assets/person.png'
import logoBig from '../assets/logo-big.png'
import { AuthContext } from "../../context/AuthContext"
import arrowIcon from '../assets/arrow.png'
import { ThemeContext } from '../../context/ThemeContext';






export default function ProfilePage() {

    const { authUser, updateProfile } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);


    const [selectImg, setselectImg] = useState(null)
    const navigate = useNavigate();
    const [name, setName] = useState(authUser.fullName)
    const [bio, setBio] = useState(authUser.bio)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectImg) { //no image
            await updateProfile({ fullName: name, bio })
            navigate('/')
            return
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectImg);
        reader.onload = async () => {
            const base64Image = reader.result;
            await updateProfile({ profilePic: base64Image, fullName: name, bio })
            navigate('/');
        }

    }

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 ${theme === 'dark' ? 'bg-[#050817]' : 'bg-[#f5f5f7]'
                }`}
        >

            <div
                className={`relative w-full max-w-3xl rounded-3xl flex items-center justify-between max-sm:flex-col-reverse border ${theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white border-gray-100 text-slate-900 shadow-lg'
                    }`}
            >


                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow-sm active:scale-95 transition
                        ${theme === 'dark'
                            ? 'bg-slate-800 border border-slate-700 hover:bg-slate-700'
                            : 'bg-white border border-gray-200 hover:bg-gray-100'
                        }`}

                >
                    <img
                        src={arrowIcon}
                        alt="Back"
                        className={`w-4 h-4 ${theme === 'dark' ? '' : 'filter brightness-0'}`}
                    />

                </button>


                <form
                    onSubmit={handleSubmit}
                    className={`flex flex-col gap-5 p-10 flex-1 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                        }`}

                >


                    <h3 className="text-xl font-semibold">Profile</h3>

                    <label
                        htmlFor="avatar"
                        className={`flex items-center gap-3 cursor-pointer text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
                            }`}
                    >
                        <input
                            onChange={(e) => setselectImg(e.target.files[0])}
                            type="file"
                            id="avatar"
                            accept=".png, .jpg, .jpeg"
                            hidden
                        />

                        <img
                            src={selectImg ? URL.createObjectURL(selectImg) : personIcon}
                            alt=""
                            className={`
    w-12 h-12 object-cover rounded-full
    ${!selectImg && theme !== "dark" ? "filter brightness-0" : ""}
  `}
                        />

                        upload profile image
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Your name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                    />
                    <textarea
                        rows={4}
                        placeholder="..."
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        className="p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm resize-none"
                    />
                    <button
                        type="submit"
                        className={`mt-2 w-full rounded-full text-sm font-semibold tracking-wide py-2.5
                            transition-colors cursor-pointer ${theme === 'dark'
                                ? 'bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700'
                                : 'bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700'
                            }`}>

                        Save
                    </button>

                </form>
                <img
                    src={authUser?.profilePic || logoBig}
                    alt=""
                    className={`w-40 h-40 object-cover rounded-2xl mx-10 max-sm:mt-6 ${selectImg && 'rounded-full'} ${theme === 'dark'
                        ? authUser?.profilePic
                            ? ''
                            : ''
                        : authUser?.profilePic
                            ? ''
                            : 'filter brightness-0'
                        }`}
                />

            </div>

        </div>
    )
}