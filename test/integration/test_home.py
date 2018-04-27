import pytest

from pages.desktop.base import Base

footer_links = ['mozilla', 'mozilla', 'about', 'legal', 'legal', 'cookies',
                'report-infringement']


@pytest.mark.parametrize('i, name', enumerate(footer_links))
def test_legal_links(selenium, base_url, i, name):
    """Test links in footer load correct pages."""
    page = Base(selenium, base_url).open()
    page.footer.links[i].click()
    assert name in selenium.current_url
