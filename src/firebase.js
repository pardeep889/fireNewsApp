import * as firebase from 'firebase';

var config = {
    
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