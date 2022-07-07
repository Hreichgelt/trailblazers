const router = require('express').Router();
const axios = require("axios");

// Returns search results of all parks according to state and activity
function getAllParks({ stateCode, activityId }) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  axios
    .get(
      `https://developer.nps.gov/api/v1/activities/parks?id=${activityId}&api_key=NkH26hNE8uCOcIC7vkfHHuLqFaIv9UUy6uuQJGqC`,
      requestOptions
    )
    // retrieves data property from axios response
    .then((response) => response.data)
    // filters through parks returned by fetch request
    .then((response) => {
      const parks = response.data[0].parks;
      let results = parks.filter((park) => {
        return park.states.includes(stateCode);
      });

      // [
      //   {
      //     states: 'CT,GA,MA,MD,ME,NC,NH,NJ,NY,PA,TN,VA,VT,WV',
      //     parkCode: 'appa',
      //     designation: 'National Scenic Trail',
      //     fullName: 'Appalachian National Scenic Trail',
      //     url: 'https://www.nps.gov/appa/index.htm',
      //     name: 'Appalachian'
      //   },
      //   {
      //     states: 'MD,VA',
      //     parkCode: 'asis',
      //     designation: 'National Seashore',
      //     fullName: 'Assateague Island National Seashore',
      //     url: 'https://www.nps.gov/asis/index.htm',
      //     name: 'Assateague Island'
      //   }
      // ]

      // returns new array with parks in specified state
      return results;
    })
    .catch((error) => console.log("error", error));
}

// Route to view Dashboard with articles created by user
router.get("/", async (req, res) => {
  try {
    const parks = getAllParks(...req.body);

    // Serializes data
    const results = JSON.parse(JSON.stringify(parks));

    // Renders articles to homepage
    res.render("search", {
      results,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;