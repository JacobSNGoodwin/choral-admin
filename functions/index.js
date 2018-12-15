const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

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

