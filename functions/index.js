const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const testingCentersApp = require("./src/testing-centers")

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
// exports.scheduledExternalStatsUpdate = functions.pubsub
//     .schedule("every 20 minutes from 17:20 to 18:30").onRun(async () => {


//         const res = await axios.post("https://ncovph.com/graphql", {
//             query: `{ cases {
//                 countConfirmedCases,
//                 countAdmitted,
//                 countRecoveries,
//                 countDeaths
//                 }
//             }`
//         });
//         const data = res.data.data
//         if (!data
//             || !data.cases
//             || data.cases.countConfirmedCases === 0
//             || data.cases.countDeaths === 0
//             || data.cases.countRecoveries === 0) {
//             console.log("Error: Values are 0.")
//             return null;
//         }

//         console.log("totalCases: " + data.cases.countConfirmedCases
//             + ", deaths: " + data.cases.countDeaths
//             + ", recoveries: " + data.cases.countRecoveries);

//         db.collection("stats-main")
//             .doc("EXTERNAL_STATS_ID")
//             .update({
//                 deaths: data.cases.countDeaths,
//                 totalCases: data.cases.countConfirmedCases,
//                 admitted: data.cases.countAdmitted,
//                 recovered: data.cases.countRecoveries,
//                 lastModified: new Date()
//             });
//         return null;
//     });


// Read data drop file for testing
exports.app = functions.https.onRequest(testingCentersApp);

