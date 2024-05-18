export const isSuperAdmin = (user) => {
    return user && user.role === "super_admin"; // Adjust this condition based on your actual user object structure
};