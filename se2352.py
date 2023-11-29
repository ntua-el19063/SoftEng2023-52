#!/usr/bin/env python3

import argparse
import requests
import json
import csv

API_BASE_URL = 'https://localhost:9876/ntuaflix_api'

cert_path= 'C:\Users\giannis\Downloads\SoftEng2023-52-main\SoftEng2023-52-main\api\server.cert'

def healthcheck():
    response = requests.get(f'{API_BASE_URL}/admin/healthcheck', verify=cert_path)
    if response.status_code == 200:
        print('Healthcheck successful.')
        print(response.json())  # Print the JSON response
    else:
        print('Healthcheck failed.')


def resetall():
    response = requests.post(f'{API_BASE_URL}/admin/resetall', verify=cert_path)
    if response.status_code == 200:
        print('Reset all successful.')
        print(response.json())  # Print the JSON response
    else:
        print('Reset all failed.')


def newtitles(filename):
    url = f'{API_BASE_URL}/path/to/uploadtb'  # Replace with the correct API endpoint
    with open(filename, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, files=files, verify=cert_path)

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
    url = f'{API_BASE_URL}/path/to/uploadtb'  # Replace with the correct API endpoint
    with open(filename, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, files=files, verify=cert_path)

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
    url = f'{API_BASE_URL}/path/to/uploadnamebasics'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=cert_path)

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
    url = f'{API_BASE_URL}/path/to/uploadtitlecrew'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=cert_path)

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
    url = f'{API_BASE_URL}/path/to/uploadtitleepisode'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=cert_path)

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
    url = f'{API_BASE_URL}/path/to/uploadtitleprincipals'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=cert_path)

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
    url = f'{API_BASE_URL}/path/to/uploadtitleratings'  # Replace with the correct API endpoint
    files = {'file': open(filename, 'rb')}

    try:
        response = requests.post(url, files=files, verify=cert_path)

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

if __name__ == '__main__':
    main()
#######################################################################
#de doulevoun ta format akoma
#commands: python se2352.py scope param1 -value1 