import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export const Home = () => {

  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();

  const handleCreateRoom = async () => {
    if(!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Let me ask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
