const handleImageUrl = (req, res) =>  {

    const USER_ID = 'vtszy7uwboz9';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'dbee67e7b6f0464e8c005566a64f1f1c';
    const APP_ID = 'cf0200675a43489cb1d54999f2206da5';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = req.body.image_url;

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
    

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(response => { 
        if (response.status.code === 10000){
            res.status(200).json(response)
        } else{
            res.status(400).json({error: response.outputs[0].status.details})
        }
      })
      .catch(error => {
        console.log('error', error);
        res.status(400).json('error with clarifai server')
      })
               
}


export default handleImageUrl;