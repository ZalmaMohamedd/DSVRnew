window.onscroll = () => {

  if(window.scrollY > 80){
      document.querySelector('#header .header-2').classList.add('active');
  }else{
      document.querySelector('#header .header-2').classList.remove('active');
  }
  
}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

   fadeOut(); 
}

$("#login-btn").click(function() {
  document.querySelector(".Login-container").classList.add("active");
});

$("#close-login-btn").click(function() {
  document.querySelector(".Login-container").classList.remove("active");
});


document.querySelector("#SignInOutForm").addEventListener("click", function() {
  document.querySelector(".Login-container").classList.remove("active");
  document.querySelector(".popup").classList.add("active");

});

$(".popup .close-popup-btn").click(function() {
  document.querySelector(".popup").classList.remove("active");
});


$("#SignInFormbtn").click(function() {
  document.querySelector(".userdata-container").classList.add("active");
  document.querySelector(".SignIn-container").classList.add("notactive");

});

$("#userdataformbtn").click(function() {
  document.querySelector(".userdata-container").classList.remove("notactive");

});



$("#SignInOutForm").click(function() {
  var email= $("#EnterEmail").val();
  var password= $("#EnterPass").val();
  //console.log('the user logged in:', email);
  //console.log(typeof auth);
  Login(email, password);
});



$("#NewuserForm").click(function() {
  var email= $("#emailuser").val();
  var password= $("#passworduser").val();
  //console.log('the user logged in:', email);
  //console.log(typeof auth);
  SignIn(email, password);
});

$("#SignInFormbtn").click(function() {
  var email= $("#signinemail").val();
  var password= $("#signinpassword").val();
  //console.log('the user logged in:', email);
  //console.log(typeof auth);
  SignIn(email, password);
});




/***************                          *****************/
/***************                          *****************/
/***************                          *****************/
/***************                          *****************/
/***************                          *****************/
/***************     FIREBASE              *****************/
/***************                          *****************/
/***************     FIREBASE            *****************/
/***************                          *****************/

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'
import{
    getFirestore, collection, onSnapshot, 
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp, 
    getDoc, updateDoc
}from 'firebase/firestore'

import{
  getAuth, createUserWithEmailAndPassword, signOut, 
  signInWithEmailAndPassword, onAuthStateChanged

} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDQNkvGcZf1qIekslDiPl8RILdGOWz6cOo",
    authDomain: "dsvr-2d912.firebaseapp.com",
    databaseURL: "https://dsvr-2d912-default-rtdb.firebaseio.com",
    projectId: "dsvr-2d912",
    storageBucket: "dsvr-2d912.appspot.com",
    messagingSenderId: "83532075810",
    appId: "1:83532075810:web:bf203c20691098bbe14b7b",
    measurementId: "G-W6EMH8BE5B"
};



initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth() 

//refrence 
const colRef =collection(db,'books')
const colRefuser =collection(db,'userdata')



//queries
const q = query(colRef, orderBy('createdAt'))
const quser = query(colRefuser, orderBy('createdAt'))




/**         FUNCTIONS             **/

function Login(email, password){
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('the user logged in:', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    });
}

function SignIn(email, password){
  createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    console.log('the user logged in:', cred.user)
  })
  .catch((err) => {
    console.log(err.message)
  });
}




onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)

})



//updating a document



onSnapshot(quser, (snapshot) => {
  let userdata =[]
  snapshot.docs.forEach((doc) => {
    userdata.push({ ...doc.data(), id: doc.id  })
  })
  console.log(userdata)
})

onSnapshot(q, (snapshot) => {
  let books =[]
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id  })
  })
  console.log(books)
})




// Logout


const logoutButton = document.querySelector('.logout-btn')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() =>{
      //console.log('the user signed out')
    })
    .catch((err) => {
      console.log(err.message)
    })


})

// adding documents

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => { 
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
  .catch((err) => {
    console.log(err.message)
  })

})

/** add user */

const adduserForm = document.querySelector('.userdata-container')
adduserForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRefuser, {
    name: adduserForm.name.value,
    parent: adduserForm.parent.value,
    email: adduserForm.dataemail.value,
    mobile: adduserForm.mobile.value,
    createdAt: serverTimestamp()

  })
  .then(() => {
    adduserForm.reset()
  })
})



const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db,'books', deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(() => {
    deleteBookForm.reset()
  })
})
// get a sinfle document

const docRef = doc(db, 'books', 'fNtdJqLpkTrvNMcJgt2W')
getDoc(docRef)
 .then((doc) => {
  console.log(doc.data(), doc.id)
})

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})


/*

const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db,'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })

})


const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value


  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      //console.log('the user logged in:', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })

})

$("#create-newuser-button").click(function(){
  var email= $("#inputEmail").val();
  var password= $("#inputPassword").val();
  console.log("New user =" + email + " " + password);
  console.log(typeof auth);
  SignIn(email, password);
});


$("#loginbutton").click(function() {
  var email= $("#inputEmail").val();
  var password= $("#inputPassword").val();
  console.log('the user logged in:', email);
  console.log(typeof auth);
  Login(email, password);
});

*/






















/**

document.querySelector('#login-btn').addEventListener("click", function(){
  document.querySelector(".Login-container").classList.add("active");
});


document.querySelector('.Login-container .close-login-btn').addEventListener("click", function(){
  document.querySelector(".Login-container").classList.remove("active");
});

searchForm = document.querySelector('#header .header-1 .search-form');
document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}     
let loginForm = document.querySelector('#login .Login-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}
  
document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
      document.querySelector('#header .header-2').classList.add('active');
  }else{
      document.querySelector('#header .header-2').classList.remove('active');
  }
  
}


window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('#header .header-2').classList.add('active');
  }else{
    document.querySelector('#header .header-2').classList.remove('active');
  }

   fadeOut(); 
}*/




