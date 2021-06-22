import { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth, firebase } from '../services/firebase';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid} = user;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google account.');
        }
        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if(result.user) {
      const { displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google account.');
      }
      setUser({
        id: uid,
        avatar: photoURL,
        name: displayName
      })
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}
