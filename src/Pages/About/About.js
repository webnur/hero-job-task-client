import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';

const About = () => {
    return (
        <div>
            <Navbar></Navbar>
            
            <div className='container mx-auto mt-6'>
            <h2 className="text-2xl">Welcome to about page</h2>
            </div>
        </div>
    );
};

export default About;