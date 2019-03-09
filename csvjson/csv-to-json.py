import csv
import json
import os
import sys

print(sys.argv)

for filename in sys.argv[1:]:

    csv_file = open(filename, 'r');
    json_file = open(filename.strip('.csv') + ".json",'w')

    read_fields_command = "head -n 1 " + filename
    field_str = os.popen(read_fields_command).read()

    fields = field_str.split(",")

    reader = csv.DictReader( csv_file, fields)

    for row in reader:
        if reader.line_num > 1 :
            json.dump(row, json_file)
            json_file.write('\n')


