import './NoteBox.scss';

function NoteBox({note, top, left, color}) {

  return (
    <div className='note-box' style={{ top: `${top}%`, position:'absolute', left: `${left}%`, backgroundColor: color}}>
        {note}
    </div>
  );
}

export default NoteBox;