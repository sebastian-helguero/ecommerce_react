export const validateString = (str, minLength, maxLength) => {
    if (minLength && str.length < minLength)
        return false;
    else if (maxLength && str.length > maxLength)
        return false;

    return true;
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validatePassword = (userPassword, minLength, maxLength, needsUppercase, needsNumber) => {
    if (minLength && userPassword.length < minLength)
        return false;

    else if (maxLength && userPassword.length > maxLength)
        return false;

    else if (needsUppercase && !/[A-Z]/.test(userPassword))
        return false;

    else if (needsNumber && !/\d/.test(userPassword))
        return false;


    return true;
}

export const validateUserAge = (BirthDate) => {
  const birthdate = new Date(BirthDate);
  const today = new Date();

  if (isNaN(birthdate.getTime())) {
    return false; 
  }

  if (birthdate > today) {
    return false;
  }

  let age = today.getFullYear() - birthdate.getFullYear();
  const month = today.getMonth() - birthdate.getMonth();
  const day = today.getDate() - birthdate.getDate();

  if (month < 0 || (month === 0 && day < 0)) {
    age--;
  }
  return age >= 18;
}


export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        return currentTime < decodedToken.exp;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
}