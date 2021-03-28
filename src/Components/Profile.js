import React from 'react'

function Profile({currentUser}) {
    
    return (
        <div>
            <h1>Profile {currentUser.name}</h1>
        </div>
    )
}

export default Profile
