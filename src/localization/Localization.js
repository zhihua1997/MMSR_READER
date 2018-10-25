// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

export let strings = new LocalizedStrings({
 en:{
   //Title
   loginPage: "Login Page",

   //Login Page
   email: "Email",
   password: "Password",
   signIn: "Sign In",
   signUp: "Sign Up",

   //Registration
   name: "Name",
   rePassword: "Re-enter Password",
   showDatePicker: "Show Date Picker",
   languageProficient: "Your Proficient Language:",
   chooseLanguage: "Choose Your Language",
   register: "Register",
 },
 cn:{
    //Title
    loginPage: "登录页面",

   //Login Page
   email: "电子邮件",
   password: "密码",
   signIn: "登入",
   signUp: "注册",

   //Registration
   name: "名称",
   rePassword: "重新输入密码",
   showDatePicker: "显示日期选择器",
   languageProficient: "你熟练的语言:",
   chooseLanguage: "选择你的语言",
   register: "注册",
 },
 bm: {
    //Title
    loginPage: "Halaman Log Masuk",

   //Login Page
   email: "E-Mel",
   password: "Kata Laluan",
   signIn: "Log Masuk",
   signUp: "Mendaftar",

   //Registration
   name: "Nama",
   rePassword: "Masukkan semula kata laluan",
   showDatePicker: "Papar Pemilih Tarikh",
   languageProficient: "Bahasa Anda yang Profesional:",
   chooseLanguage: "Pilih Bahasa Anda",
   register: "Daftar",
 },

 tm: {
    //Title
    loginPage: "புகுபதிகை பக்கம்",

   //Login Page
  email: "மின்னஞ்சல்",
  password: "கடவுச்சொல்",
  signIn: "உள்நுழைக",
  signUp: "பதிவு செய்க",

  //Registration
  name: "பெயர்",
  rePassword: "கடவுச்சொல்லை மீண்டும் உள்ளிடவும்",
  showDatePicker: "தேதி தேர்வு பிக்சர்",
  languageProficient: "உங்களுடைய திறமையான மொழி:",
  chooseLanguage: "உங்கள் மொழியை தேர்வு செய்க",
  register: "பதிவு",
 }

});