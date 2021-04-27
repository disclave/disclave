domain=${DOMAIN}
nextAuthUrl=${NEXTAUTH_URL}

replaceStr="${HEROKU_APP_NAME}"
appName=${HEROKU_APP_NAME}

export DOMAIN="${domain/$replaceStr/$appName}"
export NEXTAUTH_URL="${nextAuthUrl/$replaceStr/$appName}"