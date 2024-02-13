module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-extend-native": "off",
    "no-unused-vars": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  globals: {
    wx: true,
    ap: true,
    Stripe: true,
    google: true
  }
};
