import re
import requests
import urllib.parse
import sys

arg1 = sys.argv[1]
textfile = open('test1.txt', 'r')
filetext = textfile.read()
textfile.close()
# arg1 = '\/api\/node\/class\/topSystem\.json\?query-target-filter=and\(eq\(topSystem.oobMgmtAddr,%2210\.142\.60\.11%22\)\)'
# arg1 = '/api/node/class/topSystem.json?query-target-filter=and(eq(topSystem.oobMgmtAddr,%2210.142.60.11%22))'
arg1 = arg1.replace(r'?','\?' )
arg1 = arg1.replace(r'(','\(' )
arg1 = arg1.replace(r')','\)' )
pattern = re.findall(r'<<APIC GET URL>>:\shttps:\/\/apic\.ams\.se' + arg1 + '\n-------Response--------\n(.*)', filetext)
# print(filetext.find(arg1))
# pattern = re.findall(arg1, filetext)

# for i in pattern:
#     data = {
#         "id": 0,
#         "method": "get",
#         "enabled": True,
#         "endpoint": urllib.parse.quote(i[0], safe='~@#$&()*!+=:;,?./\''),
#         "status_code": 200,
#         "body": i[1],
#         "headers": [
#             {}
#         ]
#     }
aa = pattern[0] + ''
aa = aa.strip()
print(aa)
# print(arg1)
# print(filetext)
sys.stdout.flush()
    # response = requests.post('http://10.0.15.1/api/routes', json=data)
    # if response.status_code != 200:
    #     print('Not available to post for url: ' + i[0] + ' Status Code: ' + str(response.status_code))