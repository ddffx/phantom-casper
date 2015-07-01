FROM servebox/phantomjs

RUN git clone https://github.com/n1k0/casperjs.git /srv/var/casperjs && \
  ln -s /srv/var/casperjs/bin/casperjs /usr/bin/casperjs && \
  apt-get autoremove -y && \
  apt-get clean all

WORKDIR /app

ADD ./app /app/

WORKDIR /data
CMD ["/usr/bin/casperjs"]