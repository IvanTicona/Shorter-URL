const Url = require('../models/Url');
const { nanoid } = require('nanoid');
const validator = require('validator');

exports.createShortUrl = async (req, res) => {

  const { originalUrl } = req.body;

  if (!validator.isURL(originalUrl, { require_protocol: true })) {
    return res.status(400).render('index', { error: 'URL no válida. Asegúrate de incluir el protocolo (http:// o https://)' });
  }

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.status(200).render('index', { shortUrl: `${req.headers.host}/${url.shortId}` });
    }

    const shortId = nanoid(8);
    url = new Url({ originalUrl, shortId });
    await url.save();

    res.status(201).render('index', { shortUrl: `${req.headers.host}/${shortId}` });
  } catch (err) {
    console.error(err);
    res.status(500).render('index', { error: 'Error interno del servidor' });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await Url.findOne({ shortId });
    if (url) {
      url.clicks++;
      url.save();
      return res.status(200).redirect(url.originalUrl);
    } else {
      return res.status(404).render('index', { error: 'URL no encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).render('index', { error: 'Error interno del servidor' });
  }
};
