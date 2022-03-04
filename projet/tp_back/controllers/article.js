const Article = require('../models/article');

exports.new = (req, res) => {
    const articleObject = JSON.parse(req.body.object);
    const article = new Article({
        ...articleObject,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    article.save()
    .then(() => res.status(201).json({message: 'Article enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.list = (req, res) => {
    Article.find()
    .then((arts) => {
        const mappedArts = arts.map((art) => { 
            art.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + art.image;
            return art 
        })
        res.status(201).json(mappedArts)
    })
    .catch(error => res.status(400).json({ error }));
};

exports.findOne = (req, res) => {
    Article.findOne({_id: req.params.id})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }))
};
