import React from "react";
import "firebase/firestore";
import Points from "./fetchPoints/points";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
} from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyD7RM--kySDQtpuFkxa9IImfEl-4hlFo3k",
  authDomain: "vocabwar.firebaseapp.com",
  projectId: "vocabwar",
  storageBucket: "vocabwar.appspot.com",
  messagingSenderId: "919676092490",
  appId: "1:919676092490:web:9a950472fcc297688626b3",
};

function App() {

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <div>
            <Points player="1" />
            <Points player="2" />
        </div>
    </FirebaseAppProvider>
  );
}

export default App;
