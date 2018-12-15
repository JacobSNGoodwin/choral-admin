const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// might not need the initial password - might go straight to email action link
// function randomPassword(length) {
//   const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
//   let pass = '';
//   for (let x = 0; x < length; x += 1) {
//     const i = Math.floor(Math.random() * chars.length);
//     pass += chars.charAt(i);
//   }
//   return pass;
// }

exports.deleteAdmin = functions.firestore
  .document('admins/{adminId}').onDelete((snap, context) => {
    // if a admin document is deleted which is only allowed for admin users
    // must also delete the users authentication
    const uid = context.params.adminId;

    return admin.auth().deleteUser(uid)
      .catch(error => {
        console.log("Error deleting user:", error);
      });
  });

exports.addAdmin = functions.firestore
  .document('admins/{adminId}').onCreate((snap, context) => {
    // if a user is added to the admin document
    // then Create a new authenticated user
    // for this method to work, a uuid will need to be prodived
    // in the client side app

    const email = snap.data().email; 
    const name = snap.data().name;
    const uid = context.params.adminId;

    return admin.auth().createUser({
      email: email,
      emailVerified: false,
      uid: uid,
      // password: randomPassword(15),
      displayName: name,
    })
    .then((userRecord) => {
      console.log("Successfully created new user:", userRecord.uid);
      // send email action links
      return;
    })
    .catch(err => {
      console.log(err);
    })
  });

