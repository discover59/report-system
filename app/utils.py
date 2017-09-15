import os

from django.conf import settings


class DisableCSRFOnDebug(object):
    def process_request(self, request):
        if settings.DEBUG:
            setattr(request, '_dont_enforce_csrf_checks', True)


def run_script(index):
    """
    running custom script to show result on UI
    :return: must be String value
    """
    try:
        return os.popen(os.path.dirname(__file__) + os.sep + 'scripts' + os.sep + str(index) + '.py').read()
    except Exception as e:
        return 'No Script at all'
