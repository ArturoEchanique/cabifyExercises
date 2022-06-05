#Adding a message
time curl --location --request POST 'http://localhost:9001/api/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
  "message": "this is a body",
 "destination": "madrid"
}'

echo "\n POST made new record added \n"

# Getting a list of messages
time curl --location --request GET 'http://localhost:9001/api/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
  "destination": "STRING",
  "message": "STRING"
}'


