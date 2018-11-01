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


class IndexHandler(cyclone.web.RequestHandler):
    """ Serve the chat html page """
    def get(self):

        self.render('./templates/index.html')

class ChatConnection(sockjs.cyclone.SockJSConnection):
    """ Chat sockjs connection """

    def messageReceived(self, message):

        def returnTag(i):
            return tags[i]
        
        if message == 'Hola':
            self.sendMessage('Hola soy un bot')
        else:
            self.sendMessage('Hola, '+message)
        

log.startLogging(sys.stdout)

ChatRouter = sockjs.cyclone.SockJSRouter(ChatConnection, '/chat')

app = cyclone.web.Application( [ (r"/", IndexHandler) ] +
                                       ChatRouter.urls )

reactor.listenTCP(8000, app)

reactor.run()

