import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

import { firebaseConfigDev } from "./config-dev";
// import { firebaseConfigProd } from "./config-prod";

// Initialize Firebase depending on env
const firebaseConfig = (process.env.NODE_ENV === "production") ? firebaseConfigDev : firebaseConfigDev;
const firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase.analytics();
export const auth = firebase.auth();
export const db = firebaseApp.firestore();

var lastKitsCount = 0;
db.collection("kits").onSnapshot(async (snapshot) => {
  let docs = snapshot.docs;
  if (!docs) return;

  var onHandTotal = 0;
  var pledgedMinTotal = 0;
  var pledgedMaxTotal = 0;
  var usedTotal = 0;
  var hasPendingWrites = false;

  docs.forEach((doc) => {
    let kit = doc.data();
    if (kit.units_on_hand) {
      onHandTotal += parseInt(kit.units_on_hand, 10);
    }
    if (kit.units_pledged_max) {
      pledgedMaxTotal += parseInt(kit.units_pledged_max, 10);
    }
    if (kit.units_pledged_min) {
      pledgedMinTotal += parseInt(kit.units_pledged_min, 10);
    } else if (kit.units_pledged_max) {
      pledgedMinTotal += parseInt(kit.units_pledged_max, 10);
    }
    if (kit.units_used) {
      usedTotal += parseInt(kit.units_used, 10);
    }

    // console.log(doc.metadata.hasPendingWrites)

    if (doc.metadata.hasPendingWrites) {
      // console.log(doc);
      hasPendingWrites = true;
    }
  });

  // console.log("pending: " + hasPendingWrites || docs.length < lastKitsCount);
  if (hasPendingWrites || docs.length < lastKitsCount) {
    db.collection("stats-main")
      .doc("MAIN_STATS_ID")
      .update({
        testKitsUsed: usedTotal,
        testKitsOnHand: onHandTotal,
        testKitsPledgedMin: pledgedMinTotal,
        testKitsPledgedMax: pledgedMaxTotal,
      });
  }
  lastKitsCount = docs.length;

  // console.log("onHandTotal: " + onHandTotal);
  // console.log("pledgedMinTotal: " + pledgedMinTotal);
  // console.log("pledgedMaxTotal: " + pledgedMaxTotal);
});
