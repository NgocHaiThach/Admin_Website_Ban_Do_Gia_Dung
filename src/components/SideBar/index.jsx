import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';

function SideBar(props) {
    return (
        <div className='col-md-2 mt-5'>
            <Container >
                <div className='menu-list'>
                    <div className='menu-item'>
                        Home
                    </div>
                </div>
            </Container >
        </div>
    );
}

export default SideBar;