# -*- coding: utf-8 -*-
import cyclone
from twisted.internet import reactor
from twisted.python import log
from twisted.web.static import File
import sockjs.cyclone
import requests
import sys
import json
import time
import numpy as np
import unicodedata
import re

class IndexHandler(cyclone.web.RequestHandler):
    """ Serve the chat html page """
    def get(self):

        self.render('./templates/index.html')

class ChatConnection(sockjs.cyclone.SockJSConnection):
    """ Chat sockjs connection """
       
    def messageReceived(self, message):
        questions = {
        1: "¿Cómo te llamas? Dime tu primer nombre",
        2: "Ahora tus apellidos",
        3: "En caso de inmediatamente tener una vacante para ti, ¿a qué número nos podríamos comunicar? Si estás fuera de México por favor incluye la marcación internacional.",
        4: "Tenemos que mandarte información importante ¿cuál es tu correo electrónico?",
        5: "¿Actualmente trabajas?",
        "si": {
        1: "¿Cómo se llama tu puesto?",
        2: "¿En qué empresa?",
        3: "¿Cuáles son tus funciones actuales?",
        4: "¿En cuál(es) de estas funciones te consideras más chingón?",
        5: "validar respuesta"
        },
        "no": {
        1: "En tu último trabajo, ¿cómo se llamaba tu puesto?",
        2: "¿Cómo se llamaba la empresa?",
        3: "¿Cuáles eran tus funciones?",
        4: "¿En cuál(es) de esas funciones consideras que eras más chingón?",
        5:" validar respuesta"
        }
        }               

        if questions[2] not in list_question:
            if len(message) >= 2 and len(message) <= 20:
                self.sendMessage(questions[2])
                list_question.append(questions[1])
                list_question.append(questions[2])
                dictt.update({"id_user": None, "datos_personales":{"nombre": message,'apellido': None, 'movil':{'movil_num': None}}})
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 20 caracteres.')

        elif questions[3] not in list_question:
            if len(message) >= 2 and len(message) <= 50:
                self.sendMessage(questions[3])
                list_question.append(questions[3])
                dictt['datos_personales']['apellido'] = message
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 50 caracteres.')

        elif questions[4] not in list_question:
            if len(message) == 10:
                self.sendMessage(questions[4])
                dictt['datos_personales']['movil']['movil_num'] = message
                list_question.append(questions[4])
            else:
                self.sendMessage('Ups! El número debe ser de 10 dígitos.')

        elif questions[5] not in list_question:
            match = re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', message)

            if match != None:
                self.sendMessage(questions[5])
                dictt['id_user'] = message
                list_question.append(questions[5])
            else:
                self.sendMessage('Ups! Verifica que esté bien escrito tu correo y mándalo nuevamente.')
        #Si
        elif message.lower() == 'si' or message.lower() == 'sí' and questions['si'][1] not in list_question:
            self.sendMessage(questions['si'][1])
            list_question.append(True)
            list_question.append(questions['si'][1])
            dictt.update({'datos_laborales':{ 'experiencia': []}})


        elif True in list_question and questions['si'][2] not in list_question:
            if len(message) <= 40:
                self.sendMessage(questions['si'][2])
                list_question.append(questions['si'][2])
                job.update({'trabajo_cia':None, 'trabajo_puesto': message, 'trabajo_func': None})
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 40 caracteres.')

        elif True in list_question and questions['si'][3] not in list_question:
            if len(message) <= 100:
                self.sendMessage(questions['si'][3])
                job['trabajo_cia'] = message
                list_question.append(questions['si'][3])
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 100 caracteres.')

        elif True in list_question and questions['si'][4] not in list_question:
            if len(message) <= 500:
                self.sendMessage(questions['si'][4])
                job['trabajo_func'] = message
                list_question.append(questions['si'][4])
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 500 caracteres.')

        elif True in list_question and questions['si'][5] not in list_question:
            if len(message) <= 500:
                self.sendMessage('Perfecto! Hemos terminado, tus datos están siendo procesados.')
                dictt.update({'educacion_y_habilidades': message})
                list_question.append(questions['si'][5])
                dictt['datos_laborales']['experiencia'] = [job]
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 500 caracteres.')
        #No
        elif message.lower() == 'no' and questions['no'][1] not in list_question:
            self.sendMessage(questions['no'][1])
            list_question.append(False)
            list_question.append(questions['no'][1])
            dictt.update({'datos_laborales':{ 'experiencia': []}})


        elif False in list_question and questions['no'][2] not in list_question:
            if len(message) <= 40:
                self.sendMessage(questions['no'][2])
                job.update({'trabajo_cia':None, 'trabajo_puesto':message, 'trabajo_func': None})
                list_question.append(questions['no'][2])
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 40 caracteres.')

        elif False in list_question and questions['no'][3] not in list_question:
            if len(message) <= 100:
                self.sendMessage(questions['no'][3])
                job['trabajo_cia'] = message
                list_question.append(questions['no'][3])
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 100 caracteres.')

        elif False in list_question and questions['no'][4] not in list_question:
            if len(message) <= 500:
                self.sendMessage(questions['no'][4])
                job['trabajo_func'] = message
                list_question.append(questions['no'][4])
            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 500 caracteres.')

        elif False in list_question and questions['no'][5] not in list_question:
            if len(message) <= 500:
                self.sendMessage('Perfecto! Hemos terminado, tus datos están siendo procesados.')
                dictt.update({'educacion_y_habilidades': {'chingon':message}})
                list_question.append(questions['no'][5])
                dictt['datos_laborales']['experiencia'] = [job]

            else:
                self.sendMessage('Ups! Trata de mandarnos máximo 500 caracteres.')
        print job
        print 'json final'
        print json.dumps(dictt)
log.startLogging(sys.stdout)

ChatRouter = sockjs.cyclone.SockJSRouter(ChatConnection, '/chat')

app = cyclone.web.Application( [ (r"/", IndexHandler) ] +
                                       ChatRouter.urls )

global list_question 
list_question = [] 
global dictt
dictt = {}
global job
job = {}
reactor.listenTCP(8000, app)

reactor.run()

