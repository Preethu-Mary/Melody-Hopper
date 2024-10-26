import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import ExercisesTable from '../../Components/exerciseTable/exerciseTable';
import Footer from '../../Components/Footer/Footer';
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
                    <h1>Welcome to <br/>Melody Hopper</h1>
                </div>
            </div>
            <ExercisesTable exercises={exercises} />
            <Footer />
        </>
        
    );
};

export default HomePage;
