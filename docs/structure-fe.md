# Front-end Structure Directory
[x] components
[x] interfaces
[x] modules
    - [module-folder-name]
        [x] actions
        [x] assets
        [x] components
        [x] containers
        [x] pages
        [x] reducers
        [x] sagas
[x] reducers
[x] sagas
[x] services
[x] tests
[x] index.tsx
[x] react-app-env.d.ts
[x] serviceWorker.ts

# Note
## React Hooks
    - `useEffect` hook:
      - No second parameter -> `componentDidUpdate` is equivalent
      - An empty parameter -> `componentDidMount` is equivalent
      - An array parameter (they're called dependencies) -> `componentWillReceiveProps`/`getDerivedStateFromProps` is equivalent

## React Redux
    - Each reducer is going to be a state of app
    - The `dispatch` will be received by default into a component if the second parameter missed in `connect` function
    - Two forms of `mapDispatchToProps` are:
      - Function form
      - Object shorthand form
      - Note: We recommend using the object form of mapDispatchToProps unless you specifically need to customize dispatching behavior in some way.