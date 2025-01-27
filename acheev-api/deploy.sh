yarn build
yarn generate-schema
rm ./deploy.zip
copy firebase.json file to build folder
zip ./deploy.zip -r * .[^.]* -x "tmp/*" -x "log/*" -x "logs/*" -x ".env" -x "src/*" -x "node_modules/*"
eb deploy --verbose