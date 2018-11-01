FROM ubuntu:12.04
FROM python:2.7

COPY /. /.
COPY /production/. /var/www/pollstrReindhart/.
COPY /apache/0.0.0.0.conf /etc/apache2/sites-available/0.0.0.0.conf
COPY /apache/pollstrReindhart.wsgi /var/www/pollstrReindhart/pollstrReindhart.wsgi
COPY /apache/host /etc/host

RUN pip install -r requirements.txt
RUN apt-get update && \
  apt-get install emacs24 -y && \
  apt-get install lsof -y && \
  apt-get install nano -y && \
  apt-get install -y apache2 && \
  apt-get install -y apache2.2-common && \
  apt-get install -y apache2-mpm-prefork && \
  apt-get install -y apache2-utils && \
  apt-get install -y libexpat1 && \
  apt-get install -y ssl-cert && \
  apt-get install -y libapache2-mod-wsgi && \
  a2ensite 0.0.0.0.conf

ENV TZ=America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8000
EXPOSE 80
