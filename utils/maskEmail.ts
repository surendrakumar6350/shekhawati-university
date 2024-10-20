const maskEmail = (email: string) => {
    const [username, domain] = email.split('@')
    if (username.length <= 7) {
        return `${username}**@${domain}`
    }
    return `${username.slice(0, 7)}**@${domain}`
}
export default maskEmail;