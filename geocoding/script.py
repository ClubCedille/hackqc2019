import csv
import sys
import requests
from array import *
import json

array = []
count = 0

f = open(sys.argv[1], 'r', encoding="latin1")
reader = csv.reader(f)
for row in reader:
	
	if count == 0:
		row.append('long')	# -73.637289704576
		row.append('lat')	# 45.5033548732072
	else:
		r = requests.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD7DRx9Ll0jGqzneZ1pE0v17rMe3MW6AQo&address=intersection%20' + row[1] + '%20and%20' + row[2] + ',%20Montr%C3%A9al')

		data = r.json()

		try:
			row.append(data["results"][0]["geometry"]["location"]["lng"])
			row.append(data["results"][0]["geometry"]["location"]["lat"])
		except:
			print("********* coint de rue " + str(count) + " a trigger un exception")

	array.append(row)

	# Print last element of array
	print(array[-1])

	count = count + 1

# 32 

	# Limit the number of samples for a test
#	if count == 5:
#		break
f.close()

# Dump array to CSV
with open("output.csv", "w") as f:
	writer = csv.writer(f)
	writer.writerows(array)
