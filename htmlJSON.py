from bs4 import BeautifulSoup
import requests
import json

r = requests.get("http://localhost:3000")
data = r.text
soup = BeautifulSoup(data, "lxml")

text = soup.find_all(['p', 'h1'])
headers = soup.find_all('h1')
f = {}
for num, t in enumerate(text):
  if t.contents is not None and len(t.contents) > 0:
    f.update({num:t.contents[0]})

print(f)
