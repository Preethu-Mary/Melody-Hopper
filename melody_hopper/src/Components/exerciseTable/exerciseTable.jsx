import { Link } from 'react-router-dom';
import './exerciseTable.scss';

const ExercisesTable = ({ exercises }) => {
    return (
        <div className="exercises-table">
            <div className="cards-container">
                {exercises.map((exercise, index) => (
                    <div className="card" key={exercise.id}>
                        <Link to={`/exercise/${exercise.id}`} className="card-link">
                            <div className="card-content">
                                <span className="sl-no">{index + 1}</span><br></br>
                                <span className="exercise-name">{exercise.exercise_name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExercisesTable;
