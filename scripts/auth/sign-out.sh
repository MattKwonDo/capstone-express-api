#!/bin/bash
# sh scripts/auth/sign-out.sh

API="http://localhost:4741"
URL_PATH="/sign-out"

TOKEN="Oh/8QER1pmg+m38iBxeKx47AQdjy3C2gd6/7cKJ3z+4=--56cpt5tmh/1ttMtQPvWVu1jd9+lqEZ26ckubA3N+ocs="
ID="5935762561865ceb789dbffb"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"

echo
