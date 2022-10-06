import { initializeApp } from "firebase/app";
import { getFirestore, 
    collection,
    // getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query, where,
    orderBy,
     } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoWfKRtvmYnSV2mKP63ziyP_OYEpVysxI",
  authDomain: "fir-9-intro-8e5ec.firebaseapp.com",
  projectId: "fir-9-intro-8e5ec",
  storageBucket: "fir-9-intro-8e5ec.appspot.com",
  messagingSenderId: "339669660302",
  appId: "1:339669660302:web:1b80dc9e0eccb365a9cfdf",
};

//init firebase app.
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref.
const colRef = collection(db, "books");


//queries.
const q = query(colRef, where("auth","==","adarsh"), orderBy('title','asc'))
//where takes 3 inputs. first one property second one some comparison operator, like "==" and then third one is the value.
//order by is used to order the id's which are randomly given by firestore.


// collection of data, doesn't show results until refreshed.
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message)
// }); 
//instead of the above method, in which we'll have to refresh to see the values get updated , we want
//to create a realtime collection of data. therefore we're using the onSnaphot method. which is very efficient.

//real time collection data.

// in place of colref replace  it with query q.
onSnapshot(q,(snapshot)=>{
    let books = [] ;
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
    
})

//adding documents
const addBookForm = document.querySelector('.add')//.add is class mentioned for adding in index html page

addBookForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    addDoc(colRef,{
        title: addBookForm.title.value,
        auth: addBookForm.author.value,
        genre: addBookForm.genre.value,
    })
    .then(()=>{
        addBookForm.reset()
    })
})

//deleting the documents.
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const docRef = doc(db,'books',deleteBookForm.id.value)
    deleteDoc(docRef)
        .then(()=>{
            deleteBookForm.reset()
        })


})