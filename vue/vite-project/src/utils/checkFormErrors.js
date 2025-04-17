const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const checkEmail = {
        checkEmpty: (stringEmail) => stringEmail !== "",
        checkFormat: (stringEmail) => regex.test(stringEmail),
        }