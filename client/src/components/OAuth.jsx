import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
  
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
      
      if (res.ok) {
        dispatch(signInSuccess(data));
        toast.success('Sign in successful!')
        navigate('/');
      }
      
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  }


  return (
    <button type='button' onClick={handleGoogleClick} className='bg-white border p-3 w-full flex items-center justify-center gap-1 font-semibold rounded-xl mt-8 shadow-md '><FcGoogle />Continue with Google</button>
  )
}
