class User {
    users = [];
    usersService;
  
    constructor(usersService) {
      this.usersService = usersService;
    }
  
    init() {
      this.render();
    }
  
    updateUser = async (user) => {
      try {
        const { user_name, user_pw } = user;
        const storedUserId = getStorage("id");
        let formData = {};
        formData.user_name = user_name;
        formData.user_pw = user_pw;
        await this.usersService.updateUserName(storedUserId, formData);
      } catch (err) {
        console.log(err);
        alert('Unable to update user. Please try again later.');
      }
    };
  
    _updateUserNameEventHandler = () => {
      const userName = document.getElementById('formInputUserName');
      const user_name = userName.value;
  
      const userPw = document.getElementById('formInputUserPw');
      const user_pw = userPw.value;
  
      // validation checks
      if (!user_name) {
        alert('Please enter a user name.');
        return;
      }
      if (!user_pw) {
        alert('Please enter a password.');
        return;
      }
  
      const user = { user_name, user_pw }; 
      this.updateUser(user);
  
      userName.value = ''; 
      userPw.value = '';
    };
  

    updatePassword = async (user) => {
      try {
        const { current_pw, update_pw } = user;
        const storedUserId = getStorage("id");
        let formData = {};
        formData.current_pw = current_pw;
        formData.update_pw = update_pw;
        await this.usersService.updatePassword(storedUserId, formData);
      } catch (err) {
        console.log(err);
        alert('Unable to update password. Please try again later.');
      }
    };

    _updatePasswordEventHandler = () => {
      const currentPw = document.getElementById('formInputCurrentPw');
      const current_pw = currentPw.value;
  
      const updatePw = document.getElementById('formInputUpdatePw');
      const update_pw = updatePw.value;
  
      // validation checks
      if (!current_pw) {
        alert('Please enter current password.');
        return;
      }
      if (!update_pw) {
        alert('Please enter a new password.');
        return;
      }
  
      const user = { current_pw, update_pw }; 
      this.updatePassword(user);
  
      currentPw.value = ''; 
      updatePw.value = '';
    };

    render = async () => {

    };
  }