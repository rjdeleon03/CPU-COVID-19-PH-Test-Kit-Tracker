const SortedMap = require("collections/sorted-map");

const testingRankingsUtils = {
  get: (papa, file, complete, error) => {
    papa.parse(file, {
      complete: (result) => {
        var testingCountriesMap = new SortedMap();
        var testingCountriesMapSEA = new SortedMap();

        if (result.data == null || result.data.length < 2) {
          error();
          return;
        }

        const headerArray = result.data[0];
        console.log(headerArray);

        const indices = {
          isocode: headerArray.indexOf("iso_code"),
          country: headerArray.indexOf("location"),
          date: headerArray.indexOf("date"),
          testsPerThousand: headerArray.indexOf("total_tests_per_thousand")
        };

        // Remove first item
        result.data.shift();

        result.data.forEach((item) => {
          if (item.length < 2) {
            return;
          }
          const testingDataPerCountry = {
            isocode: item[indices.isocode],
            country: item[indices.country],
            dateLastUpdated: item[indices.date],
            testsPerThousand: item[indices.testsPerThousand]
          };
          if (testingDataPerCountry.isocode !== ""
            && testingDataPerCountry.isocode !== "OWID_WRL"
            && testingDataPerCountry.testsPerThousand !== "") {
            // console.log(testingDataPerCountry.testsPerThousand);
            // console.log(testingDataPerCountry.country + " -- " + testingDataPerCountry.dateLastUpdated + " --" + testingDataPerCountry.testsPerThousand);

            testingDataPerCountry.testsPerThousand = parseFloat(testingDataPerCountry.testsPerThousand);
            testingCountriesMap.set(testingDataPerCountry.isocode, testingDataPerCountry);

            if ("IDN+MYS+MMR+PHL+SGP+THA+VNM+BRN+LAO+TLS+KHM".indexOf(testingDataPerCountry.isocode) > -1) {
              testingCountriesMapSEA.set(testingDataPerCountry.isocode, testingDataPerCountry);

            }
          }
        });

        const sortedSEAList = Array.from(testingCountriesMapSEA.values()).sort((a, b) => b.testsPerThousand - a.testsPerThousand);
        const sortedWorldList = Array.from(testingCountriesMap.values()).sort((a, b) => b.testsPerThousand - a.testsPerThousand);

        console.log(sortedSEAList);
        console.log(sortedWorldList);

        const entries = Array.from(testingCountriesMap.values());
        // entries.forEach((entry) => {
        //   console.log(entry)
        // });
        complete(entries);
      },
    });
  },
};

module.exports = testingRankingsUtils;
