import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';


export default function OAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider);
      console.log(result);
  
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email
        })
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
      
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }


  return (
    <button type='button' onClick={handleGoogleClick} className='bg-white border p-3 w-full flex items-center justify-center gap-1 font-semibold rounded-xl mt-8 shadow-md '><FcGoogle />Continue with Google</button>
  )
}
