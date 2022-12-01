BACK pm2 stop 0 && npm i && npm run build && pm2 start lib/index.js
FRONT npm i && npm run build

sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm install 17
udo apt update
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 4000
sudo ufw enable
root /var/rests/admin/build;
change root /var/rests/admin/build
sudo systemctl restart nginx
sudo chmod -R 777 /var/rests
cd /var/rests/admin
npm i
npm run build
cd /var/rests/server
// edit .env file for you security data
npm i
npm install pm2 -g
npm run build
