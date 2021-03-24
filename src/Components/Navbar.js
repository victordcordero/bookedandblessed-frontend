// import React, {useState, useEffect} from 'react';
// import Button from './Button'
// import "./Navbar.css"
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link, 
//   NavLink
// } from "react-router-dom";

// function Navbar() {
//     const [click, setClick] = useState(false)
//     const [button, setButton] = useState(true)

//     function handleClick() {
//         setClick(!click)
//     }

//     function closeMenu() {
//         setClick(false)
//     }

//     function showButton() {
//         if(window.innerWidth <= 960) {
//             setButton(false)
//         }
//         else {
//             setButton(true)
//         }
//     }

//     useEffect(() => {
//         showButton()
//     }, [])
//     window.addEventListener('resize', showButton)
//     return (
//     <>
       
//     </>
//     )
// }

// export default Navbar
// {/* <nav className="navbar">
// <div className="navbar-container">
//     <NavLink to="/" className="navbar-logo" onClick={closeMenu}>BookedandBlessed<i className="fab fa-typo3"/></NavLink>
//    <div className="menu-icon" onClick={handleClick}>
//         <i className={click ? "fas fa-times" : "fas fa-bars"} />
//    </div>
//    <ul className={click ? "nav-menu active" : "nav-menu"}>
//        <li className="nav-item">
//             <NavLink to='/App' className='nav-links' onClick={closeMenu}>Home</NavLink>
//        </li>
//        <li className="nav-item">
//             <NavLink to='/create-job' className='nav-links' onClick={closeMenu}>Create Job</NavLink>
//        </li>
//        <li className="nav-item">
//             <NavLink to='/invoice' className='nav-links' onClick={closeMenu}>Invoice</NavLink>
//        </li>
//        <li className="nav-item">
//             <NavLink to='/expense' className='nav-links' onClick={closeMenu}>Expense</NavLink>
//        </li>
//        <li className="nav-item">
//             <NavLink to='/tax' className='nav-links' onClick={closeMenu}>Tax</NavLink>
//        </li>
//        <li className="nav-item">
//             <NavLink to='/sign-up' className='nav-links' onClick={closeMenu}>Sign Up</NavLink>
//        </li>
//    </ul>
//    {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
// </div>
// </nav> */}