# Realm Theme

## Dependencies

-   [Node](http://nodejs.org/)
-   [Yarn](https://yarnpkg.com/en/)
-   [Shopify CLI](https://shopify.dev/docs/api/shopify-cli/theme)

## Setup

1. Install dev dependencies via

```
$ yarn
```

2. Start the dev server and log into Shopify store.

```
$ yarn start
```

## Pushing to Production

1. Build production ready theme files

```
$ yarn build
```

2. Make a new commit and push to master. The Github integration will take care of the rest.
