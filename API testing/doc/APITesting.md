# API Testing

## Brief introduction

While testing our API, the following actions to test were discovered:

**If a key is empty**: it should response with a 400 error (bad request) and a info message explaining that neither "destination" nor "message" should be empty. Instead, it actually returns an 200 status

**Send more keys in the JSON object than expected**: it should response with a 400 error (bad request) and a info message explaining that the request must only contain "destination" and "message". Instead, it actually returns an 200 status


## How to test the API

1. Open your terminal
2. Go to the API holding folder
3. Connect to the Docker containers by running the command line *docker-compose up*
4. Go to the ``/API testing`` folder
5. Run the command line *npm test*