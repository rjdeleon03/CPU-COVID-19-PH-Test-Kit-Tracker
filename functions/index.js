const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

// Initialize app
admin.initializeApp();
const db = admin.firestore();

// Automatically disable a user upon creation (must be activated by admin)
exports.disableUserOnCreate = functions.auth.user().onCreate((user) => {
    admin.auth().updateUser(user.uid, {
        disabled: true
    })
});

// Update external statistics every 20 mins from 5PM to 6PM everyday
exports.scheduledExternalStatsUpdate = functions.pubsub
    .schedule("every 20 minutes from 17:20 to 18:30").onRun(async () => {


        const res = await axios.post("https://ncovph.com/graphql", {
            query: `{ cases {
                countConfirmedCases,
                countAdmitted,
                countRecoveries,
                countDeaths
                }
            }`
        });
        const data = res.data.data
        if (!data
            || !data.cases
            || data.cases.countConfirmedCases === 0
            || data.cases.countDeaths === 0
            || data.cases.countRecoveries === 0) {
            console.log("Error: Values are 0.")
            return null;
        }

        console.log("totalCases: " + data.cases.countConfirmedCases
            + ", deaths: " + data.cases.countDeaths
            + ", recoveries: " + data.cases.countRecoveries);

        db.collection("stats-main")
            .doc("EXTERNAL_STATS_ID")
            .update({
                deaths: data.cases.countDeaths,
                totalCases: data.cases.countConfirmedCases,
                admitted: data.cases.countAdmitted,
                recovered: data.cases.countRecoveries,
                lastModified: new Date()
            });
        return null;
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