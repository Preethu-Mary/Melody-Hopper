import './NoteBox.scss';

function NoteBox({note, top, left}) {

  return (
    <div className='note-box' style={{ top: `${top}%`, position:'absolute', left: `${left}%`}}>
        {note}
    </div>
  );
}

export default NoteBox;