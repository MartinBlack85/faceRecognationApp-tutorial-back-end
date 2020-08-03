const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9e5942900ec24b87b334cd30bed3e636'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}



const handleImage = (req, res, dataBase) => {
    const { id } = req.body;
    dataBase('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('error getting user entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};