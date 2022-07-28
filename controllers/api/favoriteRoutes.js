const router = require('express').Router();
const { Favorite } = require('../../models');

// post a favorite here
router.post('/', async (req, res) => {
    try {
        const favoriteData = await Favorite.create({
            name: req.body.name,
            park_code: req.body.parkCode,
            user_id: req.session.user_id
        })
        res.status(200).json(favoriteData);
    } catch (err) {
        res.status(400).json(err);
    }
});
// remove a favorite
router.delete('/', async (req, res) => {
  try {
    const favoriteData = await Favorite.destroy({
      where: {
        name: req.body.name,
        user_id: req.session.user_id,
      },
    });

    if (!favoriteData) {
      res.status(404).json({ message: 'No favorite found with this id!' });
      return;
    }

    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;