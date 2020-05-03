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
const express = require("express");
const Papa = require("papaparse");
const SortedMap = require("collections/sorted-map");
const https = require('https')

const app = express();

app.post("/testing-centers", async (req, res, error) => {
    console.log(req.body);
    if (req.body.fileUrl == null || req.body.fileUrl === "") {
        res.end(error);
        return;
    }
    try {
        var streamHttp = await new Promise((resolve, reject) =>
            https.get(req.body.fileUrl, (res) => {
                console.log(res);
                resolve(res);
            })
        );
    } catch (e) {
        console.log(e);
        res.end(JSON.stringify({ "testing-centers": [] }));
    }

    var testingCentersMap = new SortedMap();

    let config = {
        delimiter: ",",
        complete: (result) => {
            result.data.forEach(item => {
                const testingCenter = {
                    name: item[0],
                    code: item[1],
                    // dailyOutputPositiveIndivs: item[2],
                    // dailyOutputPositiveIndivs: item[3],
                    testedIndivs: parseInt(item[5].replace(",", "")),
                    testedIndivsPositive: parseInt(item[6].replace(",", "")),
                    testedIndivsPositivePercent: item[7],
                    testedIndivsNegative: parseInt(item[8].replace(",", "")),
                    testedIndivsNegativePercent: item[9],
                    testsConducted: parseInt(item[14].replace(",", "")),
                    testsRemaining: parseInt(item[16].replace(",", "")),
                    dateLastUpdated: item[18],

                }
                testingCentersMap.set(testingCenter.name, testingCenter);
                // console.log(item);
            })
            const entries = Array.from(testingCentersMap.values());
            // console.log(entries);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ "testing-centers": entries }));
        }
    }
    Papa.parse(streamHttp, config);

});

exports.app = functions.https.onRequest(app);

