const USER_ID = 'vtszy7uwboz9';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'dbee67e7b6f0464e8c005566a64f1f1c';
const APP_ID = 'cf0200675a43489cb1d54999f2206da5';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
const IMAGE_URL = (req, res) => {
    req.body.input
};


const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };



const handleImage = (req, res,db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('entry failed'))
}

export default handleImage;