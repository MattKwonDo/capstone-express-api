#!/bin/bash
# sh scripts/beers/destroy.sh

API="http://localhost:4741"
URL_PATH="/beers"

TOKEN="Oh/8QER1pmg+m38iBxeKx47AQdjy3C2gd6/7cKJ3z+4=--56cpt5tmh/1ttMtQPvWVu1jd9+lqEZ26ckubA3N+ocs="
# not user ID, but beer ID
ID="593585f1e5bf962b78a40bf2"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
