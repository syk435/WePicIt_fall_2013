from boto.s3.connection import S3Connection
from boto.s3.key import Key

conn = S3Connection('*********', '************')
bucket = conn.lookup('wepicit')

rs = conn.get_all_buckets()

finalthis = 'h'
finalthis = finalthis[1:]

for b in rs:
        print b.name

b = rs[0] #might later be 0

log_file = open('test.txt', 'w')

for key in bucket.list():
        print>>log_file, key

log_file.close()


fh = open('test.txt', 'r')
ab = open('final.txt', 'w')

line = fh.readline()
while line:
    line = fh.readline()
    line = line[14:-2]
    while line:
        line = 'https://s3-us-west-2.amazonaws.com/wepicit/' + line
        ab.write(line + '\n')
        finalthis = finalthis + line + '\n'
        break
fh.close()
ab.close()

print finalthis

k = Key(b)
k.key = 'index.txt'
k.set_contents_from_string( finalthis)
#upload index.html
b.set_acl('public-read')
