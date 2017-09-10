import os

from django.conf import settings


class DisableCSRFOnDebug(object):
    def process_request(self, request):
        if settings.DEBUG:
            setattr(request, '_dont_enforce_csrf_checks', True)


def run_script():
    """
    running custom script to show result on UI
    :return: must be String value
    """
    file_input = get_file_content(os.path.dirname(__file__) + '/input.txt')
    output = []
    for line in file_input:
        output.append(' '.join(line_manipulation(line)))
    output = os.linesep.join(output)
    return output


def get_file_content(filepath):
    line_data = []
    with open(filepath) as f:
        for line in f:
            line_data.append(line)

    return line_data


def line_manipulation(content):
    """
    Remove 2nd and 3rd word from the content
    :param content:
    :return:
    """
    word_list = content.strip().split(' ')
    try:
        word_list.pop(1)
        word_list.pop(1)
    except Exception as e:
        pass
    return word_list
