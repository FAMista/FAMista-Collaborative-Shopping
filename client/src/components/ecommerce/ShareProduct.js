import React from 'react'
import '../../css/CheckoutProduct.css';
import db from '../../firebase';
import firebase from "firebase";
import {useAuth} from "../../contexts/AuthContext";

function ShareProduct({key, id, emailAdd, name, itemImage}) { {
    const {currentUser} = useAuth();

    const share = () => {
        db.collection('users').doc(currentUser.uid).collection('friends').doc(id).collection('messages').add({
            message: "Please share your review of this product!",
            name: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: itemImage
        })

        db.collection('users').doc(id).collection('friends').doc(currentUser.uid).collection('messages').add({
            message: "Please share your review of this product!",
            name: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: itemImage
        })
    }

    return (
        <div className="checkoutProduct">
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">
                    {name}
                </p>
                <p className="checkoutProduct_price">
                    <strong>Email ID: {emailAdd}</strong>
                </p>
                <button onClick={share} >Share</button>
            </div>
        </div>
    )
}

<<<<<<< HEAD:client/src/components/ecommerce/Share.js
export default ShareProduct 
=======
export default ShareProduct
>>>>>>> cc49f7bf79de71a9a547d1e757bada28be43fc18:client/src/components/ecommerce/ShareProduct.js
