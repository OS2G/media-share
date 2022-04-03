FROM debian:latest

RUN apt update && apt dist-upgrade -y && apt install -y build-essential libpcre3-dev libssl-dev zlib1g-dev git

RUN mkdir -p /tmp/build/nginx && \
	cd /tmp/build/nginx && \
	git clone https://github.com/nginx/nginx.git && \
	git clone https://github.com/arut/nginx-rtmp-module.git && \
	cd nginx && \
	./auto/configure --add-module=../nginx-rtmp-module && \
	make && \
	make install && \
	mkdir -p /usr/local/nginx/conf.d && \
	mkdir -p /usr/local/nginx/sites-available && \
	mkdir -p /usr/local/nginx/sites-enabled && \
	mkdir -p /var/www/html/stream/hls && \
	mkdir -p /var/www/html/stream/dart

COPY nginx.conf /usr/local/nginx/conf

EXPOSE 1935
EXPOSE 80

CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]