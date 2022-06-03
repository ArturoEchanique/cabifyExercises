# Messages external API Testing

## How to test the API

1. Open your terminal
2. Go to the messagesApp API folder
3. Connect to the Docker containers by running the command line *docker-compose up*
4. Go to the ``/API testing`` folder
5. Run the command line *npm test*


This API expects to receive a call with the POST method to the path /api/messages, the body of this call must consist of two parameters, one called destination and the other called message, whose value must be non-empty. 

In case the call is successful, you will receive a response saying "Message sent", with code 200.


## Problems to solve

While testing our API, the following actions to test were discovered:

**If a key is empty or does not exist**: it should response with a 400 error (bad request) and a info message explaining that neither "destination" nor "message" should be empty or not exist. Instead, it actually returns an 200 status

**Send more keys in the JSON object than expected**: it should response with a 400 error (bad request) and a info message explaining that the request must only contain "destination" and "message". Instead, it actually returns an 200 status

## Problems solved

| If...      | The response returns... |
| ------------- | ------------- | 
| ...the destination field is empty or it does not exist |  ...a 400 status and the message: "Destination field is required" |  
| ...the destination field is empty or it does not exist |  ...a 400 status and the message: "Message field is required"  | 
| ...both the destination and messsage fields are empty or they do not exist  |  ...a 400 status and the message: "Destination and message fields are required"   |  
| ...the request includes more keys than the two expected (message and destination) | ...a 400 status and the message: "Payload must not contain keys different to _destination_ and _message_"   | 



# Api contract

#Messages
* Message object
```
{
  destination: string
  message: string
  number: number
  state: string enum
}
```
**GET /messages**
----
  Returns all messages in the system.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  messages: [
           {<message_object>},
           {<message_object>},
           {<message_object>}
         ]
}
```

**POST /messages**
----
  Creates a new Message and returns a result message.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    destination: string,
    message: string
  }
```
* **Success Response:**  
  * **Code:** 200  
  **Content:**  `{ resMsg : "Message sent, db success" }`  
  OR
  * **Code:** 200  
  **Content:**  `{ resMsg : "Message sent, db failed" }`  
    OR
  * **Code:** 200  
  **Content:**  `{ resMsg : "Message sent unconfirmed, db success" }`  
    OR
  * **Code:** 200  
  **Content:**  `{ resMsg : "Message sent unconfirmed, db failed" }`  

* **Error Response:**  
  * **Code:** 504 
  **Content:** `{ resMsg : "Message could not be sent" }`  
  OR  
  * **Code:** 500
  **Content:** `{ resMsg : "Message could not be sent" }`





