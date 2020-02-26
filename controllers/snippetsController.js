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
  } catch (error) {
    next(error)
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
      snippet: snippetData.snippet
    }
    res.render('snippets/edit', { viewData })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('..')
  }
}

homeController.update = async (req, res) => {
  try {
    console.log(req.body.id, ' hihihihi')
    await Snippet.updateOne({ _id: req.body.id }, {
      description: req.body.description,
      done: req.body.done === 'on'
    })
    req.session.flash = { type: 'success', text: 'snippet updated successfully' }
    res.redirect('/snippets')
  } catch (error) {
    req.session.flash = { type: 'failed', text: error.message }
    res.redirect('./edit')
  }
}

homeController.remove = async (req, res, next) => {
  try {
    console.log('AAAA', req.params.id)
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
    await Snippet.deleteOne({ _id: req.body.id })
    req.session.flash = { type: 'success', text: 'The task was deleted successfully.' }
    res.redirect('/snippets')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('./remove')
  }
}
module.exports = homeController
