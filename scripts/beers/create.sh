#!/bin/bash
# sh scripts/beers/create.sh

API="http://localhost:4741"
URL_PATH="/beers"

TOKEN="Oh/8QER1pmg+m38iBxeKx47AQdjy3C2gd6/7cKJ3z+4=--56cpt5tmh/1ttMtQPvWVu1jd9+lqEZ26ckubA3N+ocs="
BRAND="first beer"
NAME="good beer"
STYLE="IPA"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
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
