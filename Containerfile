FROM registry.access.redhat.com/ubi8/ubi-minimal:8.5

RUN microdnf --disableplugin=subscription-manager -y install httpd \
  && microdnf --disableplugin=subscription-manager clean all \
  && sed -i -e 's/Listen 80/Listen 8080/' /etc/httpd/conf/httpd.conf \
  && sed -i -e 's/#ServerName www.example.com:80/ServerName 127.0.0.1:8080/' /etc/httpd/conf/httpd.conf \
  && chgrp -R 0 /var/log/httpd /var/run/httpd /var/www/html \
  && chmod -R g=u /var/log/httpd /var/run/httpd /var/www/html

COPY dist /var/www/html/

EXPOSE 8080

CMD [ "httpd", "-D", "FOREGROUND" ]
