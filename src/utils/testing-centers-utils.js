const SortedMap = require("collections/sorted-map");

const testingCentersUtils = {
  get: (papa, file, complete, error) => {
    papa.parse(file, {
      complete: (result) => {
        var testingCentersMap = new SortedMap();

        if (result.data == null || result.data.length < 2) {
          error();
          return;
        }

        const headerArray = result.data[0];

        const indices = {
          name: headerArray.indexOf("facility_name"),
          // code: headerArray.indexOf("Abbrev of Health Facility"),
          testedIndivs: headerArray.indexOf("cumulative_unique_individuals"),
          testedIndivsPositive: headerArray.indexOf("cumulative_positive_individuals"),
          testedIndivsPositivePercent: headerArray.indexOf(
            "pct_positive_cumulative"
          ),
          testedIndivsNegative: headerArray.indexOf("cumulative_negative_individuals"),
          testedIndivsNegativePercent: headerArray.indexOf(
            "pct_negative_cumulative"
          ),
          testsConducted: headerArray.indexOf("cumulative_samples_tested"),
          testsRemaining: headerArray.indexOf("remaining_available_tests"),
          backlogs: headerArray.indexOf("backlogs"),
          region: headerArray.indexOf("Region"),
          dateLastUpdated: headerArray.indexOf("report_date"),
        };

        console.log(indices);

        // Remove first item
        result.data.shift();

        result.data.forEach((item) => {
          if (item.length < 2) {
            return;
          }
          //   console.log(item);
          const testingCenter = {
            name: item[indices.name],
            // code: item[indices.code],
            backlogs: parseInt(
              item[indices.backlogs].replace(",", "")
            ),
            testedIndivs: parseInt(item[indices.testedIndivs].replace(",", "")),
            testedIndivsPositive: parseInt(
              item[indices.testedIndivsPositive].replace(",", "")
            ),
            testedIndivsPositivePercent:
              item[indices.testedIndivsPositivePercent],
            testedIndivsNegative: parseInt(
              item[indices.testedIndivsNegative].replace(",", "")
            ),
            testedIndivsNegativePercent:
              item[indices.testedIndivsNegativePercent],
            testsConducted: parseInt(
              item[indices.testsConducted].replace(",", "")
            ),
            testsRemaining: parseInt(
              item[indices.testsRemaining].replace(",", "")
            ),
            location: {
              region:
                indices.region != -1
                  ? item[indices.region].replace("/r", "")
                  : null,
            },
            dateLastUpdated: item[indices.dateLastUpdated],
          };

          if (isNaN(testingCenter.backlogs)) {
            testingCenter.backlogs = 0;
          }

          // addRegionsAndCoords(testingCenter);
          testingCentersMap.set(testingCenter.name, testingCenter);
        });
        const entries = Array.from(testingCentersMap.values());
        console.log(entries);
        entries.forEach((entry) => {
          addRegionsAndCoords(entry);
        });
        complete(entries);
      },
    });
  },
};

function addRegionsAndCoords(testingCenter) {
  switch (testingCenter.name) {
    case "Baguio General Hospital and Medical Center (BGHMC)":
      testingCenter.location = {
        geoLat: "16.4009911",
        geoLng: "120.5956827",
        region: "Luzon",
      };
      break;
    case "Bicol Regional Diagnostic and Reference Laboratory (BRDRL)":
      testingCenter.location = {
        geoLat: "13.1470067",
        geoLng: "123.7225157",
        region: "Luzon",
      };
      break;
    case "Chinese General Hospital (CGH)":
      testingCenter.location = {
        geoLat: "14.625592",
        geoLng: "120.9864244",
        region: "Luzon",
      };
      break;
    case "Detoxicare Molecular Diagnostics Laboratory":
      testingCenter.location = {
        geoLat: "14.5913357",
        geoLng: "121.0306801",
        region: "Luzon",
      };
      break;
    case "Lung Center of the Philippines (LCP)":
      testingCenter.location = {
        geoLat: "14.6476142",
        geoLng: "121.0436521",
        region: "Luzon",
      };
      break;
    case "Makati Medical Center (MMC)":
      testingCenter.location = {
        geoLat: "14.5590246",
        geoLng: "121.0124126",
        region: "Luzon",
      };
      break;
    case "Philippine Red Cross (PRC)":
      testingCenter.location = {
        geoLat: "14.5721142",
        geoLng: "121.0293033",
        region: "Luzon",
      };
      break;
    case "Research Institute for Tropical Medicine (RITM)":
      testingCenter.location = {
        geoLat: "14.4098693",
        geoLng: "121.0350338",
        region: "Luzon",
      };
      break;
    case "San Lazaro Hospital (SLH)":
      testingCenter.location = {
        geoLat: "14.6137163",
        geoLng: "120.9787161",
        region: "Luzon",
      };
      break;
    case "Southern Philippines Medical Center (SPMC)":
      testingCenter.location = {
        geoLat: "7.0983727",
        geoLng: "125.6176482",
        region: "Mindanao",
      };
      break;
    case "St. Luke's Medical Center - BGC (SLMC-BGC)":
      testingCenter.location = {
        geoLat: "14.5552221",
        geoLng: "121.0461587",
        region: "Luzon",
      };
      break;
    case "St. Luke's Medical Center - Quezon City (SLMC-QC)":
      testingCenter.location = {
        geoLat: "14.6225416",
        geoLng: "121.0210459",
        region: "Luzon",
      };
      break;
    case "The Medical City (TMC)":
      testingCenter.location = {
        geoLat: "14.5897145",
        geoLng: "121.0672937",
        region: "Luzon",
      };
      break;
    case "UP National Institutes of Health (UP-NIH)":
      testingCenter.location = {
        geoLat: "14.5759353",
        geoLng: "120.9849505",
        region: "Luzon",
      };
      break;
    case "V. Luna Hospital":
      testingCenter.location = {
        geoLat: "14.6356249",
        geoLng: "121.0505011",
        region: "Luzon",
      };
      break;
    case "Vicente Sotto Memorial Medical Center (VSMMC)":
      testingCenter.location = {
        geoLat: "10.3080071",
        geoLng: "123.8894029",
        region: "Visayas",
      };
      break;
    case "Western Visayas Medical Center (WVMC)":
      testingCenter.location = {
        geoLat: "10.718759",
        geoLng: "122.5394069",
        region: "Visayas",
      };
      break;
    default:
      if (
        testingCenter.location == null ||
        testingCenter.location.region == null
      ) {
        if (testingCenter.name.toUpperCase().indexOf("VISAYAS") != -1) {
          testingCenter.location = {
            region: "Visayas",
          };
        } else if (testingCenter.name.toUpperCase().indexOf("MINDANAO") != -1) {
          testingCenter.location = {
            region: "Mindanao",
          };
        } else {
          testingCenter.location = {
            region: "Luzon",
          };
        }
      }
  }
}

module.exports = testingCentersUtils;
