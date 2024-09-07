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
                    <h5>E-Z Shop</h5>
                </Link>

                {/* <p href="">Home</p> */}
                {/* <p href="">Home</p> */}
                {/* <p href="">Home</p> */}
            </div>
            <div className="nav-profile">
                <Link to={'/cart'}>
                    <Avatar sx={{ bgcolor: 'green[500]', height: '35px', width: '35px' }}>
                        <AssignmentIcon />
                    </Avatar>
                </Link>
                {/* <Link to={'/profile'}>
                <Avatar sx={{height: '35px', width:'35px'}} src="/broken-image.jpg" />
                </Link> */}
                <Link to={'/login'}>
                    <Button sx={{ color: 'black' }} onClick={logout} color="secondary">Logout</Button>
                </Link>
            </div>
        </div>
    )
}
