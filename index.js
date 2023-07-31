const firebaseConfig = {
    apiKey: "AIzaSyDcJI3GVB_bzA9uQ7HniJx2U2xVol6MqqM",
    authDomain: "tabs-f2276.firebaseapp.com",
    projectId: "tabs-f2276",
    storageBucket: "tabs-f2276.appspot.com",
    messagingSenderId: "660458583490",
    appId: "1:660458583490:web:0ab12898c076e14134925b"
};

let container = document.getElementById('keyboard')
let value = false


// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos Firestore
const db = firebase.firestore();


data()

function data() {
    if (value) {
        db.collection("notification")
            .orderBy("timestamp", "desc")
            .limit(1)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let formattedContent = doc.data().content.replace(/\n/g, "<br>");
                    container.innerHTML = formattedContent
                });
            })
            .catch((error) => {
                console.error("Error al obtener documentos: ", error);
            });

    } else {
        db.collection("keyboard")
            .orderBy("timestamp", "desc")
            .limit(1)
            .get()
            .then((querySnapshot) => {

                querySnapshot.forEach((doc) => {

                    let msj = doc.data().content.replace(/\[/g, "<h5>Escribió: </h5> [")
                    let formattedContent = msj.replace(/\n/g, "<br>");
                    container.innerHTML = formattedContent
                });
            })
            .catch((error) => {
                console.error("Error al obtener documentos: ", error);
            });
    }

}






function handleClick(cb) {
    value = cb.checked
    data()
}

function scrollToBottom() {
    const finalElement = document.getElementById("end");
    finalElement.scrollIntoView({ behavior: "smooth" });
}