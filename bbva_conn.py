import urllib2, base64, simplejson, json
request = urllib2.Request("https://api.bbva.com/apidatos/zones/consumption_pattern.json?date_min=201211&date_max=201211&group_by=month&zipcode=28025",None,{'Content-Type': 'application/json'})
base64string = base64.encodestring('%s:%s' % ("biglio-1.0", "655c5b007e761212440b0d9f4a07a230d41bc532")).replace('\n', '')
request.add_header("Authorization", "Basic %s" % base64string)
opener = urllib2.build_opener()   
data = simplejson.load(opener.open(request))
dataJson = json.dumps(data, sort_keys=True,indent=4, separators=(',', ': '))
print type( data)




