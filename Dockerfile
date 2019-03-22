FROM ubuntu:16.04

COPY /. /webchat/.
COPY /. /var/www/webchat/.
COPY /apache/0.0.0.0.conf /etc/apache2/sites-available/0.0.0.0.conf
COPY /apache/webchat.wsgi /var/www/webchat/webchat.wsgi
COPY /apache/host /etc/host

RUN pip install -r ./webchat/requirements.txt
RUN apt-get update && \
  apt-get install emacs24 -y && \
  apt-get install lsof -y && \
  apt-get install -y software-properties-common && \
  add-apt-repository ppa:jonathonf/python-3.6 && \
  apt-get update && \
  apt-get install nano -y && \
  apt-get install -y apache2 && \
  apt-get install -y apache2 && \
	apt-get install -y libexpat1 && \
	apt-get install -y ssl-cert && \
	apt-get install -y libapache2-mod-wsgi-py3 && \
  apt-get install -y openssh-server && \
	rm -rf /var/lib/apt/lists/* && \
  python3.6 -m pip install pip --upgrade && \
  python3.6 -m pip install wheel && \
  pip3 install pipreqs && \
  a2ensite 0.0.0.0.conf

ENV TZ=America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8000
EXPOSE 80
