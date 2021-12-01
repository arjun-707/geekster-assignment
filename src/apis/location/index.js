const Route = require('express').Router();
const util = require("util")
const axios = require("axios").default;
const URLs = require("../../constants/urls");
const Config = require("../../config");

Route.get('/search/address', async (req, res) => {
  try {
    const { value } = req.query
    if (value) {
      const header = {
        headers: {
          Authorization: `Bearer ${Config.goeCodingAccessToken}`
        }
      }
      const url = util.format(URLs.addressSearchURL, value.replace(/ /g, '+'))
      console.log(url)
      const { status = null, data = null } = await axios.get(url, header)
      if (200 != status) throw new Error("unfortunately search didn't work")
      return res.status(200).send({
        error: false,
        msg: 'data fetched successfully',
        data: data.items[0].id
      })
    }
    throw new Error('input required')
  } catch (ex) {
    return res.status(500).send({
      error: true,
      msg: ex.message
    })
  }
})
Route.get('/search/keyword', async (req, res) => {
  try {
    const { latLong, value } = req.query
    if (latLong && value) {
      const header = {
        headers: {
          Authorization: `Bearer ${Config.goeCodingAccessToken}`
        }
      }
      const url = util.format(URLs.keywordSearchURL, latLong, value.replace(/ /g, '+'))
      const { status = null, data = null } = await axios.get(url, header)
      if (200 != status) throw new Error("unfortunately search didn't work")
      return res.status(200).send({
        error: false,
        msg: 'data fetched successfully',
        data: data.items.map(e => e.id)
      })
    }
    throw new Error('input required')
  } catch (ex) {
    return res.status(500).send({
      error: true,
      msg: ex.message
    })
  }
})

module.exports = Route