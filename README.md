# Airtable Bar Chart Viewer

This example app shows how to intetgrate a charting library (Chart.Js) with Airtable blocks. The code shows:

- How to use the Chart.js external library.

- How to store app-related data using `globalConfig` and `Synced` UI components.

- How to use Standard UI components for custom behavior.

- How to implement custom hook wrappers around specific Airtable features.

The application lets a user view a simple bar chart or a stacked chart based on a grouping select input.

## Code organization

The application relevant code lives in two directories:

`/config`  
All globally defined store keys and constants.

`/frontend`  
The React code that runs our application interface.

## See the app running

![App updating chart as the user changes data](media/block.gif)

## How to run this app (_Theoretical_)

_First, ensure you have the [Airtable CLI installed](https://www.npmjs.com/package/@airtable/blocks-cli)._

1. Create a new base with at least two columns of data with a many-to-one cardinality. ie. One Pet Owner has many Pets.

   The data in this screenshot is as follows:

   ```tsv
   N	Person		Pet type
   1	Alice		Cat
   2	Bob 		Dog
   3	Alice		Hamster
   4	Bob			Hamster
   5	Alice		Dog
   ```

2. Clone this repository to a location on your computer. Install dependencies from the root of your application with either `npm install` or `yarn` if you prefer.

3. From your base, click "add new App", when provided the `init` script, copy the app id and block id.

4. In your code editor, update the config in `.block/remote.json` with the appropriate values.

5. From the root of your new app, run `block run`. Note the provided server where your app is located. Typically `https://localhost:9000`.

_Note, you may need to set a Chrome configuration to allow accessing https of unverified or expired urls - localhost in our case._

6. Return to the browser and provide the URL of the running block.

View the following gif for a visual walk-through.

![Running a custom block in your base](media/Walk-Through-Install-Block.gif)
