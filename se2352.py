#!/usr/bin/env python3

import argparse
import requests
import json
import csv


API_BASE_URL = 'https://localhost:9876/ntuaflix_api'

CERT_PATH = ('./server.pem')  # Tuple containing certificate and private key paths

def healthcheck():

    response = requests.get(f'{API_BASE_URL}/admin/healthcheck', verify=CERT_PATH)
    if response.status_code == 200:
        print('Healthcheck successful.')
        print(response.json())  # Print the JSON response
    else:
        print('Healthcheck failed.')


def resetall():
    response = requests.post(f'{API_BASE_URL}/admin/resetall', verify=False)
    if response.status_code == 200:
        print('Reset all successful.')
        print(response.json())  # Print the JSON response
    else:
        print('Reset all failed.')


def newtitles(filename):
    url = f'{API_BASE_URL}/admin/upload/titlebasics'  # Replace with the correct API endpoint
    with open(filename, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, files=files, verify=False)

    if response.status_code == 200:
        print('Upload successful.')
        print(response.json())  # Print the JSON response
    elif response.status_code == 400:
        print('Upload failed - Data error.')
        print(response.json())  # Print the error details
    else:
        print('Upload failed.')
        print(response.json())  # Print the error message


def newakas(filename):
    url = f'{API_BASE_URL}/admin/upload/titleakas'  # Replace with the correct API endpoint
    with open(filename, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, files=files, verify=False)

    if response.status_code == 200:
        print('Upload successful.')
        print(response.json())  # Print the JSON response
    elif response.status_code == 400:
        print('Upload failed - Data error.')
        print(response.json())  # Print the error details
    else:
        print('Upload failed.')
        print(response.json())  # Print the error message


def newnames(filename):
    url = f'{API_BASE_URL}/admin/upload/namebasics'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=False)

        if response.status_code == 200:
            print('Upload successful.')
            print(response.json())  # Print the JSON response
        elif response.status_code == 400:
            print('Upload failed - Data error.')
            print(response.json())  # Print the error details
        else:
            print('Upload failed.')
            print(response.json())  # Print the error message
    finally:
        files['file'].close()  # Ensure the file is closed after the upload


def newcrew(filename):
    url = f'{API_BASE_URL}/admin/upload/titlecrew'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=False)

        if response.status_code == 200:
            print('Upload successful.')
            print(response.json())  # Print the JSON response
        elif response.status_code == 400:
            print('Upload failed - Data error.')
            print(response.json())  # Print the error details
        else:
            print('Upload failed.')
            print(response.json())  # Print the error message
    finally:
        files['file'].close()  # Ensure the file is closed after the upload


def newepisode(filename):
    url = f'{API_BASE_URL}/admin/upload/titleepisode'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=False)

        if response.status_code == 200:
            print('Upload successful.')
            print(response.json())  # Print the JSON response
        elif response.status_code == 400:
            print('Upload failed - Data error.')
            print(response.json())  # Print the error details
        else:
            print('Upload failed.')
            print(response.json())  # Print the error message
    finally:
        files['file'].close()  # Ensure the file is closed after the upload


def newprincipals(filename):
    url = f'{API_BASE_URL}/admin/upload/titleprincipals'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=False)

        if response.status_code == 200:
            print('Upload successful.')
            print(response.json())  # Print the JSON response
        elif response.status_code == 400:
            print('Upload failed - Data error.')
            print(response.json())  # Print the error details
        else:
            print('Upload failed.')
            print(response.json())  # Print the error message
    finally:
        files['file'].close()  # Ensure the file is closed after the upload
        

def newratings(filename):
    url = f'{API_BASE_URL}/admin/upload/titleratings'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=False)

        if response.status_code == 200:
            print('Upload successful.')
            print(response.json())  # Print the JSON response
        elif response.status_code == 400:
            print('Upload failed - Data error.')
            print(response.json())  # Print the error details
        else:
            print('Upload failed.')
            print(response.json())  # Print the error message
    finally:
        files['file'].close()  # Ensure the file is closed after the upload

