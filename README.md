sudo apt update
sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm install 17
sudo apt update
sudo apt install nginx
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

план на март

1. разделение по компаниям - структура - ид, логин, пароль, название
2. от админа видны все пользователи и возможно поменять и добавить пароли и данные
3. смена пароля и информации о компании от лица админа
4. вход по паролю для компании на неделю - далее по лицу на сутки
5. удаление заказов для админа
