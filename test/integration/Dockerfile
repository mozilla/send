FROM ubuntu:xenial

RUN apt-get update && \
  apt-get install -y python-pip python-dev && \
  pip install tox
COPY . /integration
WORKDIR /integration
RUN tox --notest

CMD ["tox", "-e", "integration-tests"]