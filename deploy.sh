# abort on errors
set -e

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:nconnector/cell-tower-distance-calculation.git master:back-end
cd -