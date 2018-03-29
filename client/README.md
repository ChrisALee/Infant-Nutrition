## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node.js - version 8.x or greater

### Installing

First fork and clone the repo

Then:
```sh
$ cd PATH/TO/PROJECT/CLIENT
$ npm install
```

Now you must set up environment variables

Create an .env file in the root `API` directory:
```sh
$ touch .env
```

Put these environment variables in the `.env` file with your relevant information:
```
API_HOST=localhost
API_PORT=3002
```

To run locally:
```sh
$ npm run dev
```
Then go to `localhost:3000`

Any time you save changes to any files locally, your web page will automatically reload with the changes!

## Deployment to OpenShift

First log in with your oc credentials:

```sh
$ oc login
```

Then simply run this command in the git's root directory to deploy:

```sh
$ oc new-app bucharestgold/centos7-s2i-nodejs:latest~git@GIT_REPO_GOES_HERE --name NAME_GOES_HERE --context-dir=client
```

This will automatically pull an updated NodeJS image and target the source code in this repo for OpenShift.

## Example Project Structure

This will get updated as the project increases in complexity.

```
// Clientside files should only be in the client folder
client/
|   // This is where installed packages end up
|   // Unless you have some strange use-case or error
|   // You can safely ignore the contents of this
|--- node_modules/
|   
|    // Notice the first letter of each component is capitalized
|    // Components should be a smaller part of what makes up an entire page
|    // For example, a nav bar or header could be a component
|    // Another example would be a forum page having posts
|    // Post.tsx would be a component used in a forum.tsx page
|--- components/
|   |--- Header.tsx
|   |--- Layout.tsx
|   |--- Logout.tsx
|   |--- Post.tsx
|        
|    // Pages are the full thing that can be linked to (i.e., website.com/about)
|    // They are made up of components
|    // Just remember that pages are technically components just like those in the components folder
|    // The only difference is that Next.js automatically creates link to each page in the pages folder
|    // These are all lowercase
|--- pages/
|   |--- about.tsx
|   |--- index.tsx
|   |--- login.tsx
|   |--- register.tsx
|   |--- profile.tsx
|   |--- forum.tsx
|        
|    // These are static files like images, favicons, fonts, etc.
|--- static/
|   |--- image.png
|   |--- favicon.ico
|       
|--- .prettierrc
|--- next.config.js
|--- package-lock.json
|--- package.json  // Command line scripts to run, build, test, lint and names of installed packages are in here
|--- README.md
|--- tsconfig.json
|--- tslint.json

```

## Imports and Exports

To import either 3rd-party libraries or other files from the project, follow the example below:

```jsx
// pages/index.tsx
import * as React from 'react'; // 3rd-party library import
import 'isomorphic-unfetch'; // 3rd-party library import
import Headup from '../components/Headup' // Import from another project file
import SomeComponent from '../components/SomeComponent' // Import from another project file
import AnotherComponent from '../components/AnotherComponent' // Import from another project file

// We import React explicitly when we need to use a React method like below
// In this case, we extend the React.Component since we're making a class
export default class IndexPage extends React.Component<{}, {}> {
    render() {
        return (
        <div>
            // stuff
        </div>
        );
    }
};
```

To export project files so that other files may use them, follow the example below:

```jsx
// client/components/SomeComponent.tsx
export default () => (
    <div>
        // stuff
    </div>
);
```

or 

```jsx
// client/components/AnotherComponent.tsx
const AnotherComponent () => (
    <div>
        // stuff
    </div>
);

export default AnotherComponent;
```

## Props

The below example has a component, `SomeComponentWithProps`, that accepts props (aka properties) and shows the children property of the props.
Think of props as something passed down to a component that is immutable (cannot be changed).
In this case, the props being passed down are the children. Children are usually the data in between the tags.
So `props.children` would be equal to Hello!

This can be useful for two cases:

1. You want to control the data getting sent down to be presented by the child component
2. There are multiple components you can send the data down to to be presented in different ways

