import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answeredImg  from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/Roomcode';
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImage from '../assets/images/delete.svg';
import '../styles/room.scss';

interface RoomParam {
  id: string
}

export const AdminRoom = () => {

  const params = useParams<RoomParam>();
  const { questions, title } = useRoom(params.id);
  const history = useHistory();

  const handleDeleteQuestion = async (questionId: string) => {
    if(window.confirm('Tem certeza que você deseja excluir essa pergunta ?')) {
      await database.ref(`/rooms/${params.id}/questions/${questionId}`).remove();
    }
  }

  const handleEndRoom = async () => {
    await database.ref(`/rooms/${params.id}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`/rooms/${params.id}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`/rooms/${params.id}/questions/${questionId}`).update({
      isHighlighted: true
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode  code={params.id}/>
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
        </div>

        <div className="question-list">
          {questions.map( q =>
            <Question
              content={q.content}
              author={q.author}
              key={q.id}
              isAnswered={q.isAnswered}
              isHighlighted={q.isHighlighted}>

              {!q.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(q.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(q.id)}
                  >
                    <img src={answeredImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(q.id)}
              >
                <img src={deleteImage} alt="Remover pergunta" />
              </button>
            </Question>)}
        </div>
      </main>
    </div>
  )
}
