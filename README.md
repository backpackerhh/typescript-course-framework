# Maps

## Up and running

Install dependencies:

```bash
$ npm run install-deps
```

Run server:

```bash
$ npm start
```

Go to http://localhost:1234 to see the project in the browser.

## Notes

In the `tsconfig.json` file following option was defined:

```json
{
  "compilerOptions": {
    // ...
    "moduleResolution": "NodeNext"
  },
}
```

More details about module resolution [here](https://www.typescriptlang.org/tsconfig#moduleResolution).

Note that `tsconfig.json` file is not included in this repository because I use a global file for all this mini-projects created for this course.
