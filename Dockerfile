FROM node:10.13
COPY . /home/vanguard.io
WORKDIR /home/vanguard.io
CMD npm start
