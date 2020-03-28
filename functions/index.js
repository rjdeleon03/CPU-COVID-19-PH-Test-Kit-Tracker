const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize app
admin.initializeApp();

// Automatically disable a user upon creation (must be activated by admin)
exports.disableUserOnCreate = functions.auth.user().onCreate((user) => {
    admin.auth().updateUser(user.uid, {
        disabled: true
    })
});