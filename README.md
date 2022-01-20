# todo-list
## Requirements
```
- function: add, update, bulk action, search, remove, validate.
- css only
- reponsive
- data is stored in local storage
- the code is broken into different component
```
## Folder structure
```
assets/
    - css/
        - base.css (commonly used class)
        - reset.css (css reset file)

components/
	- TaskLayouts/
		- FormAdd.vue (Form for creating new tasks)
		- FormUpdate.vue (Form for updating task)
    - Task.vue ( single Task layout )
    - TaskList ( list of tasks layout)

	- TodoList.vue (main application interface)
  

store/
	- index.js (handle all logic code of applicaiton)
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
