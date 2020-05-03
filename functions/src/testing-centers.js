const express = require("express");
const Papa = require("papaparse");
const SortedMap = require("collections/sorted-map");
const https = require('https')
const cors = require('cors');

const app = express();
app.use(cors());

app.post("/testing-centers", async (req, res, error) => {
    // console.log(req.body);
    if (req.body.fileUrl == null || req.body.fileUrl === "") {
        res.json({ error: error });
        return;
    }
    try {
        var streamHttp = await new Promise((resolve, reject) =>
            https.get(req.body.fileUrl, (res) => {
                // console.log(res);
                resolve(res);
            })
        );
    } catch (e) {
        res.json({ "testing-centers": [] });
    }

    var testingCentersMap = new SortedMap();

    let config = {
        delimiter: ",",
        complete: (result) => {

            const headerArray = result.data[0];

            const indices = {
                name: headerArray.indexOf("Name of Health Facility/Laboratory"),
                code: headerArray.indexOf("Abbrev of Health Facility"),
                testedIndivs: headerArray.indexOf("UNIQUE INDIVIDUALS TESTED"),
                testedIndivsPositive: headerArray.indexOf("POSITIVE INDIVIDUALS"),
                testedIndivsPositivePercent: headerArray.indexOf("% positive/ unique individuals"),
                testedIndivsNegative: headerArray.indexOf("NEGATIVE INDIVIDUALS"),
                testedIndivsNegativePercent: headerArray.indexOf("% negative/ unique individuals"),
                testsConducted: headerArray.indexOf("TOTAL TESTS CONDUCTED"),
                testsRemaining: headerArray.indexOf("REMAINING AVAILABLE TESTS"),
                dateLastUpdated: headerArray.indexOf("Date"),
            }

            // Remove first item
            result.data.shift();

            result.data.forEach(item => {
                const testingCenter = {
                    name: item[indices.name],
                    code: item[indices.code],
                    testedIndivs: parseInt(item[indices.testedIndivs].replace(",", "")),
                    testedIndivsPositive: parseInt(item[indices.testedIndivsPositive].replace(",", "")),
                    testedIndivsPositivePercent: item[indices.testedIndivsPositivePercent],
                    testedIndivsNegative: parseInt(item[indices.testedIndivsNegative].replace(",", "")),
                    testedIndivsNegativePercent: item[indices.testedIndivsNegativePercent],
                    testsConducted: parseInt(item[indices.testsConducted].replace(",", "")),
                    testsRemaining: parseInt(item[indices.testsRemaining].replace(",", "")),
                    dateLastUpdated: item[indices.dateLastUpdated],

                }
                // addRegionsAndCoords(testingCenter);
                testingCentersMap.set(testingCenter.name, testingCenter);
            })
            const entries = Array.from(testingCentersMap.values());
            entries.forEach(entry => {
                addRegionsAndCoords(entry);
            })
            // console.log(entries);
            res.json({ "testing-centers": entries });
        }
    }
    Papa.parse(streamHttp, config);

});

function addRegionsAndCoords(testingCenter) {
    switch (testingCenter.name) {
        case "Baguio General Hospital and Medical Center (BGHMC)":
            testingCenter.location = {
                "geoLat": "16.4009911",
                "geoLng": "120.5956827",
                "region": "Luzon"
            }
            break;
        case "Bicol Regional Diagnostic and Reference Laboratory (BRDRL)":
            testingCenter.location = {
                "geoLat": "13.1470067",
                "geoLng": "123.7225157",
                "region": "Luzon"
            }
            break;
        case "Chinese General Hospital (CGH)":
            testingCenter.location = {
                "geoLat": "14.625592",
                "geoLng": "120.9864244",
                "region": "Luzon"
            }
            break;
        case "Detoxicare Molecular Diagnostics Laboratory":
            testingCenter.location = {
                "geoLat": "14.5913357",
                "geoLng": "121.0306801",
                "region": "Luzon"
            }
            break;
        case "Lung Center of the Philippines (LCP)":
            testingCenter.location = {
                "geoLat": "14.6476142",
                "geoLng": "121.0436521",
                "region": "Luzon"
            }
            break;
        case "Makati Medical Center (MMC)":
            testingCenter.location = {
                "geoLat": "14.5590246",
                "geoLng": "121.0124126",
                "region": "Luzon"
            }
            break;
        case "Philippine Red Cross (PRC)":
            testingCenter.location = {
                "geoLat": "14.5721142",
                "geoLng": "121.0293033",
                "region": "Luzon"
            }
            break;
        case "Research Institute for Tropical Medicine (RITM)":
            testingCenter.location = {
                "geoLat": "14.4098693",
                "geoLng": "121.0350338",
                "region": "Luzon"
            }
            break;
        case "San Lazaro Hospital (SLH)":
            testingCenter.location = {
                "geoLat": "14.6137163",
                "geoLng": "120.9787161",
                "region": "Luzon"
            }
            break;
        case "Southern Philippines Medical Center (SPMC)":
            testingCenter.location = {
                "geoLat": "7.0983727",
                "geoLng": "125.6176482",
                "region": "Mindanao"
            }
            break;
        case "St. Luke's Medical Center - BGC (SLMC-BGC)":
            testingCenter.location = {
                "geoLat": "14.5552221",
                "geoLng": "121.0461587",
                "region": "Luzon"
            }
            break;
        case "St. Luke's Medical Center - Quezon City (SLMC-QC)":
            testingCenter.location = {
                "geoLat": "14.6225416",
                "geoLng": "121.0210459",
                "region": "Luzon"
            }
            break;
        case "The Medical City (TMC)":
            testingCenter.location = {
                "geoLat": "14.5897145",
                "geoLng": "121.0672937",
                "region": "Luzon"
            }
            break;
        case "UP National Institutes of Health (UP-NIH)":
            testingCenter.location = {
                "geoLat": "14.5759353",
                "geoLng": "120.9849505",
                "region": "Luzon"
            }
            break;
        case "V. Luna Hospital":
            testingCenter.location = {
                "geoLat": "14.6356249",
                "geoLng": "121.0505011",
                "region": "Luzon"
            }
            break;
        case "Vicente Sotto Memorial Medical Center (VSMMC)":
            testingCenter.location = {
                "geoLat": "10.3080071",
                "geoLng": "123.8894029",
                "region": "Visayas"
            }
            break;
        case "Western Visayas Medical Center (WVMC)":
            testingCenter.location = {
                "geoLat": "10.718759",
                "geoLng": "122.5394069",
                "region": "Visayas"
            }
            break;
        default:
            testingCenter.location = {
                "region": "Luzon"
            }
    }
}

module.exports = app;