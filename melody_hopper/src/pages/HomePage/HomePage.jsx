import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import ExercisesTable from '../../Components/exerciseTable/exerciseTable';
import Howtoplay from '../../Components/how_to_play/how_to_play';
import Footer from '../../Components/Footer/Footer';
import './HomePage.scss';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
    const [exercises, setExercises] = useState([]);
    const url = `${backendURL}/`;

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get(`${url}exercises`);
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
                <div className='hero__title'>
                    <h1>Welcome to <br/>Melody Hopper</h1>
                    <p className='hero__desc'>An interactive game designed for music beginners to enhance their music-reading skill and to have a perfect pitch in an engaging and enjoyable way.</p>
                </div>
            </div>
            <ExercisesTable exercises={exercises} />
            <Howtoplay/>
            <Footer />
        </>
        
    );
};

export default HomePage;
