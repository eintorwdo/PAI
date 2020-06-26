const getUserPreview = (user) => {
    if(user){
        return {
            id: user._id,
            email: user.email,
            role: user.role
        };
    }
    return {};
}

module.exports = getUserPreview;