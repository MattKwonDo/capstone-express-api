#!/bin/bash
# sh scripts/beers/update.sh

API="http://localhost:4741"
URL_PATH="/beers"

TOKEN="Oh/8QER1pmg+m38iBxeKx47AQdjy3C2gd6/7cKJ3z+4=--56cpt5tmh/1ttMtQPvWVu1jd9+lqEZ26ckubA3N+ocs="
# not user ID, but beer ID
ID="5935801773412425d550068d"

BRAND="first beer updated"
NAME="good beer updated"
STYLE="IPA updated"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "beer": {
      "brand": "'"${BRAND}"'",
      "name": "'"${NAME}"'",
      "style": "'"${STYLE}"'"
    }
  }'

echo
