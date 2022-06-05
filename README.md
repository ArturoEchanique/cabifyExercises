Server Routes

| METHOD |             URL              |              DESCRIPTION              |
| ------ | :--------------------------: | :-----------------------------------: |
| GET    | /hello-world                 | returns a "hello world"               |
| POST   | /messages                    | send a message                        |
| GET    | /messages                    | get all messages from database        |

You can test the API running a command line and executing a Postman collection. You can read further information in the [API testing documentation](https://github.com/ArturoEchanique/cabifyExercises/blob/arturo.echanique/hacking-partner/API%20testing/doc/APITesting.md)

To run this service:

run messageapp with npm run docker

You can run ./curl_requests.sh to run some curl into the app and see results.