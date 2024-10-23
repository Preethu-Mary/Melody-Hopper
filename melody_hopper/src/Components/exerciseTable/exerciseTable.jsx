import { Link } from 'react-router-dom';
import './exerciseTable.scss';

const ExercisesTable = ({ exercises }) => {
    return (
        <div className="exercises-table">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Exercise Name</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, index) => (
                        <tr key={exercise.id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/game/${exercise.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {exercise.exercise_name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExercisesTable;