```jsx
// client/pages/index.tsx
import SomeComponentWithProps from '../components/SomeComponentWithProps'

export default () => (
    <div>
        <SomeComponentWithProps>Hello!</SomeComponentWithProps>
    </div>
);

// client/components/SomeComponentWithProps.tsx
export default props => (
    <div>
        {props.children}
    </div>
);
```

Props can be passed down in other properties than children:

```jsx
// client/pages/index.tsx
import SomeComponentWithProps from '../components/SomeComponentWithProps'

export default () => (
    <div>
        <SomeComponentWithProps someProperty='tom'>This part does not matter</SomeComponentWithProps>
    </div>
);

// client/components/SomeComponentWithProps.tsx
export default props => {
    // There is most likely a more efficient way of doing this particular example
    // but I just wanted to show how to use props this way
    if (props.someProperty === 'tom') {
        return <div>{props.someProprty} does not like you!</div>;
    } else if (props.someProperty === 'bob'){
        return <div>{props.someProperty} does like you!</div>;
    } else {
        return <div>Who is this {props.someProperty}?</div>;
    }
};
```

As stated earlier, remember that pages are technically just components. Props are just a property being passed down from a parent component.
Therefore, files in the components folder can pass props down to other files in the components folder.

## State

The below example has a component, `SomeComponentWithState`, that has some state for a count number.
When a user clicks on the button rendered by this component, the state of the count increases by 1.

```jsx
// client/components/SomeComponentWithState.tsx
import * as React from 'react'; // needed for extending the class

export default class SomeComponentWithState extends React.Component<{}, {}> {
    state = {
        count = 1,
    }
    
    onClick(e) {
        this.setState({
            count: this.state.count + 1
        });
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.onClick.bind(this)}>Click this to increase counter by 1</button>
            </div>
        );
    }
}
```

Note that state is not something you should pass down.
Pass it down as props and have a way for the parent component to know when to update its own state if necessary.

Notice that state is something that can be used by normal, non-page components too.

## Classes vs. Functions

There are a couple different opinions on how to do this.

We will generally use stateless function like in the props example by default.
We will only use stateful classes if the component must carry state.
This may change as the project grows.

You can find an article with comparisons between the different types [here](https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541).

## Prettier and TSLinter for Sublime

**Please set this up!!!**

This will make it so your code gets automatically formatted to whatever rules we have set whenever you save your file.
This is important so that our code format stays consistent among all of us!

**To be filled out later... (for now, you can run `npm run format-code` in the command line before pushing your code up to GitLab)**

Note: I use Visual Studio Code (not Visual Studio), so I'm not sure how well this all works on Sublime.

## Learning Resources

If you are super limited in time, I would **at the very least** do Learnnextjs! It should only take roughly 20-30 minutes to go through the whole thing.

That being said, I **strongly** recommend at least doing the book to page 241.
The pages have a lot of spacing, white-space, and code-samples, so it's not a true, dense 241 pages.
I've gone through a ton of learning resources when I was learning React, and this was the best one.

Sure it might take a day, but you'll probably save multiples of days from being inefficient otherwise.

**It will clear everything up.**

Just keep in mind that Next.js gets rid of a lot of the boilerplate shown in the normal React in the book and is opinionated about some things.
That's why if you do decide to do the book, do that first then absolutely do Learnnextjs second.

* The React book and code linked in Trello - You only need to go up to page 241
* [Learnnextjs](https://learnnextjs.com/) - You only need to do sections 1-8

If you get stuck on anything in the project, take a look at the [Next.js examples](https://github.com/zeit/next.js/tree/canary/examples) or Google the issue first.

## Built With

* [React](https://github.com/facebook/react) - JavaScript library for building user interfaces
* [Next.js](https://github.com/zeit/next.js/) - Web framework for server-rendered React
* [Styled-JSX](https://github.com/zeit/styled-jsx) - CSS for JSX
* [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that allows for types