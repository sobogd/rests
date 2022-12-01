sudo apt update
sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm install 17
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 4000
sudo ufw enable
sudo nano /etc/nginx/sites-available/default -> change root /var/rests/admin/build
sudo systemctl restart nginx
cd /var
sudo git clone https://github.com/sobogd/rests.git
sudo chmod -R 777 /var/rests
cd /var/rests/admin
npm i
npm run build
cd /var/rests/server
// edit .env file for you security data
npm i
npm i pm2 -g
npm run build
