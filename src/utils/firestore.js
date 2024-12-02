import {auth, db} from "./firebase";
import {doc, getDoc, setDoc} from "firebase/firestore";

export const addUserDoc = async () => {
    try {
        if (!auth.currentUser) {
            console.error("No user is signed in.");
            return;
        }

        await setDoc(doc(db, "users", `${auth.currentUser.uid}`), {
            name: auth.currentUser.displayName || "Anonymous",
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            createdAt: new Date()
        });

        console.log("Document written with ID: ", auth.currentUser.uid);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
export const addWorkoutDoc = async (date, data) => {
    try {
        if (!auth.currentUser) {
            console.error("No user is signed in.");
            return;
        }
        await setDoc(doc(db, `${auth.currentUser.uid}`, date), {
            data: data.flat()
        })

        console.log("Document written with ID: ", auth.currentUser.uid);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export const getWorkoutDoc = async (date) => {
    return (await getDoc(doc(db, `${auth.currentUser.uid}`, date))).data();
}

export const unflatten = (array) => {
    const result = [];
    for (let i = 0; i < array.length; i += 7) {
        result.push(array.slice(i, i + 7));
    }
    return result;
}

export const doesDocumentExist = async (documentKey) => {
    try {
        const docRef = doc(db, auth.currentUser.uid, documentKey);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (error) {
        console.error("Error checking document existence: ", error);
        throw error;
    }
}