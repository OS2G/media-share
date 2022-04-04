FROM debian:latest

RUN apt update && apt dist-upgrade -y && apt install -y build-essential libpcre3-dev libssl-dev zlib1g-dev git nginx libnginx-mod-rtmp

RUN mkdir -p /var/www/html/rtmp && \
	mkdir -p /var/www/html/stream/hls && \
	mkdir -p /var/www/html/stream/dart && \
	cp /usr/share/doc/libnginx-mod-rtmp/examples/stat.xsl /var/www/html/rtmp/stat.xsl 

COPY nginx.conf /etc/nginx/nginx.conf
COPY rtmp /etc/nginx/sites-available

RUN ln -s /etc/nginx/sites-available/rtmp /etc/nginx/sites-enabled

EXPOSE 1935
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
