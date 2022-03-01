module.exports = {
    apps: [
        {
            name: "lc-website-dev",
            script: "yarn start",
            watch: ".next",
            env: {
                PORT: 7002,
                NODE_ENV: "production"
            }
        }
    ]
};
