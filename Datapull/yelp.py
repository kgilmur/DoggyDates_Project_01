# -*- coding: utf-8 -*-

import argparse
import json
import pprint
import sys
import urllib
import urllib2
import csv
import oauth2
import unicodecsv
import time

ResultList = []
SeattleList = []

with open ('SeattleNeighborhoods.csv','rU') as csvfiles:
    Neighborhood = unicodecsv.reader(csvfiles, delimiter=',')
    for row in Neighborhood:
        SeattleList.append(row[0])

index = 0

while (index < 83):
    areaName = SeattleList[index]

    def main():
        parser = argparse.ArgumentParser()

        parser.add_argument('-q', '--term', dest='term', default=DEFAULT_TERM, type=str, help='Search term (default: %(default)s)')
        parser.add_argument('-l', '--location', dest='location', default=DEFAULT_LOCATION, type=str, help='Search location (default: %(default)s)')

        input_values = parser.parse_args()

        try:
            query_api(input_values.term, input_values.location)
        except urllib2.HTTPError as error:
            sys.exit('Encountered HTTP error {0}. Abort program.'.format(error.code))

    API_HOST = 'api.yelp.com'
    DEFAULT_TERM = 'dog friendly'
    DEFAULT_LOCATION = areaName
    SEARCH_PATH = '/v2/search/'
    BUSINESS_PATH = '/v2/business/'

    # OAuth credential placeholders that must be filled in by users.
# CONSUMER KEYS GO HERE


    def request(host, path, url_params=None):
        url_params = url_params or {}
        url = 'http://{0}{1}?'.format(host, urllib.quote(path.encode('utf8')))

        consumer = oauth2.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
        oauth_request = oauth2.Request(method="GET", url=url, parameters=url_params)

        oauth_request.update(
            {
                'oauth_nonce': oauth2.generate_nonce(),
                'oauth_timestamp': oauth2.generate_timestamp(),
                'oauth_token': TOKEN,
                'oauth_consumer_key': CONSUMER_KEY
            }
        )
        token = oauth2.Token(TOKEN, TOKEN_SECRET)
        oauth_request.sign_request(oauth2.SignatureMethod_HMAC_SHA1(), consumer, token)
        signed_url = oauth_request.to_url()

        print u'Querying {0} ...'.format(url)

        conn = urllib2.urlopen(signed_url, None)
        try:
            response = json.loads(conn.read())
        finally:
            conn.close()

        return response

    def search(term, location):
        url_params = {
            'term': term.replace(' ', '+'),
            'location': location.replace(' ', '+')
        }
        return request(API_HOST, SEARCH_PATH, url_params=url_params)

    def get_business(business_id):
        business_path = BUSINESS_PATH + business_id

        return request(API_HOST, business_path)

    def query_api(term, location):
        response = search(term, location)

        businesses = response.get('businesses')

        if not businesses:
            print u'No businesses for {0} in {1} found.'.format(term, location)
            return

        indexer = 0

        while (indexer < len(businesses)):
            business_id = businesses[indexer]['id']
            location = businesses[indexer]['location']

            response = get_business(business_id)
            jsonr = json.dumps(response)

            restName = response.get('name')
            rating = response.get('rating')
            webURL = response.get('url')
            phone = response.get('phone')
            cityName = location.get('city')
            postalCode = location.get('postal_code')
            categories = response.get('categories')
            neighborhood = location.get('neighborhoods')
            streetAdd = location.get('display_address')

            ResultList.append([restName,rating,webURL,phone,categories,streetAdd,postalCode,cityName,neighborhood])
            print ResultList
            time.sleep(1)
            indexer = indexer + 1

    if __name__ == '__main__':
        main()

    index = index + 1

resultFile = open('yelpResult2.csv','wb')
wr = unicodecsv.writer(resultFile, dialect='excel')
wr.writerow(['restName','rating','webURL','phone','categories','streetAdd','postalCode','cityName','neighborhood'])
wr.writerows(ResultList)