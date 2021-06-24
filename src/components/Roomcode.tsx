import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

interface RoomCodeProps {
  code: string;
}

export const RoomCode = (props: RoomCodeProps) => {

  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code);
    const toast = document.querySelector('#toast');
    toast?.classList.add('show');
    setTimeout(() => { toast?.classList.remove('show'); }, 1000);
  }
  return (
    <div>
      <div id="toast">Copied</div>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
    </div>
  )
}
