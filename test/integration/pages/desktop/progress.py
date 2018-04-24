from selenium.webdriver.common.by import By

from pages.desktop.base import Base


class Progress(Base):

    _cancel_button = (By.ID, 'cancel-upload')
    _progress_icon_locator = (By.CLASS_NAME, 'progress__bar')

    def wait_for_page_to_load(self, cancel_after_load=False):
        self.wait.until(
            lambda _: self.find_element(
                *self._progress_icon_locator).is_displayed())
        if cancel_after_load:
            self.cancel_btn.click()
            return
        from pages.desktop.share import Share
        return Share(self.selenium, self.base_url).wait_for_page_to_load()

    @property
    def cancel_btn(self):
        """Cancel upload button."""
        return self.find_element(*self._cancel_button)
