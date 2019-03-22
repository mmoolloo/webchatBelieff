FROM library/ubuntu:18.10

COPY /. /webchat/.
COPY /. /var/www/webchat/.
COPY /apache/0.0.0.0.conf /etc/apache2/sites-available/0.0.0.0.conf
COPY /apache/webchat.wsgi /var/www/webchat/webchat.wsgi
COPY /apache/host /etc/host

RUN	apt-get update \
    && apt-get install emacs24 -y \
    && apt-get install lsof -y \
    && apt-get install -y openssh-server \
    && apt-get install -y python3.6 \
    && apt-get install -y python3-pip \
    && pip3 install -r /webchat/requirements.txt \
    && apt-get install -y git-core \
    && apt-get install -y build-essential \
    && apt-get install nano -y \
	&& apt-get install vim -y \
	&& apt-get install -y apache2 \
	&& apt-get install -y libexpat1 \
	&& apt-get install -y ssl-cert \
	&& apt-get install -y libapache2-mod-wsgi-py3 \
	&& rm -rf /var/lib/apt/lists/*

RUN a2ensite 0.0.0.0.conf
RUN chown -R www-data:www-data /var/www/webchat/
ENV TZ=America/Mexico_City
EXPOSE 80
EXPOSE 22
