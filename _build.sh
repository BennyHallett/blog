echo "Cleaning old version"
rm -rf /var/www/*
echo "Building new version"
jekyll build
echo "Publishing new version"
cp -r ./_site/* /var/www
echo "Website published to http://dev.bennyhallett.com"
