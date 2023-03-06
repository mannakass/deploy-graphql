import React from 'react'

function ProfileInfo({ filterAudits, userProfile, levels }) {

    let totalXP = 0;
    filterAudits.map(project => totalXP += project.amount)

    return (
        <div className='profile-info'>
            <div className='profile-username-div'>
                <p>{userProfile.data.user[0].login}</p>
            </div>
            <div className='profile-data'>
                <div className='profile-current-level-div'>
                    <p className='profile-level-text'>Level</p>
                    <p id='current-level'>{levels.data.transaction[0].amount}</p>
                </div>
                <div className='profile-xp-amount-div'>
                    <p className='profile-xp-text'>XP</p>
                    <p id='xp-number'> {totalXP}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
