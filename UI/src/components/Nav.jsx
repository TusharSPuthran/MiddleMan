import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function nav() {
    let navigate = useNavigate();

    const logout = async () => {
        alert("Attempting to logout?")
        localStorage.clear()

        await navigate("/")
    }
    return (
        <div className='nav-body'>
            <div className="nav-ctrl">
                <Link to={'/'}>
                    <h5>MiddlaMan</h5>
                </Link>

                {/* <p href="">Home</p> */}
                {/* <p href="">Home</p> */}
                {/* <p href="">Home</p> */}
            </div>
            <div className="nav-profile">
            </div>
        </div>
    )
}
