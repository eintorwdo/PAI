const getUserPreview = (user) => {
    if(user){
        return {
            email: user.email,
            role: user.role
        };
    }
    return {};
}

module.exports = getUserPreview;