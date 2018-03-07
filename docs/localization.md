# Localization

Send is localized in over 50 languages. We use the [fluent](http://projectfluent.org/) library and store our translations in [FTL](http://projectfluent.org/fluent/guide/) files in `public/locales/`. `en-US` is our base language, and other languages are managed by [pontoon](https://pontoon.mozilla.org/projects/test-pilot-firefox-send/).

## Process

Strings are added or removed from [public/locales/en-US/send.ftl] as needed. Strings **MUST NOT** be *changed* after they've been commited and pushed to master. Changing a string requires creating a new ID with a new name (preferably descriptive instead of incremented) and deletion of the obsolete ID. It's often useful to add a comment above the string with info about how and where the string is used.

Once new strings are commited to master they are available for translators in Pontoon. All languages other than `en-US` should be edited via Pontoon. Translations get automatically commited to the github master branch.

### Activation

The development environment includes all locales in `public/locales` via the `L10N_DEV` environment variable. Production uses `package.json` as the list of locales to use. Once a locale has enough string coverage it should be added to `package.json`.

## Code

In `app/` we use the `state.translate()` function to translate strings to the best matching language base on the user's `Accept-Language` header. It's a wrapper around fluent's [MessageContext.format](http://projectfluent.org/fluent.js/fluent/MessageContext.html). It works the same for both server and client side rendering.

### Examples

```js
// simple string
const finishedString = state.translate('downloadFinish')
// with parameters
const progressString = state.translate('downloadingPageProgress', {
  filename: state.fileInfo.name,
  size: bytes(state.fileInfo.size)
})
```
