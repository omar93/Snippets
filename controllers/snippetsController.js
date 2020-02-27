const Snippet = require('../models/Snippet')

const homeController = {}

/**
 * This is the index controller for the snippets
 * it shows all snippets on the page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.index = async (req, res) => {
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
    console.log(err)
  }
}

/**
 * This is the new snippet controller
 * it renders the page where you create
 * a new snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.new = (req, res) => {
  res.render('snippets/new')
}

/**
 * Redirects user after POST that
 * creates a new snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
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
    res.redirect('/snippets')
  }
}

/**
 * Renders the edit page when user clicks it
 * and gives the editing option.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.edit = async (req, res) => {
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

/**
 * Updates the snippet that the user choose
 * to edit and redirects the user depending
 * on sucess.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
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
      req.session.flash = { type: 'failed', text: 'This is not your code snippet so you can not edit it' }
      res.redirect('/snippets')
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * Renders the remove page on the specific snippet the
 * user choose.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.remove = async (req, res) => {
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

/**
 * Deletes the choosen snippet from the database
 * if the user deleting it is the one who created it
 * then redirects the user depending on sucess.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.delete = async (req, res) => {
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
