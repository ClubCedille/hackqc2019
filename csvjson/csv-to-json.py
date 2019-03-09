import csv
import json
import os
import sys

for filename in sys.argv[1:]:

    csv_file = open(filename, 'r');
    json_file = open(filename.strip('.csv') + ".json",'w')

    read_fields_command = "head -n 1 " + filename
    field_str = os.popen(read_fields_command).read()
    field_str = field_str.strip("\n")

    file_lenght_command = "cat " + filename + " | wc -l"
    lenght = int(os.popen(file_lenght_command).read())

    fields = field_str.split(",")

    reader = csv.DictReader( csv_file, fields)

    print(lenght)

    json_file.write('[')
    for row in reader:
        if reader.line_num > 1 :
            json.dump(row, json_file)
            if lenght == reader.line_num:
                json_file.write('\n')
                print("fin de fichier")
            else:
                json_file.write(',\n')

    json_file.write(']')
