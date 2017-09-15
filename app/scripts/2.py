import os


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

if __name__ == "__main__":
    file_input = get_file_content(os.path.dirname(__file__) + '/input.txt')
    output = []
    for line in file_input:
        output.append(' '.join(line_manipulation(line)))
    output = os.linesep.join(output)
    print output
