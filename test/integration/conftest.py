# -*- coding: utf-8 -*-
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this file,
# You can obtain one at http://mozilla.org/MPL/2.0/.
"""Configuration files for pytest."""
import pytest
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

from pages.desktop.download import Download
from pages.desktop.home import Home


@pytest.fixture
def firefox_options(firefox_options, download_location_dir):
    """Firefox options."""
    firefox_options.set_preference("browser.download.panel.shown", False)
    firefox_options.set_preference(
        "browser.helperApps.neverAsk.openFile", "text/plain")
    firefox_options.set_preference(
        "browser.helperApps.neverAsk.saveToDisk", "text/plain")
    firefox_options.set_preference("browser.download.folderList", 2)
    firefox_options.set_preference(
        "browser.download.dir", "{0}".format(download_location_dir))
    firefox_options.add_argument('-foreground')
    firefox_options.log.level = 'trace'
    return firefox_options


@pytest.fixture(scope='session', autouse=True)
def _verify_url(request, base_url):
    """Verifies the base URL"""
    verify = request.config.option.verify_base_url
    if base_url and verify:
        session = requests.Session()
        retries = Retry(backoff_factor=0.1,
                        status_forcelist=[500, 502, 503, 504])
        session.mount(base_url, HTTPAdapter(max_retries=retries))
        session.get(base_url, verify=False)


@pytest.fixture
def download_location_dir(tmpdir):
    """Directory for downloading sample file."""
    return tmpdir.mkdir('test_download')


@pytest.fixture
def upload_location_dir(tmpdir):
    """Directory for uploading sample file."""
    return tmpdir.mkdir('test_upload')


@pytest.fixture
def test_file(upload_location_dir):
    """Create test upload/download file."""
    setattr(test_file, 'name', 'sample.txt')
    setattr(test_file, 'location', upload_location_dir.join(test_file.name))
    return test_file


@pytest.fixture
def download_file(upload_file):
    """Uploads and downloads a file"""
    download = Download(upload_file.selenium, upload_file.file_url).open()
    download.download_btn.click()
    return download


@pytest.fixture
def upload_file(selenium, base_url, download_location_dir, test_file):
    """Upload file fixture."""
    home = Home(selenium, base_url).open()
    test_file.location.write('This is a test! This is a test!')
    return home.upload_area("{0}".format(test_file.location.realpath()))
