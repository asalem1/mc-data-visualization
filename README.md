# Data Visualization App

Welcome to the Data Visualization App, a single-page application dedicated to transforming data into insightful visualizations. The app currently supports climate data from from [Kaggle](https://www.kaggle.com/datasets/sumanthvrao/daily-climate-time-series-data), but has plans to add support for other data sources. This data set includes daily measurements for mean temperature, humidity, wind speed, and mean pressure. The data set was lightly modified from its original version to allow dynamic formatting for better readability.

This application is currently a front-end application with infrastructure in place to allow for the abstraction of an API and DB. With more time and energy, it would be straightforward to seed a DB and stand-up a server to handle requests and make this a full-stack application. All data is stored in local storage to simulate the persistence of data across sessions.

The user can create a line graph for either the mean temperature, humidity, wind speed, or mean pressure with each visualization being contained in a dashboard cell. Users can create and delete cells in a dashboard at will.

The app has been deployed and can be accessed here:

https://asalem1.github.io/mc-data-visualization/

## Major dependencies/packages

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and the TypeScript template.

[React Aria](https://react-spectrum.adobe.com/react-aria/). The foundation of most of this application leans into customized components on top of React-Aria. Besides being semantically relevant, having foundations rooted in accessibility will allow for a broader audience and make for more maintainable code.

[APEX Charts](https://apexcharts.com/). The visualizations used are courtesy of apexcharts. Out-of-the-box functionality was a guiding light here. Ideally we should be able to handle multiple data formats with little data manipulation on the API and even less configuration on the UI with this approach.

## Features

- Add cells with the "Create Cell" button. This can be reached in the Empty Dashboard state with the CTA, or in the header at the top right of the screen.

  - In order to create a visualization, you must name a cell.
  - Choosing a Chart Type besides the `Line Chart` is not currently supported, however there are plans to integrate other chart types in the future.
  - Choosing a Climate Category is required with the choices being: `Mean Temp`, `Humidity`, `Wind Speed`, `Mean Pressure`.

- Delete a cell with the trash can button. This will prompt you to confirm their decision to delete the cell.
- Zooming in on a cell's timerange can be done by clicking on the visualization and dragging across a given time frame.
  - Zooming in and out can also be done via the `+` and `-` buttons at the top of the cell.
- Downloading the visualization as an `SVG`, `PNG`, or `CSV` are available courtesy of Apex Charts. To do this, you can:
  - Click on the Hamburger menu at the top right of the cell.
  - Select any of the `Download SVG | PNG | CSV` options.

## Future Considerations

Given the time constraint associated with the challenge, there was a fair bit of work that I would have loved to get around to that just didn't pan out. Namely, having a more consistent method of styling components. I started down this route by creating the overlay, radio group & radio item, and input that are used in multiple places. I also made use of CSS color variables when I found a common enough pattern emerge, Having said that, the buttons were something that I couldn't get a consistent theme on and is a big point of tech debt for the future.

It would have been super cool to be able to stand-up a server and have the API requests happen to query data from the database, but that doing so would have come at the expense of UI polish and quality. Ideally, this would be pretty straightforward to setup since all we'd need to is make use of the existing service layer to swap out a network request and query the database. Having said that, we'd also want to setup some pagination and input sanitization, which would be a requirement for any backend service.

Loading states were also something that I didn't handle. I was torn on whether to include it on this POC and decided against it since that piece of UX could be considered a fast-follow to any work that delivers core functionality. I'm open to revisiting this point since I don't have strongly held feelings about whether it consistutes an acceptance criteria for the POC.

I added in one test of unit tests as an example of what testing might look like on a granular level. Ideally, we would include more tests around the component level interactions to validate:

1. That the happy paths are stable
2. That edge cases within the flow are stable

Traditionally, I've used [Cypress](https://docs.cypress.io/guides/overview/why-cypress) e2e tests to capture those happy paths, while [Jest](https://jestjs.io/docs/getting-started) tests have been used to capture coverage for component edge cases, utility methods, and API methods. This distinction draws upon the fact that sprinkling all the test coverage onto Cypress adds unnecessary latency and overburdens the CI pipeline. Distributing it in such a way, I have found, has the best of worlds when it comes to test coverage and quality.

## Performance Considerations

Some decisions regarding the data that's rendering were made with performance considerations around the charts. More specifically, the bar chart was unperformant (and uninformative) when there was too much data loaded onto it. I decided to trim the data down and integrate pagination of the data so that the user had easier access to their data without comprimising performance.

## Next Steps

Regarding steps that could be taken moving forward. I mentioned previously the integration of a proper API and DB as being critical for scaling this application. We'd also need to do an audit of the visualization types to see where the current data format breaks, and potentially have separate endpoints for each graph type (e.g. have an endpoint for retrieving the data for line charts, bar graphs, etc...). Doing so would require branching logic on the UI to render a different component depending on the graph type. I imagine that this would be required simply due to the wide variety of graph types and the varying formats that the data can be returned as.

I also mentioned pagination as something we would need to think about moving forward. This would be critical to maintain performance (both on the UI and API), and to maintain usability of the graphs. Too much data upfront is rendered invaluable if the user needs to take time to understand what they are looking at.

Loading states would need to be integrated for a smoother UX.

Finally, we would want to move away from localStorage as the source of truth and need to have a more robust storage system around an individual user (perhaps scoped to an organization / business). Doing so would allow the user to have their data accessible across browsers and sessions. Additionally, storing the data in the DB would open the door for obserability of the data outside the context of a user session (i.e. a shared dashboard that's visible publically).

## Building and Running

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

The `npm run lint` command is used to analyze and enforce coding standards in the source code using ESLint.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Deploys the latest commit in `main` to Github Pages. Note: only the original author and collaborators should have access to this.
