import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import ExercisesTable from '../../Components/exerciseTable/exerciseTable';
import './HomePage.scss';

const HomePage = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get('http://localhost:8080/exercises');
                setExercises(response.data);
            } catch (error) {
                console.error('Failed to fetch exercises:', error);
            }
        };

        fetchExercises();
    }, []);

    return (
        <>
            <Navbar/>
            <div className='hero'>
                <div className='hero-title'>
                </div>
            </div>
            <ExercisesTable exercises={exercises} />
        </>
        
    );
};

export default HomePage;
