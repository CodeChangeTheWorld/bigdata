FROM python:2.7.12-alpine # based on python 2.7.12 image
ENV SYMBOL “AAPL” # some environment variable settings, can be overridden
ENV TOPIC “stock-analyzer” # more setting
ENV KAFKA_LOCATION “192.168.99.100:9092” # - even more settings
ADD . /code # add your current building folder to /code folder in container
RUN pip install -r /code/requirements.txt # run the following command in container
CMD python /code/data-producer.py ${SYMBOL} ${TOPIC} ${KAFKA_LOCATION}