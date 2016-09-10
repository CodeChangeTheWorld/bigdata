FROM sequenceiq/spark

ENV KAFKA_LOCATION "192.168.99.100:9092"
CMD apt-get install python2.7
ADD . /code
CMD spark-submit --jars spark-streaming-kafka-0-8-assembly_2.11-2.0.0.jar stream-process.py stock-analyzer average-stock-process ${KAFKA_LOCATION}




