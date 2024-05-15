import React from 'react';
import './entrypage.css'; // Import CSS file
import person from '../assets/person.png';
import visitor from '../assets/visitor.png';
import Employe from '../assets/employee.png';

const MainPage = () => {
    return (
        <div className='Main-Container'>
            {/* Anchor tag for '/showcase' route */}
            <a href="/showcase">
                <div className='Person-Image'>
                    <div>
                        <img src={person} alt='person'/>
                    </div>
                </div>
            </a>
            {/* Anchor tag for '/showcase' route */}
            <a href="/showcase">
                <div className='visitor'>
                    <div>
                        <img src={visitor} alt='visitor'/>
                    </div>
                </div>
            </a>
            {/* Anchor tag for '/showcase' route */}
            <a href="/showcase">
                <div className='Employe'>
                    <div>
                        <img src={Employe} alt="Employe" />
                    </div>
                </div>
            </a>
        </div>
    );
}

export default MainPage;
