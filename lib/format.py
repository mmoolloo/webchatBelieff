import json


def formatData(id_user: str, nombre: str, apellido: str, movil_num: str, trabajo_cia: str,
               trabajo_periodo_fin: str, trabajo_puesto: str, trabajo_func: str, chingon: str):

    data = {"data":
                {
                    "id_user": id_user,
                    "datos_personales": {
                        "nombre": nombre,
                        "apellido": apellido,
                        "movil": {
                            "movil_num": movil_num
                        },
                    },
                    "datos_laborales": {
                        "experiencia": [
                            {
                                "trabajo_cia": trabajo_cia,
                                "trabajo_periodo": {
                                    "trabajo_periodo_fin": trabajo_periodo_fin
                                },
                                "trabajo_puesto": trabajo_puesto,
                                "trabajo_func": trabajo_func
                            }
                        ]
                    },
                    "educacion_y_habilidades": {
                        "chingon": chingon
                    }
                }
                }

    return json.dumps(data)
