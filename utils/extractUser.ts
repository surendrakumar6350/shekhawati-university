function extractUser(user: any) {
    // Check if the user object is valid
    if (!user || typeof user !== 'object') {
        throw new Error("Invalid user object");
    }
    // Extract the required properties
    const { email, name, picture, date } = user;
    // Create a new object with the selected properties
    return {
        email: email,
        name: name,
        picture: picture,
        date: date
    };
}

export default extractUser;