def searchname(name):
    url = f'{API_BASE_URL}/searchname'
    payload = {'nqueryObject': {'namePart': name}}

    try:
        response = requests.get(url, json=payload, verify=False)
        response.raise_for_status()

        if response.status_code == 200:
            print('Request successful.')
            print(response.json())
        elif response.status_code == 204:
            print('Name not found.')
        else:
            print(f'Request failed with status code {response.status_code}.')
            print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')


def searchtitle(titlepart):
    url = f'{API_BASE_URL}/searchtitle'
    payload = {'tqueryObject': {'titlePart': titlepart}}
    
    try:
        response = requests.get(url, json=payload, verify=False)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)
        
        if response.status_code == 200:
            print('Request successful.')
            print(response.json())
        elif response.status_code == 204:
            print('Title not found.')
        else:
            print(f'Request failed with status code {response.status_code}.')
            print(response.json())
            
    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

def bygenre(qgenre, min):
    url = f'{API_BASE_URL}/bygenre'
    payload = {
        'gqueryObject': {
            'qgenre': qgenre,
            'minrating': min
        }
    }

    try:
        response = requests.get(url, json=payload, verify=False)
        response.raise_for_status()

        if response.status_code == 200:
            print('Request successful.')
            print(response.json())
        elif response.status_code == 204:
            print('No data to return.')
        else:
            print(f'Request failed with status code {response.status_code}.')
            print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

def name(nameID):
    url = f'{API_BASE_URL}/name/{nameID}'
    
    try:
        response = requests.get(url, verify=False)
        response.raise_for_status()

        if response.status_code == 200:
            print('Request successful.')
            print(response.json())
        elif response.status_code == 204:
            print('No data to return.')
        else:
            print('Request failed.')
            print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

     
##################################################################

def main():
    parser = argparse.ArgumentParser(description='CLI for se2270')
    subparsers = parser.add_subparsers(dest='scope', required=True)

    # Healthcheck subparser
    healthcheck_parser = subparsers.add_parser('healthcheck')
    healthcheck_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Resetall subparser
    resetall_parser = subparsers.add_parser('resetall')
    resetall_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparser for bygenre command
    bygenre_parser = subparsers.add_parser('bygenre')
    bygenre_parser.add_argument('--genre', type=str, required=True, help='Genre to search for')
    bygenre_parser.add_argument('--min', type=float, required=True, help='Minimum rating')
    #bygenre_parser.add_argument('--from', dest='fromYear', type=int, help='Start year for the search')
    #bygenre_parser.add_argument('--to', dest='toYear', type=int, help='End year for the search')

# Subparser for name
    name_parser = subparsers.add_parser('name')
    name_parser.add_argument('--nameID', type=str, help='Name ID for the bynameID endpoint')

# Subparser for searchtitle
    searchtitle_parser = subparsers.add_parser('searchtitle')
    searchtitle_parser.add_argument('--titlepart', type=str, help='Title part for the searchtitle endpoint')
    

    searchname_parser = subparsers.add_parser('searchname')
    searchname_parser.add_argument('--name', type=str, help='Name part for the searchname endpoint')
    
    # Subparsers for file upload commands
    upload_scopes = ['newtitles', 'newakas', 'newnames', 'newcrew', 'newepisode', 'newprincipals', 'newratings']
    for scope in upload_scopes:
        upload_parser = subparsers.add_parser(scope)
        upload_parser.add_argument('--filename', type=argparse.FileType('rb'), required=True, help='Path to the file for upload')

    args = parser.parse_args()

    # Call the corresponding function based on the selected scope
    if args.scope == 'healthcheck':
        healthcheck()
    elif args.scope == 'resetall':
        resetall()
    elif args.scope in upload_scopes:
        globals()[args.scope](args.filename.name)
    elif args.scope == 'name':
        name(args.nameID)
    elif args.scope == 'searchtitle':
        searchtitle(args.titlepart)
    elif args.scope == 'searchname':
        searchname(args.name)
    elif args.scope == 'bygenre':
        bygenre(args)


if __name__ == '__main__':
    main()
#######################################################################
#de doulevoun ta format akoma
#commands: python se2352.py scope param1 -value1 