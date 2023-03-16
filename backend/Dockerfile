FROM python:3.9

ENV PYTHONBUFFERED 1

ENV TZ='America/Sao_Paulo'

## INSTALANDO AS LIBS DO PYTHON UTILIZADAS NO PROJETO
RUN mkdir /dados
RUN apt-get update && apt-get install -y gcc && apt-get install -y default-libmysqlclient-dev && apt-get install gcc libpq-dev -y
RUN apt-get install python3-dev python3-pip python3-venv python3-wheel -y
RUN pip3 install wheel

# DIRETORIO INICIAL
WORKDIR /dados
COPY requeriments.txt /dados/
RUN pip install -r requeriments.txt
#EXPONDO A PORTA 

EXPOSE 5000
## ATIVANDO O SERVICE

ENTRYPOINT gunicorn -w 2 --bind 0.0.0.0:5000 fastcheckout.wsgi