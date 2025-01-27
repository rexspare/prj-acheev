yarn build
rm ./deploy.zip
zip ./deploy.zip -r * .[^.]* -x "node_modules/*" -x "src/*" -x ".env" -x "server/*"
eb deploy --verbose