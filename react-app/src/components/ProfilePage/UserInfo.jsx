const UserInfo = ({user}) => {
    return (
        <div>
            <div>
                <img 
                src={user?.profileImg}
                alt="Whoops! It looks like your link is broken."
                />
            </div>
            <div>{user?.username}</div>
        </div>
    )
}

export default UserInfo;