#Adding a message
# time curl --location --request POST   'http://localhost:9003/message' \
# --header 'Content-Type: application/json' \
# --data-raw '{
#   "body": "this is a body",
#  "destination": "madrid"
# }'

#Adding 50 messages
time seq 1 50 | xargs -n1 -P10  curl --location --request POST 'http://localhost:9003/message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "body": "this is a body",
 "destination": "madrid"
}'

echo "\n POST made new record added \n"

# Getting a list of messages
# time curl --location --request GET 'http://localhost:9003/messages' \
# --header 'Content-Type: application/json' \
# --data-raw '{
#   "destination": "STRING",
#   "body": "STRING"
# }'


