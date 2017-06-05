#!/bin/bash
# sh scripts/auth/sign-up.sh

API="http://localhost:4741"
URL_PATH="/sign-up"

EMAIL="a"
PASSWORD="aaa"
PASSWORD1="aaa"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD1}"'"
    }
  }'

echo
