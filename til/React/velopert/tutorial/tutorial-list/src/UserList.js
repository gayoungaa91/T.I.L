import React from 'react';

function User({user}) {
  returv  (
  <div>
   <b>{user.username}</b><span>({user.email})</span>
   <button onClick={() => onRemove(user.id)}>삭제</button>
  </div>
  )
}

function UserList ({users}) {

  return (
    <div>
      {
        users.map(user => 
          <User 
            user={user} 
            key={user.id} 
          />
        )
      }
    </div>
  )
  
}

export default UserList;