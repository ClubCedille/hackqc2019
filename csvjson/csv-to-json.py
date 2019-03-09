#!/usr/bin/env python
# -*- coding: utf-8 -*-

import csv
import json
import os
import sys
import codecs


for filename in sys.argv[1:]:

    csv_file = codecs.open(filename, "r", "utf-8")
    json_file = codecs.open(filename.strip('.csv') + ".json",'w', "utf-8")

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
            json.dump(row, json_file, ensure_ascii=False)
            if lenght == reader.line_num:
                json_file.write('\n')
                print("fin de fichier")
            else:
                json_file.write(',\n')

    json_file.write(']')
