"""Test files regarding downloads."""


def test_download(download_file, download_location_dir, test_file):
    """Test downloaded file matches uploaded file."""
    assert download_location_dir.ensure(test_file.name)
