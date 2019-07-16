const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "8",
      },
      useBuiltIns: "usage",
    },
  ],
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-export-default-from',
]

module.exports = { presets, plugins };
