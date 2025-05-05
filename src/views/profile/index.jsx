
const Profile = () => {
    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        bio: 'Développeur passionné par les technologies web et les nouvelles tendances.',
        avatar: 'https://via.placeholder.com/150',
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.avatar} alt="Avatar" className="profile-avatar" />
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-email">{user.email}</p>
            </div>
            <div className="profile-bio">
                <h2>Bio</h2>
                <p>{user.bio}</p>
            </div>
        </div>
    );
};

export default Profile;