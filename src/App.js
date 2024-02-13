import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 

import { auth, db } from './firebase-config';
import Login from './pages/login';
import Home from './pages/home';

auth.languageCode = 'it';

function App() {
  const [isLoggedIn, setIsLogged] = useState(false);
  const [processing, setProcessing] = useState(true);
  const [userData, setUserData] = useState({})

  useEffect(()=> {
    // setupRecapture();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.phoneNumber)
      } else {
        setIsLogged(false);
        setProcessing(false)
      }
    });
  }, [setIsLogged, setProcessing])

  const getUserData = async (phoneNumber) => {
    const docRef = doc(db, "users", phoneNumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const snap = docSnap.data()
      // console.log("Document data:", snap);
      setUserData({
        ...snap,
        phoneNumber
      })
      
      setIsLogged(true)
      setProcessing(false)
    } else {
      // docSnap.data() will be undefined in this case
      // console.log("No such document!");
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8" style={{backgroundColor:'#ccc',padding:30, borderRadius:5}}>
        {processing ? (
          <p>Just a moment...</p>
        )
        :
        isLoggedIn ? (
          <Home userData={userData} />
        )
        :
        (
          <Login auth={auth} />
        )}
      </div>
    </div>
  );
}

export default App;
