const Snippet = require('../models/Snippet')

const homeController = {}

homeController.index = async (req, res, next) => {
  try {
    const viewData = {
      snippets: (await Snippet.find({}))
        .map(snippet => ({
          id: snippet._id,
          snippet: snippet.snippet,
          creator: snippet.create
        }))
    }
    res.render('snippets/index', { viewData })
  } catch (err) {
    next(err)
  }
}

homeController.new = (req, res) => {
  res.render('snippets/new')
}

homeController.create = async (req, res) => {
  if (req.session.email === undefined) {
    req.session.flash = { type: 'failed', text: 'No user found, you need to sign in to be able to post a snippet' }
    res.redirect('/login')
  } else {
    const newSnippet = new Snippet({
      snippet: req.body.snippet,
      creator: req.session.email
    })
    await newSnippet.save()
    req.session.flash = { type: 'success', text: 'snippet saved successfully' }
    res.redirect('.')
  }
}

homeController.edit = async (req, res, next) => {
  try {
    const snippetData = await Snippet.findOne({ _id: req.params.id })
    const viewData = {
      id: snippetData._id,
      snippet: snippetData.snippet,
      creator: snippetData.email
    }
    res.render('snippets/edit', { viewData })
  } catch (err) {
    console.log(err)
    res.redirect('..')
  }
}

homeController.update = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.body.id)
    const creator = snippet.creator

    if (creator === req.session.email) {
      await Snippet.updateOne({ _id: req.body.id }, {
        snippet: req.body.snippet,
        create: req.session.email
      })
      req.session.flash = { type: 'success', text: 'Updated code snippet' }
      res.redirect('/snippets')
    } else {
      req.session.flash = { type: 'failed', text: 'This is not your code snippet so you can not delete it' }
      res.redirect('/snippets')
    }
  } catch (err) {
    console.log(err)
  }
}

homeController.remove = async (req, res, next) => {
  try {
    const snippetData = await Snippet.findOne({ _id: req.params.id })
    const viewData = {
      id: snippetData._id,
      creator: snippetData.email,
      snippet: snippetData.snippet
    }
    res.render('snippets/remove', { viewData })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('..')
  }
}

homeController.delete = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.body.id)
    const creator = snippet.creator

    if (creator === req.session.email) {
      await Snippet.deleteOne({ _id: req.body.id })
      req.session.flash = { type: 'success', text: 'Deleted code snippet' }
      res.redirect('/snippets')
    } else {
      req.session.flash = { type: 'failed', text: 'This is not your code snippet so you can not delete it' }
      res.redirect('/snippets')
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports = homeController
