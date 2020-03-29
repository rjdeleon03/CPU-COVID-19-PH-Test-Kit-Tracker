const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Initialize app
admin.initializeApp();
const db = admin.firestore();

// Automatically disable a user upon creation (must be activated by admin)
exports.disableUserOnCreate = functions.auth.user().onCreate((user) => {
    admin.auth().updateUser(user.uid, {
        disabled: true
    })
});

// Automatically update test kit totals upon updating of the kits collection
// exports.updateTestKitTotals = functions.firestore
//     .document('kits/{kitId}').onWrite((snapshot, context) => {
//         let docs = snapshot.docs;
//         if (!docs) return;

//         var onHandTotal = 0;
//         var pledgedMinTotal = 0;
//         var pledgedMaxTotal = 0;

//         docs.forEach(doc => {
//             let kit = doc.data();
//             if (kit.units_on_hand) {
//                 onHandTotal += parseInt(kit.units_on_hand, 10);
//             }
//             if (kit.units_pledged_max) {
//                 pledgedMaxTotal += parseInt(kit.units_pledged_max, 10);
//             }
//             if (kit.units_pledged_min) {
//                 pledgedMinTotal += parseInt(kit.units_pledged_min, 10);
//             } else if (kit.units_pledged_max) {
//                 pledgedMinTotal += parseInt(kit.units_pledged_max, 10);
//             }
//             db.collection("stats-main")
//                 .doc("MAIN_STATS_ID")
//                 .update({
//                     testKitsOnHand: onHandTotal,
//                     testKitsPledgedMin: pledgedMinTotal,
//                     testKitsPledgedMax: pledgedMaxTotal
//                 });
//         });
//     });