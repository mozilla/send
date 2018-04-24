"""Test files regarding uploading."""


def test_upload(upload_file):
    """Test file upload and creates URL."""
    assert upload_file.file_url is not None
