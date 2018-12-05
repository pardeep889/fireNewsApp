import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBOpw5Ffum1RKC-Oln_sioLDDddb8zjuAM",
    authDomain: "nba-project-cee2f.firebaseapp.com",
    databaseURL: "https://nba-project-cee2f.firebaseio.com",
    projectId: "nba-project-cee2f",
    storageBucket: "nba-project-cee2f.appspot.com",
    messagingSenderId: "462927425319"
  };
  firebase.initializeApp(config);

  const firebaseDB = firebase.database();
  const firebaseArticles = firebaseDB.ref('articles');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebaseVideos = firebaseDB.ref('videos');

  const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data;
  }


  export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
  }