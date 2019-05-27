FROM registry.onwarddb.ca/vanguard/client:v0.0.1
COPY ./build/ /root/vanguard.io/
WORKDIR /root/vanguard.io
RUN chmod -R 777 /root
CMD ["nginx", "-g", "daemon off;"]
