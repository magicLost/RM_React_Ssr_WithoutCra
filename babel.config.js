const presets = [
  [
    "@babel/env",
    {
      targets: "last 2 Chrome versions" //"> 0.25%, not dead",
      /*  targets:     {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1", 
      }, 
      modules: "auto" */
    }
  ],
  "@babel/preset-react",
  "@babel/preset-typescript"
];

const plugins = [
  "@babel/proposal-class-properties",
  "@babel/proposal-object-rest-spread",
  "@babel/plugin-syntax-dynamic-import"
];

module.exports = { presets, plugins };
