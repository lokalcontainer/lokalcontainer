module.exports = {
    apps: [
        {
            name: "lc-website",
            script: "yarn start",
            watch: ".next",
            env: {
                PORT: 7001,
                NODE_ENV: "production"
            }
        }
    ]
};
