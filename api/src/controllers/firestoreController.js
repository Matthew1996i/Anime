const randomstring = require('randomstring');
const { config } = require('../services/firebase');

const addAnime = async (req, res) => {
  const db = config.firestore();

  const {
    url,
    title,
    airing,
    synopsis,
    type,
    episodes,
    score,
    members,
    rated,
  } = req.body;

  const data = {
    mal_id: req.body.mal_id,
    url,
    image_url: req.body.image_url,
    title,
    airing,
    synopsis,
    type,
    episodes,
    score,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    members,
    rated,
  };

  await db.collection('users').doc(req.uuid).collection('anime-list').doc(randomstring.generate())
    .set(data)
    .then((resp) => resp)
    .catch((err) => err);

  res.status(200).json({
    message: 'collection created successfully!',
  });
};

module.exports = {
  addAnime,
};
