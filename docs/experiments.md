# A/B experiment testing

We're using Google Analytics Experiments for A/B testing.

## Creating an experiment

Navigate to the Behavior > Experiments section of Google Analytics and click the "Create experiment" button.

The "Objective for this experiment" is the most complicated part. See the "Promo click (Goal ID 4 / Goal Set 1)" for an example.

In step 2 add as many variants as you plan to test. The urls are not important since we aren't using their js library to choose the variants. The name will show up in the report so choose good ones. "Original page" becomes variant 0 and each variant increments by one. We'll use the numbers in our `app/experiments.js` code.

Step 3 contains some script that we'll ignore. The important thing here is the **Experiment ID**. This is the value we need to name our experiment in `app/experiments.js`. Save the changes so far and wait until the code containing the experiment has been deployed to production **before** starting the experiment.

## Experiment code

Code for experiments live in [app/experiments.js](../app/experiments.js). There's an `experiments` object that contains the logic for deciding whether an experiment should run, which variant to use, and what to do. Each object needs to have these functions:

### `eligible` function

This function returns a boolean of whether this experiment should be active for this session. Any data available to the page can be used determine the result.

### `variant` function

This function returns which experimental group this session is placed in. The variant values need to match the values set up in Google Analytics, usually 0 thru N-1. This value is usually picked at random based on what percentage of each variant is desired.

### `run` function

This function gets the `variant` value chosen by the variant function and the `state` and `emitter` objects from the app. This function can do anything needed to change the app based on the experiment. A common pattern is to set or change a value on `state` that will be picked up by other parts of the app, like ui templates, to change how it looks or behaves.

### Example

Here's a full example of the experiment object:

```js
const experiments = {
  S9wqVl2SQ4ab2yZtqDI3Dw: { // The Experiment ID from Google Analytics
    id: 'S9wqVl2SQ4ab2yZtqDI3Dw',
    run: function(variant, state, emitter) {
      switch (variant) {
        case 1:
          state.promo = 'blue';
          break;
        case 2:
          state.promo = 'pink';
          break;
        default:
          state.promo = 'grey';
      }
      emitter.emit('render');
    },
    eligible: function() {
      return (
        !/firefox|fxios/i.test(navigator.userAgent) &&
        document.querySelector('html').lang === 'en-US'
      );
    },
    variant: function(state) {
      const n = this.luckyNumber(state);
      if (n < 0.33) {
        return 0;
      }
      return n < 0.66 ? 1 : 2;
    },
    luckyNumber: function(state) {
      return luckyNumber(
        `${this.id}:${state.storage.get('testpilot_ga__cid')}`
      );
    }
  }
};
```

## Reporting results

All metrics pings will include the variant and experiment id, but it's usually important to trigger a specific event to be counted as the experiment goal (the "Objective for this experiment" part from setup). Use an 'experiment' event to do this. For example:

```js
emit('experiment', { cd3: 'promo' });
```

where `emit` is the app emitter function passed to the [route handler](https://github.com/choojs/choo#approuteroutename-handlerstate-emit)

The second argument can be an object with any additional parameters. It  usually includes a custom dimension that we chose to filter on while creating the experiment in Google Analytics.