export const checkEmail = text => {
    console.log(text);
    let valid = false;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === true) {
      valid = true;
    }
  
    return valid;
  };
  