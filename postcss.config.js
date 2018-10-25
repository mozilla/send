class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
  }
}

const options = {
  plugins: [
    require('tailwindcss')('./tailwind.js'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./app/*.js', './app/ui/*.js'],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['js']
        }
      ]
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
};

if (process.env.NODE_ENV === 'development') {
  options.map = { inline: true };
}

module.exports = options;
